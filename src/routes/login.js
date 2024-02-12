const express = require("express");
const router = express.Router();
const path = require("path");
const {User} = require("../models/users");
const {loginDataValidator} = require("../middleware/dataValidation");
const {isLoggedIn} = require("../middleware/isLoggedIn")
const { error } = require("console");
const {jwtTokenGen} = require("../functions/jwtFunc");

const filePath = path.join(__dirname, "../../public/pages/login.html")

router.use(isLoggedIn)

router.get("/",(req,res)=>{
    res.status(200).sendFile(filePath);
})

router.post("/",loginDataValidator, async (req,res)=>{
    const {password} = req.body.validData;
    let user = {};
    if(req.body.validData.credentialType === "email"){
        const {email} = req.body.validData;
        user = await User.findOne({email});
    }
    else if(req.body.validData.credentialType === "username"){
        const {username} = req.body.validData;
        user = await User.findOne({username});
    }
    else{
        throw error;
    }
    if(!user){
        return res.status(404).json({"message" : "User not found"});
    }

    if(!user.password === password){
        return res.status(400).json({"message" : "Wrong password"});
    }

    const token = jwtTokenGen({email : user.email, username : user.username},user.uniqueId);

    res.json({user,token});
})


module.exports = router;