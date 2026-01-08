import { authCollection } from "../models/authModel.js";
import { otpCollection } from "../models/otpModel.js";
import { generateToken } from "../utils/jwt.js";

export const verifyOTP = async (req, res)=>{
 try {
    const {email , otp } = req.body;
    const otpData = await otpCollection.findOne({email , otp});
    
    if(!otpData){
        res.status(400).json({status : false , message: " Invalid OTP !"});
    }

    if(otpData.expireAt < new Date()){
            res.status(400).json({status : false , message: "OTP expired !"});
    }

    const user = await authCollection.findOne({email})
    const token = generateToken(user._id , user.email);

    res.cookie("mainToken" , token , {
        httpOnly : true,
        maxAge: 60 * 60 * 1000, 
        sameSite: "strict",
    })

    await otpCollection.deleteMany({email});

    res.status(200).json({status : true , message: "Signin successfully !" , token});

 } catch (error) {
        res.status(500).json({status : false , message: "Invalid otp !"});
 }
}