const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');

const cors = require('cors');
router.use(cors());

const Image = require('../models/image');

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { filename, originalname } = req.file;

        const image = new Image({
            filename,
            originalname,
            path: req.file.path
        });
        await image.save();

        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/download/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        let contentType;
        switch (image.originalname.split('.').pop().toLowerCase()) {
            case 'png':
                contentType = 'image/png';
                break;
            case 'jpg':
            case 'jpeg':
                contentType = 'image/jpeg';
                break;
            default:
                contentType = 'application/octet-stream';
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${image.originalname}"`);

        const absolutePath = path.resolve(`./uploads/${image.filename}`);

        res.sendFile(absolutePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;