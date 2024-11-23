const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type:String,
        recquired:true,
    },

    location: {
        type:String,
        recquired:true,
    },
    email: {
        type:String,
        recquired:true,
    },
    phone: 
    {
        type:String,
        recquired:true,
    },
    website: 
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
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
});

module.exports = mongoose.model('Company', companySchema, 'companies');