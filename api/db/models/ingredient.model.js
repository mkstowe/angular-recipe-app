const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    _recipeId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    input: {
        type: String,
        default: ''
    },
    quantity: Number | null,
    quantity2: Number | null,
    unit: String | null,
    unitPlural: String | null ,
    unitShort: String | null,
    unitEntered: String | null,
    description: {
        type: String,
        default: ''
    },
    isGroupHeader: {
        type: Boolean,
        default: false
    }
});

const Ingredient = new mongoose.model('Ingredient', IngredientSchema);

module.exports = { Ingredient };
