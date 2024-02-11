const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const {User} = require("../models/users");

const filePath = path.join(__dirname, "../../public/pages/login.html")

async function isExist(email){
    const user = await User.findOne(email);
    console.log(user);
}


router.get("/",(req,res)=>{
    res.status(200).sendFile(filePath);
})

router.post("/",(req,res)=>{
    const {email,password} = req.body;

    
    

    console.log({email,password});
    res.json({email,password});
})


module.exports = router;