const {User} = require("../models/users");

async function findUserByEmail(email){
    const user = await User.findOne({email});
    console.log(user);
}

async function createNewUser(username,email,password){
    
}

module.exports = {
    findUserByEmail
}