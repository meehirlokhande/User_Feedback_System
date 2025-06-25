const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database Successfully.");
    }catch(error){
        console.error("Connection to Database failed");
    }
};

module.exports = connectDB;