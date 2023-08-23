import  mongoose from "mongoose"

let isConnected = false

export const connectDB= async()=>{
    mongoose.set("strictQuery", true)

    if(isConnected){
        console.log("connected to mongodb already")
    }

    // mongodb://127.0.0.1:27017/
    
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/test", {
        // await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: "true",
            useUnifiedTopology: "true",
        })
    } catch (error) {
        console.log(error)
    }
}
