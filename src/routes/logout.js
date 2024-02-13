const express = require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { jwtTokenDecoder } = require("../functions/jwtFunc");
const { User } = require("../models/users");
const router = express.Router();

router.post("/" , isLoggedIn,async (req,res)=>{
    const authentication = req.cookies.authentication;
    const userData = jwtTokenDecoder(authentication);
    console.log(userData);
    const user = await User.findOneAndUpdate({"email" : userData.email},{uniqueId : null})
    await user.save();
    res.cookie("authentication", null).redirect("/login");
})

module.exports = router;