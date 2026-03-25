require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

const app = express();


app.use(express.json());
//Routes
app.use('/api/posts', postRoutes);


require('dotenv').config();

if (!process.env.MONGO_URI) {
    console.error(' Error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' Successfully connected to MongoDB Atlas!'))
    .catch(err => console.error(' Connection error:', err.message));
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    }   );                  