import { OTP_Collection } from "../model/otp_model.js";

/*=================OTP sent limit middleware ==============*/
export const otpSendLimiter = async (req ,res , next)=>{
    const {email} = req.body 

    if(!email) {
        return res.status(400).json({status : false , message : "Email is required !"})
    }

    const tenMinutesAgo = new Date(Date.now() - 1000 * 60 * 10);

    const otpCount = await OTP_Collection.countDocuments({
        email : email.toLowerCase(),
        createdAt : {$gte : tenMinutesAgo}
    });

    if(otpCount >=3){
         return res.status(400).json({
            status: false,
            message: "OTP limit reached. Try again after 10 minutes."
        });
    }

    next()
}



/*=================OTP Varification fields required  ==============*/
export const validateOtpVerifyReq = (req , res ,next)=>{
    const {email , otp } = req.body

    if(!email || !otp){
        return res.status(400).json({
            status : false , 
            message : "*invalid OTP !"
        });
    }

    next()
}


//============= OTP and NewPassword Validation ==========*/
export const OtpAndNewPasswordValidation =  (req , res , next)=>{
    const { otp , newPassword} = req.body;

    if(!otp || !newPassword){
        return res.status(401).json({status : false , message : "*OTP and New Password must be required !"})
    }

    if(otp.length !== 6){
        return res.status(401).json({status : false , message : "*Enter valid 6 digit OTP !"})
    }
    
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if(!passwordRegx.test(newPassword)){
        return res.status(401).json({status : false , message : "*Password must be minimum 6 characters and contain letters and numbers"})
    }

    next()
}