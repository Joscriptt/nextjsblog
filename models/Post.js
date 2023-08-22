import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String },
    tag: { type: Array },
    body: { type: String },
    saved: { type: Array },
    creator: { type: String },
    image: { type: String },
    // image: {
    //   url: {
    //     type: String,
    //   },
    //   public_id: {
    //     type: String,
    //   },
    // },
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("Post", postSchema);
