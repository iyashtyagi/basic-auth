const { jwtTokenVerify } = require("../functions/jwtFunc");


async function isLoggedIn(req,res,next){
    // const {authentication} = req.headers;
    
    // const isVerified = await jwtTokenVerify(authentication);

    // if(1){
    //     return res.redirect("/home");
    // }
    next();
}

module.exports = {
    isLoggedIn
}