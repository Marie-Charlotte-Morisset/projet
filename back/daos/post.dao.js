import Post from "../models/post.model.js";

const getPost = async () => {
  let posts = null;
  let errorPosts = null;

  try {
    posts = await Post.find();
  } catch (e) {
    errorPosts = `Could not get posts : ${e.message}`;
  } finally {
    return { posts, errorPosts };
  }
};

export const postDao = {
  getPost,
};
