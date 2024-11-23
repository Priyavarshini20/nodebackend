const Company = require('../models/company');
const User = require('../models/user');
const { getAllRecipe } = require('./RecipeControllers');

const companyController = {
    getAllCompanies: async (request, response) => {
        try {
            const companies = await Company.find().select('-__v -createdAt -updatedAt');
            return response.status(200).json(companies);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    getCompanyById: async (request, response) => {
        try {
            const { id } = request.params;

            const company = await Company.findById(id).select('-__v -createdAt -updatedAt');

            if (!company) {
                return response.status(404).json({ message: 'Company not found' });
            }

            return response.status(200).json(company);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    createCompany: async (request, response) => {
        try {
            let { name, location, email, phone, website } = request.body;

            name = name.trim().toLowerCase();

            // check if the company already exists
            const companyExists = await Company.find({ name: name });

            if (companyExists.length > 0) {
                return response.status(400).json({ message: 'Company already exists' });
            }

            const newCompany = new Company({
                name: name.toLowerCase(),
                location,
                email,
                phone,
                website
            });

            await newCompany.save();

            return response.status(201).json({ message: 'Company created successfully' });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    updateCompany: async (request, response) => {
        try {
            const { id } = request.params;

            let { name, location, email, phone, website } = request.body;

            if (name) name = name.trim().toLowerCase();

            await Company.findByIdAndUpdate(id, {
                name,
                location,
                email,
                phone,
                website
            });

            return response.status(200).json({ message: 'Company updated successfully' });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    deleteCompany: async (request, response) => {
        try {
            const { id } = request.params;

            await Company.findByIdAndDelete(id);

            return response.status(200).json({ message: 'Company deleted successfully' });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    assignUserToCompany: async (request, response) => {
        try {
            const { id, userId } = request.params;

            // find the company
            const company = await Company.findById(id);

            // check if the company exists
            if (!company) {
                return response.status(404).json({ message: 'Company not found' });
            }

            // check if the user is already assigned to the company
            if (company.manager == userId) {
                return response.status(400).json({ message: 'User already assigned to the company' });
            }

            // find the user
            const user = await User.findById(userId);

            // check if the user exists
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // assign the user to the company
            company.manager = userId;

            await company.save();

            // assign the company to the user
            user.company = id;

            // change the role of the user
            user.role = 'manager';

            await user.save();

            return response.status(200).json({ message: 'User assigned to the company successfully' });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

module.exports = companyController;