    import { authCollection } from "../models/authModel.js";
    import bcrypt from "bcrypt";
    import { otpSender } from "../services/otpServices.js";

    //signup
    export const signup = async (req ,res)=>{
        try {
            const {email , name , password} = req.body;
            const hashedPassword = await bcrypt.hash(password , 10);

            const result = await authCollection.create({email , name , password : hashedPassword});
            res.status(201).json({status : true , message: "User registration successfull !" , result});
        } catch (error) {
            res.status(401).json({status : false , message: "Registration failed !" , error : error.message});
        }
    }

    //signin
    export const signin = async(req ,res)=> {
        try {
            const {email , password} = req.body;
            const user = await authCollection.findOne({email});
            if(!user){
                res.status(400).json({status : false , message: "User not registered , signup first !"});    
            }

            const isMatch = await bcrypt.compare(password , user.password)
            if(!isMatch){
                res.status(400).json({status : false , message: "Password is incorrect !"});
            }

            const otpResult  = await otpSender(email);
            if(!otpResult.status){
                return res.status(500).json({otpResult})
            }

            
                    
            res.json({status : true , message : "OTP sent to email "});
        } catch (error) {
            res.status(500).json({status : false , message: "Signin falied !"});  
        }
    }


    // protected route
    export const getData = async (req ,res)=>{
        try {
            const result = await authCollection.find()
            res.status(200).json({ message: "Data fetched" , result });
        } catch (error) {
            res.status(401).json({ message: "Data fetched Falied !" , error });
        }
    }

    //sign out 
    export const signout = (req , res)=>{
        res.clearCookie("mainToken");
        res.clearCookie("isAuth")

        res.status(200).json({ message: "User signed out successfully" });
    }