import fs from "fs"
import path from "path"

export const logger = (req , res , next)=>{
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    const log = `Server Requested ${req.method} on PORT http://localhost:7000/${req.url} at ${date} ${time}\n`;

    // console.log(log)
    const logPath = path.join("server.log");
    fs.appendFile(logPath  , log , (err)=>{
        if(err){
            console.log(err)
        }
    })
    next()
}