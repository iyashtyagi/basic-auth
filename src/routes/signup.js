const express = require("express");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname,"../../public/pages");

// const 

router.get("/",(req,res)=>{
    const file = path.join(filePath,"signup.html");
    res.sendFile(file);
})

router.post("/",(req,res)=>{
    const {username, email, password} = req.body;

    res.status(200).json({username,email,password});
})

module.exports = router;