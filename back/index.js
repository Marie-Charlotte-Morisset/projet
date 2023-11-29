//username : mariecharlottemorisset
//MGPk3OVv4Lma9ZjI
// mongodb+srv://mariecharlottemorisset:MGPk3OVv4Lma9ZjI@cluster-one.gh8llxt.mongodb.net/

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import MongoDb from "./config/dataBase.js";
import initMiddlewares from "./middleware/init.middleware.js";
import initRoutes from "./routes/routes.js";

const salt = bcrypt.genSaltSync(10);
const secret = "asdeef46768g67hytyfy567";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
await MongoDb();

//middlewares
initMiddlewares(app);

//routes
initRoutes(app);

app.listen(8000, () => {
  console.log("Serveur en cours d'exécution sur le port 8000");
});
