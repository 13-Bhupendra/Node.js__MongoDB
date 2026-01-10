import nodemailer from "nodemailer"
import { OTP_Collection } from "../model/otp_model.js"
import dotenv from "dotenv";
dotenv.config()

/*============ OTP Transporter ===========*/
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL , 
        pass : process.env.PASS
    }
});


/*============ OTP Generator function ===========*/
const generateOTP = ()=>{
    return Math.floor(100000 + Math.random() * 900000)
};


/*============ OTP Sender ===========*/
export const otpSender = async (email)=>{
    const otp = generateOTP()
    const expireAt = new Date(Date.now() + (1000 * 60 * 3)) // otp valid for 3min

    try {
        await OTP_Collection.create({email , otp , expireAt})
        await transporter.sendMail({
            from: `e-Cyber Crime Security <${process.env.EMAIL}>`, 
            to : email,
            subject:"e-Cyber Crime | OTP Verification" ,
            text : `Your One-Time Password (OTP) for e-Cyber Crime account verification is : ${otp}.
This OTP is valid for 3 minutes.
If you did not request this verification, please ignore this email.
            
– e-Cyber Crime Security Team`
        });

        return {status : true , message : "OTP sent successfully !"}
    } catch (error) {
        return {status : false , message : "Can't sent OTP !"}
    }
}