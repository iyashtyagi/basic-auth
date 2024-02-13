const { jwtTokenVerify } = require("../functions/jwtFunc");

async function isLoggedIn(req,res,next){

    const authentication =  req.cookies.authentication;
    
    const isValidUser = await jwtTokenVerify(authentication);
    if(!isValidUser.success){
        return res.redirect("/login");
    }
    next();
}
async function isNotLoggedIn(req,res,next){

    const authentication =  req.cookies.authentication;
    
    const isValidUser = await jwtTokenVerify(authentication);
    if(isValidUser.success){
        return res.redirect("/");
    }
    next()
}
module.exports = {
    isLoggedIn,
    isNotLoggedIn
}