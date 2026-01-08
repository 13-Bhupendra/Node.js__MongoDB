import jwt from "jsonwebtoken"
// import detenv from "dotenv"
// dotenv.config()

export const generateToken = (userID , email)=>{
    return jwt.sign(
        {id : userID , email},
        process.env.JWT_SECRET,
        {expiresIn : process.env.JWT_EXPIRE }
    )
}