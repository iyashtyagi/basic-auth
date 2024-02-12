function errorHandler(err,req,res,next){
    if(err){
        console.log(err);
        return res.status(500).json({"message": "Internal server error"});
    }
}

module.exports = {
    errorHandler,
}