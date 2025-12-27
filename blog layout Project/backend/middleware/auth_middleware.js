import { indexFilePath, signinFilePath } from "../server.js";

export const checkAuthReq = (req , res ,next)=>{
    if(req.body){
        const {email , password} = req.body;
        if(email && password){
            next()
        }
        else
        {
            res.status(401).json({ message: "email & password must required !" });
        }
    }else
    {
         res.status(401).json({ message: "email & password must required !" });
    }
}

export const checkUserLoggedIn = (req ,res , next) => {
     if (req.cookies.auth) {
        next();
    } else {
        return res.sendFile(signinFilePath); 
    }
}

export const redirectIfLoggedIn = (req, res, next) => {
    if (req.cookies.auth) {
        return res.sendFile(indexFilePath); 
    }
    next(); 
};