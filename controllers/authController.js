const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
    register: async (request, response) => {
        try {
            // extract the details name, email, password from the request body
            const { name, email, password } = request.body;

            // check if the user already exists
            const userExists = await User.findOne({ email: email });

            // if the user exists, return an error message
            if (userExists) {
                return response.status(400).json({ message: 'User already exists' });
            }

            // hash the password
            if(!password){return res.json("require a password!")}
            const hashedPassword = await bcrypt.hash(password, 10);
            

            

            // create a new user object
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            // save the user object to the database
            await newUser.save();

            // return a success message
            return response.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    login: async (request, response) => {
        try {
            // get the email and password from the request body
            const { email, password } = request.body;

            // check if the user exists
            const user = await User.findOne({ email: email });

            // if the user does not exist, return an error message
            if (!user) {
                return response.status(400).json({ message: 'User does not exist' });
            }

            // check if the password is correct
            const passwordIsValid = await bcrypt.compare(password, user.password);

            // if the password is incorrect, return an error message
            if (!passwordIsValid) {
                return response.status(400).json({ message: 'Invalid password' });
            }

            // generate a token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,);

            // store the token in the cookie
            response.cookie('token', token, { httpOnly: true });

            // return a success message
            return response.status(200).json({ message: 'Login successful' });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    logout: async (request, response) => {
        try {
            // clear the cookie
            response.clearCookie('token');

            // return a success message
            return response.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    me: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user by id
            const user = await User.findById(userId).select('-password -__v -createdAt -updatedAt -_id');

            // return the user details
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

module.exports = authController;