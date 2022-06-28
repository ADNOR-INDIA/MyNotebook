const express = require('express');
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let fetchuser = require('../middleware/fetchuser.js');


// ROUTE_1 : Create a user using: POST "/api/auth/createuser". No login required
router.post('/createUser',
    [body('email').isEmail(),
    body('password').isLength({min:5})],
    async(req, res)=>{
        let success = false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);    
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors:errors.array()}); 
    } 
    // console.log(req.body);
    // const user = User(req.body);
    // user.save(); 
    // res.send(req.body); 

    // check whether the user with this email exists already 
    try{
    let user =await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({success, error: "sorry user with this email already exists"}) 
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
      });
      const data = {
          user:{
              id:user.id
          }
      }
      
    // JWT facilitates the secure connectin between client and server.
      const JWT_SECRET = 'safestringdonotshowtoanyone';
      const authtoken = jwt.sign(data, JWT_SECRET);
      //res.json(user)
      success = true;
      res.json({success, authtoken});
    }
    catch (error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
      
        // .then(user => res.json(user))
        // .catch(error=>{console.log(error)
        // res.json({error: 'Please Enter unique value'})});
})

//ROUTE_2:  authentiacte a user using: POST"/api/auth/login. No login required.
router.post('/login',
    [body('email').isEmail(),
    body('password').isLength({min:5})],
    async(req, res)=>{
        let success=false
        // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); 
    }
    // destructuring done taking out email and passsword from req.body).
    const {email, password} = req.body;
    try{
        let user =await User.findOne({email:email});
        if(!user){
            return res.status(400).json({success, error:"Wrong Credentials, please try again"});
        }

        const passCompare = bcrypt.compare(password, user.password);
        if(!passCompare){
            return res.status(400).json({success, error:"Wrong Credentials, please try again"});
            
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const JWT_SECRET = 'safestringdonotshowtoanyone';
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken});
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})  

//ROUTE_3:  Get login user details: POST"/api/auth/getuser. No login required.
router.post('/getuser',fetchuser,
    async(req, res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user); 
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    } 
})


module.exports = router