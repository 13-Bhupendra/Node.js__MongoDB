export const isAuthenticated = (req , res , next)=>{
    if(req.isAuthenticated()){
        return next()
    }

     res.status(403).json({ message: "Unauthorized! Please login first." });
}