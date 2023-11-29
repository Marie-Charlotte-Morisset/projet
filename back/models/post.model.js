import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const ObjectId = Schema.Types.ObjectId;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  authorFirstName: {
    type: String,
    required: true,
  },
  authorLastName: {
    type: String,
    required: true,
  },
  
  comments: [
    {
      // text: {
      //   type: String,
      //   required: true,
      // },
      // author: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   type: "String",
      //   required: true,
      // },
      // createdAt: {
      //   type: Date,
      //   default: Date.now,
      // },
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
    // required: true
  },
  verified: {
    type: Boolean,
    default: true,
  },
  reported: [{type: ObjectId, ref: "User" }],
});

const Post = model("Post", PostSchema);
export default Post;
