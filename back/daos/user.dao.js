import User, { ROLE } from "../models/User.js";

const register = async (name, lastname, email, password) => {
  let error = null;
  const user = {
    name,
    lastname,
    email,
    password,
    role: ROLE.USER,
  };
  try {
    await User.create(user); //on compare le user avec le shéma ds le modèle et si ça match création
  } catch (error) {
    error = `Can not create user : ${error.message}`;
  } finally {
    return {
      error,
      user,
    };
  }
};

const findByEmail = async (email) => {
  // dans la base de donnée va vérifier si l'email existe
  let user = null;
  let error = null;
  try {
    const result = await User.findOne({ email: email });
    if (!result) throw new Error(`User ${email} not found`);
    user = result;
  } catch (e) {
    console.error(e.message);
    error = e.message;
  } finally {
    return { error, user };
  }
};
const findById = async (userId) => {
  // dans la base de donnée va vérifier si l'Id existe
  let user = null;
  let error = null;
  try {
    const result = await User.findById(userId);
    if (!result) throw new Error(`User not found`);
    user = result;
  } catch (e) {
    console.error(e.message);
    error = e.message;
  } finally {
    return { error, user };
  }
};

const addResetPasswordToken = async (user, token) => {
  //Va modifier le nouveau mot de passe, supprimer l'ancien mettre le nouveau
  const result = await User.updateOne(
    { _id: user._id },
    { resetPasswordToken: token }
  );
};

const findByToken = async (token) => {
  //va vérifier si le token existe
  let user = null;
  let error = null;
  try {
    const result = await User.findOne({ resetPasswordToken: token });
    if (!result) throw new Error(`User ${token} not found`);
    user = result;
  } catch (e) {
    console.error(e.message);
    error = e.message;
  } finally {
    return { error, user };
  }
};

const saveNewPassword = async (user, passwordHash) => {
  //enregistre le nouveau mot de passe
  const result = await User.updateOne(
    { _id: user._id },
    { resetPasswordToken: "", password: passwordHash }
  );
};

const changeRole = async (userId, role) => {
  let userRole = null;
  let errorRole = null;

  try {
    userRole = await User.findById(userId);
    if (!userRole) throw new Error("User not found");
    userRole.role = role;
    await userRole.save();
  } catch (e) {
    errorRole = e.message;
  } finally {
    return { userRole, errorRole };
  }
};

export const userDaos = {
  //exporte ttes les fonctions dans d'autres doc
  register,
  findByEmail,
  findById,
  addResetPasswordToken,
  findByToken,
  saveNewPassword,
  changeRole,
};
