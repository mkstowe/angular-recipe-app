const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
    description: String,
    checked: {
        type: Boolean,
        default: false
    },
    isGroupHeader: {
        type: Boolean,
        default: false
    }
});

module.exports = { StepSchema };

