// import mongoose
const mongoose = require('mongoose');

// create a schema
const recipeSchema = new mongoose.Schema({
    title: {
        type:String,
        recquired:true,
    },
    description: 
    {
        type:String,
        recquired:true,
    },
    
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]

});

module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');