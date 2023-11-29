//fonction prend un objet user en tant que paramètre. Cet objet représente les informations d'un utilisateur.
export const userInfos = (user) => {
  //Création de l'objet formatedUser 
  const formatedUser = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
  };
  //Une fois que toutes les propriétés nécessaires ont été extraites et copiées de l'objet user vers formatedUser, la fonction renvoie l'objet formatedUser.
  return formatedUser;
};
