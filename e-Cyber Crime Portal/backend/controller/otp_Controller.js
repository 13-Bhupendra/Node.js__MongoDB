import { Auth_Collection } from "../model/auth_model.js";
import { OTP_Collection } from "../model/otp_model.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

/*============ OTP Verifing function ===========*/
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
            const token = jwt.sign({user} , process.env.SECRET_KEY , {expiresIn : "1d"});
            
            res.cookie("Auth_Token" , token , {
                maxAge :  1000 * 60 * 60 * 24,
                sameSite : "strict",
                httpOnly : true
            })
            
            res.json({status : true , message : "OTP is verified & Signin successfull !"});
            
    } catch (error) {
        res.status(400).json({status : false , message : "Invalid OTP !"})
    }
}