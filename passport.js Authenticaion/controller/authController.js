import bcrypt from "bcrypt"
import { Users } from "../models/authModel.js"

export const signup = async (req , res)=>{
    try {
        const {name , email , password} = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);
        const result = await Users.create({
            name , 
            email , 
            password : hashedPassword
        });

        res.status(200).json({message : "user registered successfull !" , result});
    } catch (error) {
        res.status(500).json({message : "user not register !" , error})
    }
}

export const signin = (req ,res)=>{
    res.json({message : "login successfull !" , user : req.user});
}

export const dashboard = (req , res)=>{
    res.json({message : "dashboard accessed !" , user : req.user});
}