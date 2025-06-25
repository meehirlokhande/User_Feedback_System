const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },
        email:{
            type:String,
            required:true,
            trim: true,
            lowercase: true,
        },
        feedback:{
            type:String,
            required:true,
            trim: true,
            minlength: [10, 'Feedback must be at least 10 characters'],
            maxlength: [1000, 'Feedback cannot exceed 1000 characters'],
        
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