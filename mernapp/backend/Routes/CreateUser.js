const {response} = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MYnameisIshitaJana$hujikfrgth"


router.post("/createuser",[
body('email', 'Incorrect email id').isEmail(),
body('name', 'invalid name please enter atleast 5 characters').isLength({ min: 5 }),
// password must be at least 5 chars long
body('password','incorrect password : min length=5').isLength({ min: 5 })],
async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
       await User.create({
            name:req.body.name,
            password: secPassword,
            email:req.body.email,
            location:req.body.location
        })

    res.json({success:true});
    
    } catch (err) {
        console.log(err);
        res.json({success:false});
    }
})

router.post("/loginuser",[
    body('email', 'Incorrect email id').isEmail(),
    body('password','incorrect password : min length=5').isLength({ min: 5 })],
    async(req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
       let email = req.body.email;
       console.log(email);
      
        try {
          let userData = await User.findOne({email});
            if(!userData)
            return  res.status(400).json({ errors: "Try logging with correct email"});
        
        const passCompare = await bcrypt.compare(req.body.password,userData.password)

            if(!passCompare){
                return res.status(400).json({ errors: "Try logging with correct password"});
            }
           



            const data ={
                user: {
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret)
            return res.json({success: true, authToken: authToken})
        }


        
        
        
        catch (err) {
            console.log(err);
            res.json({success:false});
        }
    })

module.exports = router;