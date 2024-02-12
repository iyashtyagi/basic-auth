const jwt = require("jsonwebtoken");
const {User} = require("../models/users");
require("dotenv").config();

function jwtTokenGen(payload, uniqueId){
    try {
        const secretToken = uniqueId + process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretToken);
        return token;
    } catch (error) {
        throw error;
    }
}

function jwtTokenDecoder(token){
    try {
        const payload = jwt.decode(token);
        return payload;
    } catch (error) {
        return false;
    }
}

async function jwtTokenVerify(token){
    const payload = jwtTokenDecoder(token);
    if(!payload){
        return {"sucess" : false, "stauts" : 400,  "reason": "Invalid token"};
    }
    const user = await User.findOne({email: payload.email});
    if(!user){
        return {"success" : false, "status" : 404,"reason": "User don't exist"};
    }
    const secretToken = user.uniqueId + process.env.JWT_SECRET;
    try {
        jwt.verify(token,secretToken);
        return {"sucess" : true};
    } catch (error) {
        return {"sucess" : false, "stauts" : 400,"reason": "Verification failed"};
    }
}


module.exports = {
    jwtTokenGen,
    jwtTokenVerify,
    jwtTokenDecoder,
}