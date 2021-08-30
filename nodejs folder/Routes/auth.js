const express = require("express");
const authrouter = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const {validatesignup, validatelogin} = require('../validation');
const bcrypt = require('bcryptjs');

authrouter.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }catch(err) {
        res.json({message: err})
    }
});
authrouter.post('/signup', async (req, res) => {
    // Check Validation for signup user
    const { error } = validatesignup(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    // return res.status(400).send(error.details[0].message);

    // Check if user already exists
    const existingUser = await User.findOne({UserName: req.body.userName})
    if (existingUser) {
        return res.status(400).json({message: "User already exists"})
    }

    // Hash our Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create User
    const user = new User({
        AccountNumber: req.body.accountNumber,
        UserName: req.body.userName,
        Password: hashedPassword
    });

    // Save User to database
    try {
    const savedUser = await user.save()
    res.json(savedUser)
    console.log(savedUser)
    }catch(err){
    res.json({message: err})
    }

});

authrouter.post('/login', async (req, res) => {

    // Check Validation for login user
    const {error} = validatelogin(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    // check if the UserName exists
    const existsUser = await User.findOne({UserName: req.body.userName})
    if (!existsUser) {
        return res.status(400).json({message: "User Doesn't exist"})
    }

    // console.log(existsUser)

    const validpass = await bcrypt.compare(req.body.password, existsUser.Password)
    if (!validpass) {
        return res.status(400).json({message: "Invalid password"})
    }
    // Create token
    const token = jwt.sign({_id: existsUser._id}, process.env.TOKEN_SECRET)
    
    try {
    res.header('auth-token', token).json(existsUser)
    console.log(existsUser)
    }catch(err){
    res.json({message: err})
    }
});


module.exports = authrouter;