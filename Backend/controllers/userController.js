const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('../auth/jwt')
const ResponceError = require('../errorHandler/responceError')

exports.login = asyncHandler(async (req,res,next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(new ResponceError("Invalid credentials",400));
    } 
    const isMatch =  await user.checkPassword(password);   
    if(!isMatch){
        return next(new ResponceError("Invalid credentials",400));
    }

    return res.status(200).json({
        token: jwt.generateToken(user._id, [user.role]),
        role : user.role
    });
});

exports.add = asyncHandler( async (req,res,next)=>{
    const {name, email, password, role} = req.body;

    const _user = await User.findOne({email});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({name,email,password:hashedPassword,role});
    
    return res.status(200).json({
        message: "user created",
        user
    })
});
