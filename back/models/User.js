import mongoose from "mongoose";
import { passwordIsValid } from "../utils/regex.utils.js";
//création dans ma base de donnée d'un nouveau modèle
const { Schema, model } = mongoose;
//définition des 3 rôles
export const ROLE ={
    ADMIN: "admin",
    MODERATOR: "moderator",
    USER: "user",
}
//déf du schéma du modèle d'utilisateur
const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // ces infos sont requises
  password: {
    type: String,
    required: [true, "password required"],
    validate: {
      validator: (password) => {
        const passIsOk = passwordIsValid(password);
        return passIsOk;
      },
      message: "Password is not valid",
    },
  },
  resetPasswordToken: { type: String, required: false },
  role: {
    type: String,
    default: ROLE.USER,
    enum: {
        values:[ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER]
    }
}
});

const User = model("User", UserSchema); //  création du modèle utilisateur (User) à partir du schéma (UserSchema).
// model("User", UserSchema) crée un modèle MongoDB appelé "User" basé sur le schéma UserSchema.
export default User;
