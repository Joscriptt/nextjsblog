import { connectDB } from "@/db/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectDB();
  try {
    const singlePost = await Post.findById(id);
    return NextResponse.json(singlePost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch a post" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await connectDB();
  try {
    await Post.findByIdAndDelete(id);
    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json("cant delete", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  await connectDB();

  try {
    const { userId } = await req.json();
    const existing = await Post.findById(id);

    if (!existing.saved.includes(userId)) {
      await existing.updateOne({ $push: { saved: userId } });
    } else {
      await existing.updateOne({ $pull: { saved: userId } });
    }
    return NextResponse("Liked/Unliked", { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to liket", { status: 500 });
  }
}
