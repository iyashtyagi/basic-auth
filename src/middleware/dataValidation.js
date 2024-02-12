const zod = require("zod");

function signupDataValidator(req,res,next){
    const signupSchema = zod.object({
        username : zod.string().min(3).regex(/^[a-zA-Z0-9_]+$/),
        email : zod.string().email(),
        password : zod.string().min(6).max(25)
    });
    
    const isValid =  signupSchema.safeParse(req.body);
    if(!isValid.success){
        return res.status(400).json({"message" : "Bad inputs"});
    } 
    req.body.validData = isValid.data;
    next();
    return;
}

function loginDataValidator(req,res,next){
    const data = parsedData(req.body);
    const loginSchema = zod.object({
        // Check if either username or email is present
        username: zod.string().min(3).regex(/^[a-zA-Z0-9_]+$/).optional(),
        email: zod.string().email().optional(),
        password: zod.string().min(6).max(25)
    }).refine(data => data.username || data.email, {
        message: 'Either username or email must be provided',
        path: ['username', 'email']
    });

    const isValid =  loginSchema.safeParse(data);
    if(!isValid.success){
        return res.status(400).json({"message" : "Bad inputs"});
    }
    console.log(`data: ${JSON.stringify(data)}`);
    console.log(`isValid.data: ${JSON.stringify(isValid.data)}`)
    req.body.validData = data;
    next();
    return;
}

function parsedData(req){
    const data = {"password": req.password};
    if(req.credential.includes("@")){
        data["email"] = req.credential;
        data["credentialType"] = "email";
    }
    else{
        data["username"] = req.credential;
        data["credentialType"] = "username";
    }
    return data;
}

module.exports = {
    signupDataValidator,
    loginDataValidator,
}