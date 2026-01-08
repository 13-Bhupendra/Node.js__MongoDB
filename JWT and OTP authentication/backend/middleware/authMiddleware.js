import jwt from "jsonwebtoken"


export const validateSignupFields = (req ,res , next)=>{
    const {email , password , name} = req.body;
    if(email && password && name){
        next()
    }else{
        res.status(400).json({status : false , message: "All field must be required !"});
    }   
}

export const validateSigninFields = (req , res ,next)=>{
    const {email , password } = req.body;
    if(email && password){
        next()
    }else{
        res.status(400).json({status : false , message: "All field must be required !"});
    }
}

export const tokenVerificationForProtectRoutes = (req ,res , next)=> {
    const token = req.cookies?.mainToken;
    if(!token){
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
         res.status(401).json({ message: "Invalid token" });
    }
};