const express = require('express');
const dotenv = require('dotenv');
const cors =  require('cors');
const connectDB = require('./config/db');
dotenv.config();
const app = express();

//Database connection
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/feedback',require('./routes/feedbackRoutes'));





const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})


