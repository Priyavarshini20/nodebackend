// import express
const express = require('express');
const RecipeControllers = require('../controllers/RecipeControllers');
const auth = require('../utils/auth');

// create an express router
const recipesRouter = express.Router();

// public endpoints
recipesRouter.get('/', RecipeControllers.getAllRecipe);
recipesRouter.get('/:id', RecipeControllers.getRecipeByID);

// protected endpoints - Roles: Admin, Manager
recipesRouter.post('/', auth.isAuthenticated, auth.allowRoles(['admin', 'manager']), RecipeControllers.createRecipe);
recipesRouter.put('/:id', auth.isAuthenticated, auth.allowRoles(['admin', 'manager']), RecipeControllers.updateRecipe);
recipesRouter.delete('/:id', auth.isAuthenticated, auth.allowRoles(['admin']), RecipeControllers.deleterecipe);

// export the router
module.exports = recipesRouter;