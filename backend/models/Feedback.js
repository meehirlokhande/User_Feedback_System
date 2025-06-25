const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        feedback:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            enum:['bug','suggestion','feature','general'],
            default:'general',
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'resolved'],
            default: 'pending',
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model('Feedback',feedbackSchema);