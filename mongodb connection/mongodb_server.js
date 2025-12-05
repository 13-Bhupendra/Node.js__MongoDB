import {MongoClient} from 'mongodb'

const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url);

// connection of mongodb
const connectMongoDB = async ()=> {
   await client.connect();
   console.log("Server connected successfully !! ");
   return client.db("users");
}

// create a data (Insert Data)
const addUser = async ()=>{
    const db = await connectMongoDB();
    const result = await db.collection("users").insertOne({
        name : "John",
        email : "www.john@gmail.com",
        number : 7887471030,
        gender : 'male'
    })
    console.log("user Inserted : " , result.insertedId);
}

// getUser

addUser()
