import express from "express";
import auth_routers from "./routes/auth_routes.js"
import { connectDB } from "./config/db.js";

const app = express()
app.use(express.json());
const PORT = 7000;

connectDB()
app.use("/" , auth_routers);

app.listen(PORT, ()=> {
    console.log("Server Started Successfully , on the PORT http://localhost:"+PORT);
});

