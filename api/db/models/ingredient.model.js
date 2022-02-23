const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    _recipeId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    quantity: Number,
    quantity2: Number,
    unitOfMeasure: String,
    description: String,
    isGroupHeader: {
        type: Boolean,
        default: false
    }
});

const Ingredient = new mongoose.model('Ingredient', IngredientSchema);

module.exports = { Ingredient };
