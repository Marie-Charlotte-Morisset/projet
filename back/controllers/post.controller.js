import { postDao } from "../daos/post.dao.js";
import Post from "../models/post.model.js";
import User from "../models/User.js";
//création du post

//récupération des miniatures du post
export const getPostMiniature = async (req, res) => {
  const postId = req.body.postId;
  try {
    const articles = await Post.find(postId);
    return res.status(200).json({ articles });
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des articles" });
  }
};

export const getPost = async (req, res) => {
  const { errorPosts, posts } = await postDao.getPost();
  if (!!errorPosts || !posts)
    return res.status(400).json({ message: errorPosts });

  // const correctedPost = [];
  // for (let i = 0; i < posts.length; i++) {
  //   const post = posts[i];
  //   const newPost = { ...post, content: unescape(post.content) };
  //   correctedPost.push(newPost);
  // }

  return res
    .status(200)
    .json({ message: "Articles récupérés avec succès", posts });
};

export const setPost = async (req, res) => {
  try {
    const { title, content, category, summary, images, userId } = req.body;
    const user = await User.findById(userId);
    //post daos
    const newPost = new Post({
      title,
      content,
      category,
      summary,
      images,
      authorFirstName: user.name,
      authorLastName: user.lastname,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'article" });
  }
};
