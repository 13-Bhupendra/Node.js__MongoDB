import express from "express"
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import './config/passport.js'
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import MongoStore from "connect-mongo";

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(session({
    secret : "secret-key-124421",
    resave : false,
    saveUninitialized : false,
      store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/passportDB"
    }),
     cookie: {
        maxAge: 1 * 60 * 60 * 1000
    }   
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoute);

app.listen(7000 , ()=>{
    console.log("Server started on the PORT http://localhost:7000");
})