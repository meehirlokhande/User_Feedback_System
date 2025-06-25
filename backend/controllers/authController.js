const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Registering new user
exports.register = async (req,res) => {
    try{
        const {username,email,password,role='user'} = req.body;

        //Checking if username already taken or not
        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.status(400).json({message:'Username already exists'});
        }

        //Checking if email already used or not
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message:'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = User.create({
            username,
            email,
            password:hashedPassword,
            role,
        });

        res.status(201).json({message:'User registered successfully'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};


//Login User

exports.login = async(req,res) => {
    try{
        const {username,password} = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password,user.password); 
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }

        const token = jwt.sign(
            {
                id: user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'1hr'
            }
        );

        res.json({
            token,
            username:user.username,
            email:user.email,
            role:user.role,
        });

    }catch(err){
        res.status(500).json({error:err.message});
    }
};