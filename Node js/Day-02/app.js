const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'data', 'comments.json');

// --- Middleware ---
app.use(express.json()); // Bonus: لتجهيز الـ JSON اللي جاي في الـ Body
app.use(express.static('public')); // Bonus: عشان يشوف ملفات الـ HTML والـ CSS

// دالة مساعدة للقراءة والكتابة
const getComments = async () => JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
const saveComments = async (data) => await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));

// --- Routes ---

// 1. Redirect to Home (Serving index.html)
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. GET all comments
app.get('/comments', async (req, res) => {
    const comments = await getComments();
    res.json(comments);
});

// 3. GET single comment by ID
app.get('/comments/:id', async (req, res) => {
    const comments = await getComments();
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).json({ message: "Comment not found" }); // Bonus: Error Handling
    res.json(comment);
});

// 4. POST - Create new comment
app.post('/comments', async (req, res) => {
    const { author, body } = req.body;
    // Bonus: Validation
    if (!author || !body) return res.status(400).json({ message: "Author and body are required" });

    const comments = await getComments();
    const newComment = { id: Date.now(), author, body };
    comments.push(newComment);
    await saveComments(comments);
    res.status(201).json(newComment);
});

// 5. PUT - Update comment
app.put('/comments/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const comments = await getComments();
    const index = comments.findIndex(c => c.id === id);

    if (index === -1) return res.status(404).json({ message: "Comment not found" });

    comments[index] = { ...comments[index], ...req.body };
    await saveComments(comments);
    res.json(comments[index]);
});

// 6. DELETE - Remove comment
app.delete('/comments/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let comments = await getComments();
    const filtered = comments.filter(c => c.id !== id);

    if (comments.length === filtered.length) return res.status(404).json({ message: "Comment not found" });

    await saveComments(filtered);
    res.json({ message: "Comment deleted successfully" });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));