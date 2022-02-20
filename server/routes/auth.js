const express = require('express');
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');




// Create a user using: POST "/api/auth". Does not require auth
router.post('/createUser',
    [body('email').isEmail(),
    body('password').isLength({min:5})],
    async(req, res)=>{
        // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); 
    } 
    // console.log(req.body);
    // const user = User(req.body);
    // user.save(); 
    // res.send(req.body); 

    // check whether the user with this email exists already 
    try{
    let user =await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({error: "sorry user with this email already exists"}) 
    }
    // making a secures password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // creating new user.
    user= await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: secPass,
        email:req.body.email,
      })
      res.json(user)
    }
    catch (error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
      
        // .then(user => res.json(user))
        // .catch(error=>{console.log(error)
        // res.json({error: 'Please Enter unique value'})});
})

module.exports = router