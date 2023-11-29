import { Router } from "express";
import { getPostMiniature, getPost, setPost } from "../controllers/post.controller.js";
//afficher les articles du Front vers le Back.

const initPostRoutes = (app, sm, jwt) => {
  const router = Router();
  router.get("/getArticle", sm, jwt, getPost);
  router.post("/createdArticle", sm, jwt, setPost);
  app.use("/Article", router);
};

export default initPostRoutes;
