import {MongoClient} from 'mongodb'

const url = "mongodb://127.0.0.1:27017"
const client = new MongoClient(url);

// connection of mongodb
const connectMongoDB = async ()=> {
   await client.connect();
   console.log("Server connected successfully !! ");
   return client.db("users");
}


// get / read data
export const getUser = async ()=>{
    const db = await connectMongoDB();
    const users = await db.collection("users").find().toArray();
    console.log("Users Data : " , users)
    return users;
}

// create a data (Insert Data)
export const addUser = async (users)=>{
    const db = await connectMongoDB();
    const result = await db.collection("users").insertOne(users)
    console.log("user Inserted : " , result.insertedId);
    return result;
}

// delete data 
export const removeData = async (name)=>{
    const db = await connectMongoDB();
    const result = await db.collection("users").deleteOne({name : name});
    console.log("Delete data" , result.deletedCount)
    return result;
}

// update data
export const updateData = async (name , newData)=>{
    const db = await connectMongoDB();
    const result = await db.collection("users").updateOne(
        {name : name},
        {$set : newData}
    )
    console.log("Update count" , result.modifiedCount);
    return result;
}


// getUser()