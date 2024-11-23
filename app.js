// import express
const express = require('express');
const recipesRouter = require('./routes/recipesRoutes');


const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const companyRouter = require('./routes/companyRoutes');
const morgan = require('morgan');
const logger = require('./utils/logger');
const cors = require('cors');



// create an express app
const app = express();

// add middleware to enable core
app.use(cors({
    origin:'http:localhost:5173',
    credentials:true
}))
// add middleware to parse JSON
app.use(express.json());

// add middleware to parse cookies
app.use(cookieParser());

// add middleware to log requests
// app.use(morgan('dev'));
app.use(logger);
app.use('/', express.static('dist'))
app.get("/",(req,res)=>{
    res.json("welcome")
    })
// define the root route
app.use('/api/v1/routes',recipesRouter);
app.use('/api/v1/routes',authRouter);
app.use('/api/v1/routes', companyRouter);

// export the app
module.exports = app;