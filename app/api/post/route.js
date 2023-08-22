import { connectDB } from "@/db/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from "cloudinary";

export async function GET() {
  try {
    await connectDB();
    const post = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json("Failed to get Posts", { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  const post = await req.json();

  if (!post) return NextResponse("Empty fields");
  try {
    const newPost = new Post({ ...post, creator: session.user.id });
    return NextResponse.json(await newPost.save());
  } catch (error) {
    return NextResponse.json("Failed to post", { status: 500 });
  }
}
