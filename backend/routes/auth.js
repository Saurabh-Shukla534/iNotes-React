const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_secret = "iNotesMyApp";

// Creating user using Post "/api/auth/createUser". 
router.post('/createUser', [
    body('name', 'Please enter name. Character length should be minimum 5.').isLength({min: 5}),
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Please enter password. Character length should be minimum 8.').isLength({min: 8}),
], async(req, res) => {
  // Returning errors, if any, alongwith bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()})
    }
    
    try {  
      // Check user already exists with email.
      let user = await User.findOne({email: req.body.email});
      if(user) {
        return res.status(400).json({error: "User already exists with this email."})
      }

      const salt = await bcrypt.genSaltSync(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);
      // Create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
      })

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_secret);
      // res.json(user);
      res.json({authToken});
    } catch(error) {
      console.error(error.message);
      res.status(500).send("Some error occurred.")
    }

    
    // .then(user => res.json(user))
    //     .catch(err => {console.log(err)
    //   res.json({error: 'Please enter an unique email', message: err.message})})
    // res.send(req.body);
})

module.exports = router;