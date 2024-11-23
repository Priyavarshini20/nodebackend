// import recipe model
const { response } = require('express');
const Recipe = require('../models/Recipe');

const RecipeControllers = {
    getAllRecipe: async (request, response) => {
        try {
            const recipe = await Recipe.find();
            response.status(200).json(recipe);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getRecipeByID: async (request, response) => {
        try {
            // Get the recipe ID from the request parameters
            const { id } = request.params;

            // Find the document for the matching ID
            const Recipe = await recipe.findById(id);

            // If no document is found, return a 404 Not Found status code
            if (!Recipe) {
                return response.status(404).json({ message: 'Recipe not found' });
            }

            // If a document is found, return a 200 OK status code and the document
            response.status(200).json(Recipe);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    createRecipe: async (request, response) => {
        
        try {
            // extract the job details from the request body
            const { title, description, } = request.body;

            // create a new job object with the extracted details
            const newRecipe = new Recipe({
                title,
                description,
                
            });

            // save the new job object to the database
            await newRecipe.save();

            // send a 201 Created status code and the new job object
            response.status(201).json({ message: 'recipe created successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateRecipe: async (request, response) => {
        try {
            // get the job ID from the request parameters
            const { id } = request.params;

            // extract the Recipe details from the request body
            const { title } = request.body;

            // find the document for the matching ID
            const recipe = await Recipe.findById(id);

            // replace the job title with the new title
            Recipe.title = title;

            // save the updated document to the database
            await updateRecipe.save();

            // send a 200 OK status code and the updated document
            response.status(200).json({ message: 'Recipe updated successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deleterecipe: async (request, response) => {
        try {
            // get the job ID from the request parameters
            const { id } = request.params;

            // find the document for the matching ID and delete it
            const recipe = await Recipe.findByIdAndDelete(id);
            
            

            // if no document is found, return a 404 Not Found status code
            if (!recipe) {
                return response.status(404).json({ message: 'recipe not found' });
            }

            // send a 200 OK status code
            response.status(200).json({ message: 'recipe deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = RecipeControllers;