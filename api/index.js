const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const imageRoutes = require('./routes/imageRoutes');

mongoose.connect('mongodb://localhost:27017/multer-demo');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/hello', (req, res) => {
    res.send('Hello Api!')
})

app.use('/images', imageRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Api running on port ${port}`)
})