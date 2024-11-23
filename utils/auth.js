const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

const auth = {
    isAuthenticated: (request, response, next) => {
        try {
            // extract the token from the cookie
            const token = request.cookies.token;

            // if the token is not present, return an error message
            if (!token) {
                return response.status(401).json({ message: 'Unauthorized' });
            }

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // set the user id in the request object
            request.userId = decoded.id;

            // call the next middleware
            next();
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    allowRoles: (roles) => {
        return async (request, response, next) => {
            try {
                // Get the user role from the database
                const user = await User.findById(request.userId);

                // Check if the user has the required role
                if (!roles.includes(user.role)) {
                    return response.status(403).json({ message: 'Forbidden' });
                }

                // Call the next middleware
                next();
            } catch (error) {
                return response.status(500).json({ message: error.message });
            }
        }
    }
}

module.exports = auth;