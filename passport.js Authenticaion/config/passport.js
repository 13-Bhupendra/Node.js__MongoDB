import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as localStrategy  } from "passport-local";
import { Users } from "../models/authModel.js";

const localstrategy = new localStrategy(
    {usernameField : "email"},
    async (email , password , done )=>{
        try {
            const user =await Users.findOne({email});
            if(!user){
                console.log("user not registered !");
                return done(null , false , {message : "user not found , register first !"});
            }

            const isMatch =await bcrypt.compare(password , user.password);
            if(!isMatch){
                console.log("Password Incorrect !");
                return done(null , false , {message : "Password Incorrect !"});
            }

            return done(null, user , {message : "login successfull !"});
        } catch (error) {
            console.error('Error in LocalStrategy:', error);
            return done(error);
        }
    } 
)

passport.use(localstrategy);

passport.serializeUser(async (user , done )=>{
    done(null , user._id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findById(id);

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (error) {
        console.error("Deserialize error:", error);
        done(error);
    }
});