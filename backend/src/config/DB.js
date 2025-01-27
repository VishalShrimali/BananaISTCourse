import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db_name = "BananaIST_DB"

const connectionDatabase = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
        console.log(`\n Database is connected on ${ connectionInstance.connection.host}`);
        
    }
    catch(error){
        console.log("\n Database Error.");
    }
}

export { connectionDatabase };