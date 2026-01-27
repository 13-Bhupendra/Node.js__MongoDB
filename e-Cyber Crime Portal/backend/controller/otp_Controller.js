import { Auth_Collection } from "../model/auth_model.js";
import { OTP_Collection } from "../model/otp_model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv";
dotenv.config();

/*============ OTP Verifing controller ===========*/
export const verifyOTP = async (req ,res)=>{
    try {
            const {email , otp} = req.body;
            const record = await OTP_Collection.findOne({email , otp});

            if(!record){
                return res.json({status : false , message : "OTP is incorrect !"});
            }

            if(record.expireAt < new Date(Date.now())){
                return res.json({status : false , message : "OTP is expired !"});
            }

            await OTP_Collection.deleteMany({email});

            const user = await Auth_Collection.findOne({email});
            const token = jwt.sign({user : {
                _id : user._id,
                name : user.name,
                email : user.email,
                role: user.role
            }} , process.env.SECRET_KEY , {expiresIn : "1d"});
            
            res.cookie("Auth_Token" , token , {
                maxAge :  1000 * 60 * 60 * 24,
                sameSite : "strict",
                httpOnly : true
            })
            
            res.json({status : true , message : "OTP is verified & Signin successfull !" , role : user.role});
            
    } catch (error) {
        res.status(400).json({status : false , message : "Invalid OTP !"})
    }
}


/*============== verify otp for create / reset password ================*/
export const verifyOTPForCreatePassword = async (req, res)=> {
    const {email , otp , newPassword } = req.body;

    try {
        const record = await OTP_Collection.findOne({email , otp})
        if(!record){
            return res.json({status : false , message : "OTP is incorrect !"});
        }
        
        if(record.expireAt < new Date(Date.now())){
            return res.json({status : false , message : "OTP is expired !"});
        }

        await OTP_Collection.deleteMany({email});

        const hashedPassword = await bcrypt.hash(newPassword , 12);
        await Auth_Collection.updateOne({email } , {$set : {
            password : hashedPassword
        }})

        return res.json({ status: true, message: "password updated successfully !" });
    } catch (error) {
        return res.json({ status: false, message: "password not updated !" });
    }
}