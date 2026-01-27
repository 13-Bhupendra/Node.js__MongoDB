import { Auth_Collection } from "../model/auth_model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

/*=================validate Signup middleware ==============*/
export const validateSignupReq = async (req ,res , next)=>{
    const {name , email , password , role } = req.body
    let isvalid = true
    const errors = {}

    if(!name || !email || !password || !role){
        errors.fields =  "*All fields must be required !"
        isvalid = false;
    };

    //already user exist then : 
    const user = await Auth_Collection.findOne({email})
    if(user){
        errors.userExist =  "*Email already registered. Please sign in instead."
        isvalid = false;
    }

    const nameRegx = /^[A-Za-z ]{5,30}$/;
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    const roleRegx = /^(user|investigator|admin)$/;
    
    //name regx
    if(!nameRegx.test(name)){
            errors.name = "*Name must be at least 5 characters long"
            isvalid = false;
    };

    //Email regx
     if(!emailRegx.test(email)){
            errors.email = "*Please enter a valid email address"
            isvalid = false;
    };

    //Pass regx
     if(!passwordRegx.test(password)){
            errors.password ="*Password must be minimum 6 characters and contain letters and numbers"
            isvalid = false;
    };

    //Role regx
     if(!roleRegx.test(role)){
            errors.role =  "*Role must be user, investigator, or admin"
            isvalid = false;
    };

    if(!isvalid){
        return res.status(400).json({
            status: false,
            errors,
         });
    }
    next()
}


/*=================validate Signin middleware ==============*/
export const validateSigninReq = async (req, res , next)=>{
    const {email , password} = req.body;

    let isvalid = true
    const errors = {};

    if(!email || !password){
           errors.fields =  "*All fields must be required !"
            isvalid = false;
    };

    //Email regx
    const user = await Auth_Collection.findOne({email});
     if(!user){
            errors.email = "*User not found , Register first !"
            isvalid = false;
    } else {
        const isMatch = await bcrypt.compare(password , user.password); 
        if(!isMatch){
            errors.password ="*Incorrect Password !"
            isvalid = false;
        }
}

   if (!isvalid) {
        return res.status(400).json({
            status: false,
            errors,
        });
        }

    next()
}

//===================== change password middleware===============
export const validateChangePassword = async (req ,res , next)=>{
        
    const {email , oldPassword , newPassword} = req.body;
     const user = await Auth_Collection.findOne({email})
    
     if(!user){
            return res.status(400).json({status : false , message : "*User not found !"});
    }
    
    const isMatch = await bcrypt.compare(oldPassword , user.password);
    if(!isMatch){
        return res.status(400).json({status : false , message : "*Password dos'nt Match to old Password !"});
    }

    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if(!passwordRegx.test(newPassword)){
        return res.status(400).json({status : false , message : "*Password must be minimum 6 characters and contain letters and numbers"});
    }

    if(newPassword === oldPassword){
        return res.status(400).json({status : false , message : "*New password cannot be the same as the old password"});
    }

    next()
}


/*=================Verify User token middleware ==============*/
export const verifyToken = (req, res , next)=>{
    const token = req.cookies.Auth_Token;

    if(!token){
        return res.status(401).json({status : false , message : "Unauthorized !"});
    }

    try {
        const decoded = jwt.verify(token , process.env.SECRET_KEY)
        req.user = decoded.user;
        next()
    } catch (error) {
        return res.status(401).json({status : false , message: "Invalid token" });
    }
}