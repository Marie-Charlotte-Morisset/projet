import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import User from "../models/User.js";
//liés au controller
const initUserRoutes = (app, sm, jwt) => {
  const router = Router();
  router.post("/register", sm, userController.register);
  router.post("/login", sm, userController.login);
  router.post("/lost-password", sm, userController.lostPassword);
  router.post("/check-reset-password-token", sm, userController.getUserbyToken);
  router.post("/save-new-password", sm, userController.saveNewPassword);
  router.patch("/change-role", jwt, sm, userController.changeRole);

  app.use("/user", router);
};

export default initUserRoutes;
