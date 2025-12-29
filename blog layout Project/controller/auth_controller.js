import { AuthModel } from "../models/auth_model.js";
import bcrypt from "bcrypt";
import { indexFilePath, signinFilePath, signupFilePath } from "../server.js";

export const signUp = async (req , res) => {
    try {
        const {email , password } = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = new  AuthModel({
            email : email ,
            password : hashedPassword
        })
        const result = await user.save()
        res.status(200).json({message : "User registration successfully !" , success : true , result} );
        
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
        res.cookie("auth" , true , {httpOnly : true , maxAge : 1000 * 60 *60 * 24})
        return res.json({ message: "user signin successfully !!" , success : true });
    }else{
         res.status(400).json({ message: "Password is incorrect !" });
    }
}

export const getUsers = async (req ,res )=> {
    try {
            const result = await AuthModel.find();
            res.status(200).json({message : "User fetched successfull !" , result});
    } catch (error) {
         res.status(400).json({ message: "Users details not fetched ! " , error });   
    }
}

export const homePage = (req , res)=> {
    res.sendFile(indexFilePath);
}

export const signInPage = (req , res)=> {
    res.sendFile(signinFilePath);
}

export const signUpPage = (req , res)=> {
    res.sendFile(signupFilePath);
}