import { Auth_Collection } from "../model/auth_model.js";
import bcrypt from 'bcrypt'
import { otpSender } from "../service/otp_service.js";
import { UserProfile_Collection } from "../model/userProfile_model.js";
import { adminProfile_Collection } from "../model/adminProfile_model.js";
import { investigatorProfile_Collection } from "../model/investigatorProfile_model.js";

/*================= Signup Controller ===============*/
export const signup = async (req ,res)=>{
    try {
        const {name , email , password , role} = req.body
        const hashedPassword = await bcrypt.hash(password , 12);

        const result = await Auth_Collection.create({name , email , role , password : hashedPassword});
       
        if(role === "user"){
             const userExists = await UserProfile_Collection.findOne({email}) ;
            if(!userExists){
                await UserProfile_Collection.create({name  , email , role})
            }
        }
        
        if(role === "investigator"){
             const investigatorExists = await investigatorProfile_Collection.findOne({email}) ;
            if(!investigatorExists){
                await investigatorProfile_Collection.create({name , email, role})
            }
        }
        
        res.status(200).json({status : true , message : "User registration successfull !" ,  result});

    } catch (error) {   
        res.status(400).json({status : false , message : "User registration failed !" , error});
    }
}


/*================= SigninController ==============*/
export const signin = async (req ,res)=>{
    try {
        const {email , password}  = req.body;
        const user = await Auth_Collection.findOne({email});
        if(!user){
            return res.status(400).json({status : false , message : "User not found , register first !"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
                return res.status(400).json({status : false , message : "Incorrect password !"});
        }

        if(user.role === "admin"){
            const adminExists = await adminProfile_Collection.findOne({email}) ;
            if(!adminExists){
                await adminProfile_Collection.create({name : user.name , email : user.email , role : user.role})
            }
        }
        
        const isOtpSent = await otpSender(email)
        if(!isOtpSent.status){
                return res.status(500).json({otpResult})
        }

        res.status(200).json({status : true , message : "User SignIn successfull, OTP sent to Email !" , isOtpSent});

    } catch (error) {
        res.status(400).json({status : false , message : "Signin falied !" , error});
    }
}



/*================= Signout Controller ==============*/
export const signout = async (req ,res)=>{
    try {
        res.clearCookie("Auth_Token" , {
             maxAge: 1000 * 60 * 60 * 24,
             sameSite :"strict",
             httpOnly : true
        })
        res.json({ status: true, message: "signout successfully !" })
    } catch (error) {
        res.json({ status: false, message: "signout failed !" });
    }
}


/*================= Change Password Controller ==============*/
export const changePassword = async (req , res )=>{
    const {email , oldPassword , newPassword} = req.body

    try {
        const user = await Auth_Collection.findOne({email})
        if(!user){
            return res.status(400).json({status : false , message : "User not found !"});
        }

        const isMatch = await bcrypt.compare(oldPassword , user.password);
        if(!isMatch){
            return res.status(400).json({status : false , message : "Password dos'nt Match to old Password !"});
        }

        const hashedPassword = await bcrypt.hash(newPassword , 12);
        await Auth_Collection.updateOne({email} , {$set : {
            password : hashedPassword
        }})

        return res.json({ status: true, message: "password changed successfully !" });
    } catch (error) {
          return res.json({ status: false, message:  "Password not changed ! " , error : error.message });
    }       
}


/*================= Forget / reset Password Controller ==============*/
export const resetForgetPassword = async (req , res )=>{
    const {email} = req.body;
    const user = await Auth_Collection.findOne({email})
        if(!user){
            return res.status(400).json({status : false , message : "User not found , Enter valid Email !"});
    }

    const isOtpSent  = await otpSender(email);
    res.json(isOtpSent);
}


