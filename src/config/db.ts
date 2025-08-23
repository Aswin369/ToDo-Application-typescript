import mongoose from "mongoose";
 
export async function connectDatabase() {
    try{
        await mongoose.connect(process.env.MOGODB_CONNECTION_URL as string)
        console.log("MongoDB connected");
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

