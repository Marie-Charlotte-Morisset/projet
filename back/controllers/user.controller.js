import bcrypt from "bcrypt";
import { userInfos } from "../utils/user.utils.js";
import { jwtSign } from "../middleware/jwt.middleware.js";
import { userDaos } from "../daos/user.dao.js";
import { compareHash, hash } from "../utils/hash.utils.js";
import User, { ROLE } from "../models/User.js";
import { makeid } from "../utils/string.utils.js";
import { postDao } from "../daos/post.dao.js";
import { passwordIsValid } from "../utils/regex.utils.js";

const register = async (req, res) => {
  const { name, lastname, email, password } = req.body;
//on vérifie la force de mon mot de passe grâce à la regex
  const passwordIsOk = passwordIsValid(password)
  if (!passwordIsOk) return res.status(400).json({message: "Password not strong enough."})

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt); //on peut haché le mot de passe

  const { user, error } = await userDaos.register( //on peut le sauvegarder en base de donnée
    name,
    lastname,
    email,
    passwordHash
  );

  if (!!error || !user) {
    return res.status(400).json({ message: "Couldn't register" });
  }

  const token = jwtSign(user.id);

  res.status(201).json({
    message: "Account created successfully",
    user: userInfos(user),
    token: token,
  });
};
//connexion
const login = async (req, res) => {
  const { email, password } = req.body; //on vérifie si les infos sont valides
  const errMsg = "Authentification ratée"; //sinon authent échoue
  //on demande à ce qu'il aille chercher par l'email l'utilisateur
  const { user, error } = await userDaos.findByEmail(email);
  if (!!error || !user) {
    return res.status(400).json({ message: errMsg });
  }
  const { err, match } = await compareHash(password, user.password); //comparer le mot de passe rentré
  if (!!err || !match) return res.status(400).json({ message: errMsg });

  const { errorPosts, posts } = await postDao.getPost();

  const token = jwtSign(user.id); //vérification du token

  return res.status(201).json({
    message: "sign_in_ok",
    user: userInfos(user),
    token: token,
    posts,
  });
};
const lostPassword = async (req, res) => {
  const { email } = req.body;
  const { user, error } = await userDaos.findByEmail(email);
  const newToken = makeid(30);
  userDaos.addResetPasswordToken(user, newToken);
  console.log("http://localhost:3000/nouveau-mot-de-passe/" + newToken);
  return res
    .status(200)
    .json("http://localhost:3000/nouveau-mot-de-passe/" + newToken);
  alert("http://localhost:3000/nouveau-mot-de-passe/" + newToken);
};
// récupération nvx mot de passe
const getUserbyToken = async (req, res) => {
  const token = req.body.token;
  const { user, error } = await userDaos.findByToken(token);
  console.log(user);
  if (!!user) {
    return res.status(200).json({});
  } else {
    return res.status(401).json({});
  }
};
const saveNewPassword = async (req, res) => {
  const { token, password } = req.body;
  const { user, error } = await userDaos.findByToken(token);
  console.log(user, token);
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  userDaos.saveNewPassword(user, passwordHash);
  return res.status(200).json({});
};

const changeRole = async (req, res) => {
  const { userId, role, userRoleId } = req.body;

  const { user, error } = await userDaos.findById(userId);
  if (user.role !== ROLE.ADMIN)
    return res.status(401).json({ message: "Vous n'avez pas les droits !" });
  if (!!error || !user) return res.status(400).json({ message: error });

  const { userRole, errorRole } = await userDaos.changeRole(userRoleId, role);
  if (!!errorRole || !userRole)
    return res.status(400).json({ message: errorRole });

  return res.status(200).json({ message: "Role modifié avec succès" });
};

export const userController = {
  register,
  login,
  lostPassword,
  getUserbyToken,
  saveNewPassword,
  changeRole,
};
