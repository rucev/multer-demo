const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const image = new Schema({
    filename: {
        type: String,
        required: true,
    },

    originalname: {
        type: String,
        required: true,
    },

    path: {
        type: String,
        required: true,
    },
})

const Image = model('Image', image);

module.exports = Image
