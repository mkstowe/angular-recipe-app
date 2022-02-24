const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tags: [String],
    description: String,
    _imgId: {
        type: mongoose.Types.ObjectId
    },
    steps: [{
        description: String
    }],
    prepTime: Object,
    cookTime: Object,
    servings: Number,
    servingSize: String,
    calories: Number,
    notes: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const Recipe = new mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe };

