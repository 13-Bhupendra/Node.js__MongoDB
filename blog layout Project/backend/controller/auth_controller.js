import { AuthModel } from "../models/auth_model.js";
import bcrypt from "bcrypt";

export const signUp = async (req , res) => {
    try {
        const {email , password } = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = new  AuthModel({
            email : email ,
            password : hashedPassword
        })
        const result = await user.save()
        res.status(200).json({message : "User registration successfully !" , result} );
        
    } catch (error) {
        res.status(401).json({message : "User registration failed !" , error : error.message});
    }
}

export const signIn = async (req ,res)=> {
    const {email , password} = req.body;
    const user = await AuthModel.findOne({email : email});
    if(!user){
          res.status(400).json({ message: "user not registered !" })
    }

    const isMatched = await bcrypt.compare(password , user.password);
    if(isMatched){
          res.json({ message: "user signin successfully !!" });
    }else{
         res.status(400).json({ message: "Password is incorrect !" });
    }
}