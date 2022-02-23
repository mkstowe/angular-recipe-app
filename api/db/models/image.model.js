const mongoose = require('mongoose');

const userImageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    }
});

const UserImage = new mongoose.model('UserImage', userImageSchema);

module.exports = { UserImage };
