const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/User");
const JWT_SECRET = "kaushalpapnai$123"
const authenticate = require("../middleware/fetchuser")


// ROUTE 1 : create a user using post request : "api/auth/createuser". NO login 

router.post("/createuser", [
  body('email', "enter a valid email").isEmail(),
  body('name', "enter a valid name").isLength({ min: 3 }),
  body('password', "enter a valid password").isLength({ min: 5 }),
], async (req, res) => {
  let success = false

  // if there are errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check weather the user with the same email exists already 
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, error: "the email you entered is already exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data =  {
     user:{
      id: user.id
     }
    }
    const authToken = jwt.sign(data,JWT_SECRET)
    success = true
    res.json({success,authToken})
    
  } catch (error) {
    console.log(error.message)
    res.status(400).send('some error occured')
  }
})


//ROUTE 2 :  Authanticate a user using Post : "api/auth/login". NO login 
router.post("/login", [
  body('email', "enter a valid email").isEmail(),
  body('password', "password cannot be blank").exists(),
], async (req, res) => {
   let success = false

  // if there are errors returns bad string or show error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const {email, password} = req.body
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(500).json({error: "incorrect email"})
    }

    const  passwordCompare = await bcrypt.compare(password ,user.password)
    if(!passwordCompare)
    {
      success = false
      return res.status(400).json({success,error: "incorrect password"})
    }

    const data =  {
      user:{
       id: user.id
      }
     }
     const authToken = jwt.sign(data,JWT_SECRET)
      success = true
      res.json({success,authToken})

  } catch (error) {
    console.error(error.message)
    res.status(400).send('some error occured')
  }

})

// ROUTE 3 : get logged in user details POST : "api/auth/getuser".  login required 
router.post("/getuser",authenticate, async (req, res) => {

try {
userId = req.user.id
const user = await User.findById(userId).select("-password")
res.send(user)

} catch (error) {
  console.error(error.message)
  res.status(400).send('some error occured')
}
})


module.exports = router