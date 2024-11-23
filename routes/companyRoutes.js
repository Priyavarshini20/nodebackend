const express = require('express');
const companyController = require('../controllers/companyController');
const auth = require('../utils/auth');

const companyRouter = express.Router();

// Define the routes
// public routes
companyRouter.get('/', companyController.getAllCompanies);
companyRouter.get('/:id', companyController.getCompanyById);

// protected routes - allowed [`admin`]
companyRouter.post('/', auth.isAuthenticated, auth.allowRoles(['admin']), companyController.createCompany);
companyRouter.put('/:id', auth.isAuthenticated, auth.allowRoles(['admin']), companyController.updateCompany);
companyRouter.delete('/:id', auth.isAuthenticated, auth.allowRoles(['admin']), companyController.deleteCompany);
companyRouter.get('/:id/assign/:userId', auth.isAuthenticated, auth.allowRoles(['admin']), companyController.assignUserToCompany);

module.exports = companyRouter;