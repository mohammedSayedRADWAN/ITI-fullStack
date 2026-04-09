require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 4000;

// In-memory chat history storage (Array) - stores conversation context
// Structure: [system_prompt, ...last_5_messages]
let chatHistory = [
  {
    role: 'user',
    content: 'You are a smart assistant that responds in English. Answer briefly and politely.',
    timestamp: new Date().toISOString(),
    isSystemPrompt: true
  }
];

// Helper function to trim chat history
// Keeps first message (system prompt) + last 5 messages
const trimChatHistory = () => {
  if (chatHistory.length > 6) {
    const systemPrompt = chatHistory[0]; // Keep first message
    const recentMessages = chatHistory.slice(-5); // Last 5 messages
    chatHistory = [systemPrompt, ...recentMessages];
    console.log('🧹 Chat history trimmed to system prompt + last 5 messages');
  }
};

// Helper function to convert chat history to DeepSeek format
const convertToDeepSeekFormat = () => {
  return chatHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));
};

// Fallback function to call DeepSeek API
const callDeepSeekAPI = async (deepseekKey) => {
  try {
    console.log('⚠️ Gemini quota exceeded, switching to DeepSeek');
    
    const deepseekMessages = convertToDeepSeekFormat();
    
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: deepseekMessages,
        temperature: 0.7,
        top_p: 1,
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${deepseekKey}`
        },
        timeout: 30000
      }
    );
    
    const deepseekReply = response?.data?.choices?.[0]?.message?.content;
    
    if (!deepseekReply) {
      console.error('❌ Invalid DeepSeek API response structure');
      throw new Error('DeepSeek returned invalid response');
    }
    
    console.log(`✅ DeepSeek response received (${deepseekReply.length} characters)`);
    return deepseekReply;
    
  } catch (error) {
    console.error('💥 DeepSeek API error:', error.message);
    throw error;
  }
};

console.log('🚀 Starting Chat API Server...');
console.log('📝 Chat history: System prompt + last 5 messages (max 6 total)');
console.log('🔑 Gemini API Key loaded:', !!process.env.GEMINI_API_KEY);
console.log('🔑 DeepSeek API Key loaded:', !!process.env.DEEPSEEK_API_KEY);

// Enable CORS for frontend connections
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Basic request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// POST /api/chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate request payload - return status 400 for invalid input
    if (!message || typeof message !== 'string' || !message.trim()) {
      console.log('❌ Invalid request: missing or empty message');
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body must include a non-empty "message" string'
      });
    }

    const userMessage = message.trim();
    console.log(`💬 Processing message: "${userMessage.substring(0, 50)}${userMessage.length > 50 ? '...' : ''}"`);

    // Add user message to chat history for context
    chatHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    });

    // Prepare conversation context for Gemini API
    const conversationContext = chatHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const requestBody = {
      contents: conversationContext,
      generationConfig: {
        maxOutputTokens: 500
      }
    };

    const apiKey = process.env.GEMINI_API_KEY;

    // Check API key - return status 500 for server config issues
    if (!apiKey) {
      console.error('❌ Missing GEMINI_API_KEY environment variable');
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Server configuration error: API key not found'
      });
    }

    // Make request to Google Gemini API with fallback to DeepSeek
    let aiResponse;
    let usedDeepSeek = false;
    
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        }
      );

      // Extract the AI response
      aiResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (geminiError) {
      // Check if error is quota exceeded (429)
      if (geminiError.response?.status === 429) {
        const deepseekKey = process.env.DEEPSEEK_API_KEY;
        
        if (!deepseekKey) {
          console.error('❌ DeepSeek API key not configured');
          throw new Error('Gemini quota exceeded and DeepSeek API key not found');
        }
        
        // Use DeepSeek as fallback
        aiResponse = await callDeepSeekAPI(deepseekKey);
        usedDeepSeek = true;
      } else {
        // Re-throw non-429 errors
        throw geminiError;
      }
    }

    if (!aiResponse) {
      console.error('❌ Invalid API response structure');
      return res.status(502).json({
        error: 'Bad Gateway',
        message: 'AI service returned invalid response'
      });
    }

    console.log(`✅ AI response received (${aiResponse.length} characters)${usedDeepSeek ? ' [DeepSeek]' : ' [Gemini]'}`);

    // Add AI response to chat history for future context
    chatHistory.push({
      role: 'model',
      content: aiResponse,
      timestamp: new Date().toISOString()
    });

    // Keep system prompt (first message) + last 5 messages to reduce token usage
    trimChatHistory();

    // Return successful response with status 200
    return res.status(200).json({
      reply: aiResponse,
      conversationLength: chatHistory.length
    });

  } catch (error) {
    console.error('💥 Chat API error:', error.message);

    // Handle different types of errors with appropriate status codes
    if (error.response) {
      // API returned an error response
      const statusCode = error.response.status;
      console.error(`🔴 Gemini API error (${statusCode}):`, error.response.data?.error?.message || 'Unknown error');

      // Return appropriate status code based on API error
      if (statusCode === 400) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Invalid request to AI service'
        });
      } else if (statusCode === 401 || statusCode === 403) {
        return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Authentication error with AI service'
        });
      } else if (statusCode >= 500) {
        return res.status(502).json({
          error: 'Bad Gateway',
          message: 'AI service temporarily unavailable'
        });
      } else {
        return res.status(502).json({
          error: 'Bad Gateway',
          message: 'AI service error'
        });
      }
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      console.error('⏰ Request timeout');
      return res.status(504).json({
        error: 'Gateway Timeout',
        message: 'Request to AI service timed out'
      });
    } else {
      // Other errors (network, parsing, etc.)
      console.error('🔴 Unexpected error:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
      });
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    chatHistoryLength: chatHistory.length,
    uptime: process.uptime()
  });
});

// Get chat history (for debugging)
app.get('/api/chat/history', (req, res) => {
  res.status(200).json({
    history: chatHistory,
    totalMessages: chatHistory.length
  });
});

// Clear chat history
app.get('/api/chat/clear', (req, res) => {
  const oldLength = chatHistory.length;
  chatHistory = [];
  res.status(200).json({
    message: 'Chat history cleared',
    messagesRemoved: oldLength,
    totalMessages: 0
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('💥 Unhandled error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Chat API server running on http://localhost:${port}`);
  console.log(`📊 Chat history: ${chatHistory.length} messages stored`);
  console.log(`🔑 Gemini API: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Missing'}`);
  console.log(`� DeepSeek API: ${process.env.DEEPSEEK_API_KEY ? 'Configured' : 'Missing'} (fallback)`);
  console.log(`�💡 Ready to accept requests at POST /api/chat`);
});
