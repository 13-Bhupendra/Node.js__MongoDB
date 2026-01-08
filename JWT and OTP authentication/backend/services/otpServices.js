import nodemailer from "nodemailer"
import { otpCollection } from "../models/otpModel.js"
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASS
    }
});

const generateOTP = ()=>{
    return Math.floor(100000 + Math.random() * 900000);
}

export const otpSender = async (email)=>{
    const otp = generateOTP();
    const expireAt = new Date(Date.now() + (10 * 60 * 1000)) // valid for 10min

    try {
           await otpCollection.create({email ,  otp , expireAt})    ;
            await transporter.sendMail({
                from : `OTP sent <${process.env.EMAIL}>` ,
                to : email ,
                subject : "OTP Authentication",
                text : `Your otp to signin is ${otp}, valid upto 10 minutes`
            })

            return { status: true, message: "OTP sent successfull !" };
    } catch (error) {
        return { status: false, message: "Can`t send otp !" };
    }
}
