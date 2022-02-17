const express = require('express');
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const router = express.Router();




// Create a user using: POST "/api/auth". Does not require auth
router.post('/',
    body('email').isEmail(),
    body('password').isLength({min:5}),
    (req, res)=>{
        // Finds the validation wrrors in this request and wraps them in an object with handu functions
    const errors = validationResult(req);    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 
    // console.log(req.body);
    // const user = User(req.body);
    // user.save(); 
    // res.send(req.body); 
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email:req.body.email,
      }).then(user => res.json(user))
        .catch(error=>{console.log(error)
        res.json({erroe: 'Please Enter unique value'})});
})

module.exports = router