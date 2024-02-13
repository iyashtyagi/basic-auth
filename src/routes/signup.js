const express = require("express");
const path = require("path");
const router = express.Router();
const {User} = require("../models/users");
const {signupDataValidator} = require("../middleware/dataValidation");
const { v4: uuidv4 } = require('uuid');
const {jwtTokenGen} = require('../functions/jwtFunc');
const {isNotLoggedIn } = require("../middleware/isLoggedIn");

const filePath = path.join(__dirname,"../../public/pages");

router.get("/",isNotLoggedIn,(req,res)=>{
    const file = path.join(filePath,"signup.html");
    res.sendFile(file);
})

router.post("/",signupDataValidator,async (req,res)=>{
    const validData = req.body.validData;
    const {username, email, password} = validData;
    const user = await User.findOne({
        $or : [
            {email},
            {username}
        ]
    });
    if(user){
        if (user.username === username) {
            return res.status(400).json({"message" : "username already taken"});
        } else {
            return res.status(400).json({"message" : "User with this email is already exist"});
        }
    }
    const uniqueId = uuidv4();
    const newUser = new User({
        username,
        email,
        password,
        uniqueId 
    });

    await newUser.save();
    
    const token = jwtTokenGen({username,email}, uniqueId);
    res.cookie("authentication", token).status(200).redirect("/");
})

module.exports = router;