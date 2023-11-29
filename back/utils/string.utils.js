export const stringIsFilled = (s) => typeof s === "string" && !!s.length;   //typeof s === "string" : Cela vérifie si la variable s est de type "string".stringIsFilled renvoie true si s est une chaîne non vide, et false sinon.
//fonction qui génère une chaîne de caractère aléatoire
//Permet de verifier si le token est actif.
export const makeid = (length) => {
  let result = ""; //chaîne de caractère vide, qui sera utilisé pour stocker le résultat final
  const characters =    
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length; //stocker la longueur de la chaîne de caractère ds une variable
  let counter = 0;
  while (counter < length) {    //boucle while qui itère tant que la longueur actuelle de la chaîne générée (result) est inférieure à la longueur spécifiée (length).
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); // À chaque itération, un caractère aléatoire est extrait de la chaîne de caractères définie (characters) en utilisant Math.random() et ajouté à la chaîne result.
    counter += 1;
  }
  return result;
};
//vérification au niveau des chaînes de caractère