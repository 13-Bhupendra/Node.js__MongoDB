import { Auth_Collection } from "../model/auth_model.js";
import bcrypt from 'bcrypt'
import { otpSender } from "../service/otp_service.js";

/*================= Signup Controller ==============*/
export const signup = async (req ,res)=>{
    try {
        const {name , email , password , role} = req.body
        const hashedPassword = await bcrypt.hash(password , 12);

        const result = await Auth_Collection.create({name , email , role , password : hashedPassword});
        res.status(200).json({status : true , message : "User registration successfull !"});

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
export const signout = async (req ,res)=>{}

