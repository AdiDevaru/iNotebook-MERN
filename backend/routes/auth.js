require('dotenv').config();

const express = require('express');
const User = require('../models/User');
const router = express.Router();

const { body, validationResult } = require('express-validator'); //validate user creation fields
const bcrypt = require('bcrypt'); //hash password
var jwt = require('jsonwebtoken'); //JWT

//middlewares
const getUser = require('../middlewares/getUser');

const JWT_SECRET = process.env.JWT_SECRET;

//CREATE USER. No login required. /api/auth/create-user
router.post('/create-user', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async(req, res) => {

    //check for bad request errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check for unique emails
    try {
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({error: "Email already exists!!"})
        }
        //create salt for hashing
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        //create UNIQUE user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        //Generate JWT Auth Token
        const data = {
            user: {
              id: user._id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);      
        res.json({ authtoken })
    }

    //check for server side errors
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//LOGIN USER. No login required. /api/auth/login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async(req, res) => {

    //check for bad request errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if(!user){
            return res.status(400).json({error: "Invalid credentials!!"})
        }
        
        //check password
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({error: "Invalid credentials!!"})
        }
        
        //Generate JWT Auth Token
        const data = {
            user: {
              id: user._id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);      
        res.json({ authtoken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//GET USER DETAILS. Login required. /api/auth/get-user
router.post('/get-user', getUser, async(req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router