import express from 'express'
import { addUser  , getUser , removeData , updateData} from './mongodb_server.js';

const app = express();
app.use(express.json());
const PORT = 7000

// get req
app.get("/" , async (req ,res)=> {
    const userData = await getUser()
    res.json(userData);
})


// post req | add new users 
app.post("/api/post" , async (req , res)=> {
    const users = req.body;
    const newData = await addUser(users);
    res.json(newData);
})


// put req | update data from users 
app.put("/api/update/:name" , async(req , res)=>{
    const name = req.params.name
    const newData = req.body;
    const result = await  updateData(name , newData)
    res.json({message : "user updated ! " , result})
})

// delete req | remove data from users
app.delete("/api/delete/:name" , async (req , res)=> {
    const name = req.params.name;
    const result = await removeData(name);
    res.json({message:"user deleted : " , result});
})


app.listen(PORT , ()=> {
    console.log("Server is running on the PORT http://localhost:" + PORT);
})