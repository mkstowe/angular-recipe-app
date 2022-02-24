const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Image = new mongoose.model('Image', imageSchema);

module.exports = { Image };
