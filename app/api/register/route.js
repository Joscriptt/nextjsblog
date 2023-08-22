import { connectDB } from "@/db/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(req){

   
  try {

    await connectDB()
    const user = await req.json();
  
    
    const {username, email, password} = user

    if (!username || !email || !password) {
        return new NextResponse("Missing fields", { status: 400 });
      }
      const existUser = await User.findOne({ email: email });
    
      if (existUser) {
        return new Error("Email already exist");
      }

    const newUser = new User({username, email, password});
  
    return NextResponse.json(await newUser.save())
  } catch (error) {
     return NextResponse("failed to create")
  }






}