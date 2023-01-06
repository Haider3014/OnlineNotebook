const express = require('express');
const User = require('../models/User');
const route = express.Router();
// express router used to define what we have to do with the endpoint or URI
const { body, validationResult } = require('express-validator');
// Validation got from express validator package
// put validator in an array to store multiple error at once
const bcrypt = require('bcryptjs');
// for creating hash of password and adding salt we required bcrypt package
const jwt = require('jsonwebtoken');
// to generate token for a user we required jsonwebtoken package

const jwt_secret = "Haiderisaverygoodman";

const fetchuser=require('../middleware/fetchuser')


// Route-1 createuser
// code snippet is from route express

route.post("/createuser", [
  body('name').isLength({ min: 3 }),
  body('password').isLength({ min: 5 }),
  body('email').isEmail(),

], async (req, res) => {
  let sucess=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ sucess,errors: errors.array() });
  }
  // Creating user with help of express validator example
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({sucess, error: 'Sorry the email already exists' })
    }
    else {
      const salt = await bcrypt.genSaltSync(10);
      const secpass = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email
      })

      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, jwt_secret);
      sucess=true;
      res.json( { sucess,token} )
    }
  }

  catch (error) {
    console.error(error.message);
    res.status(402).send("Internal Error occured")
  }

});

// creating user done 
// now we have to create a endpoint to login the user
// In this endpoint we will also get the token just like the createuser

// Route-2
// code snippet is from route express i only have to search eoute express and i will get the snippet
route.post("/login", [
  body('email', "Please enter the valid credentials").isEmail(),
  body('password', "You can not enter a blank password").exists()
], async (req, res) => {
  let sucess=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ sucess,errors: errors.array() });
  }
const { email, password } = req.body

try {
  let user = await User.findOne({ email })
  if (!user) {
    res.status(400).json({ sucess,error: "Please enter the valid credentials" })
  }
  const compareuser = await bcrypt.compare(password, user.password)
  if (!compareuser) {
    res.status(400).json({ sucess,error: "Please enter the valid credentials" })
  }
  const data = {
    user: {
      id: user.id
    }
  }
  const token = jwt.sign(data, jwt_secret);
   sucess=true;
  res.json( { sucess,token} )
  // token must be a object to send json

} 
catch (error) {
  console.error(error.message);
  res.status(402).send("Internal Error occured")
}
});

// In this end point we will fetch the information of user with help of token and Login will required in this 
// Route-3
route.post("/getuser",fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //  we will fetch ID by req.user.id,WE stored the id data into req.user
    userId=req.user.id;
    const user= await User.findById(userId).select('-password')
    res.send(user) 
    
    
  } catch (error) {
    console.error(error.message);
    res.status(400).json({error:'Internal server error'})
  }
});

module.exports = route