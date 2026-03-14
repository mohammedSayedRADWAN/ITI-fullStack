const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const PORT = 3000;
const DB_PATH = path.join(__dirname, 'data', 'posts.json');

async function getPosts() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    res.setHeader('Content-Type', 'application/json');

    // 1. GET All Posts
    if (url === '/posts' && method === 'GET') {
        const posts = await getPosts();
        return res.end(JSON.stringify(posts));
    }

    // 2. GET Single Post by ID
    else if (url.startsWith('/posts/') && method === 'GET') {
        const id = parseInt(url.split('/')[2]);
        const posts = await getPosts();
        const post = posts.find(p => p.id === id);
        if (post) return res.end(JSON.stringify(post));
        res.writeHead(404);
        return res.end(JSON.stringify({ message: "Post not found" }));
    }

    // 3. POST - Create Post
    else if (url === '/posts' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const { title, content } = JSON.parse(body);
                if (!title || !content) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ message: "Title and Content are required" }));
                }
                const posts = await getPosts();
                const newPost = { id: Date.now(), title, content, createdAt: new Date().toLocaleString() };
                posts.push(newPost);
                await fs.writeFile(DB_PATH, JSON.stringify(posts, null, 2));
                res.writeHead(201);
                res.end(JSON.stringify(newPost));
            } catch (e) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: "Invalid JSON" }));
            }
        });
        return;
    }

    // 4. PUT - Update Post
    else if (url.startsWith('/posts/') && method === 'PUT') {
        const id = parseInt(url.split('/')[2]);
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            const updatedData = JSON.parse(body);
            let posts = await getPosts();
            const index = posts.findIndex(p => p.id === id);
            if (index !== -1) {
                posts[index] = { ...posts[index], ...updatedData, updatedAt: new Date().toLocaleString() };
                await fs.writeFile(DB_PATH, JSON.stringify(posts, null, 2));
                res.end(JSON.stringify(posts[index]));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: "Post not found" }));
            }
        });
        return;
    }

    // 5. DELETE - Remove Post
    else if (url.startsWith('/posts/') && method === 'DELETE') {
        const id = parseInt(url.split('/')[2]);
        let posts = await getPosts();
        const filteredPosts = posts.filter(p => p.id !== id);
        if (posts.length !== filteredPosts.length) {
            await fs.writeFile(DB_PATH, JSON.stringify(filteredPosts, null, 2));
            return res.end(JSON.stringify({ message: "Post deleted" }));
        }
        res.writeHead(404);
        return res.end(JSON.stringify({ message: "Post not found" }));
    }

    // 404 Route
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));