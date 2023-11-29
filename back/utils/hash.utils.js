import bcrypt from "bcrypt";
//nbr de caractère
const SALT_ROUND = 10;
//config hashage mot de passe
export const hash = async (password) => {
  let error = null;
  let hashed = null;
  try {
    hashed = await bcrypt.hash(password, SALT_ROUND);
  } catch (e) {
    error = `Error when hash: ${e.message}`;
  } finally {
    return { hashed, err: error };
  }
};

// utilise la bibliothèque bcrypt pour comparer un mot de passe en texte brut (password) avec un mot de passe déjà haché (toCompare). 
export const compareHash = async (password, toCompare) => { //on compare le mot de passe haché avec le vrai mot de passe
  let error = null; // variable sera utilisée pour stocker les éventuelles erreurs survenues lors de la comparaison.
  let match = false; // Cette variable sera utilisée pour indiquer si les mots de passe correspondent après la comparaison.
  try {
    match = await bcrypt.compare(password, toCompare); //Compare le mot de passe en brut avec le mot de passe haché, le résultat est stocké ds la variable match.
  } catch (e) {
    error = `Error when compare: ${e.message}`; //  Si une erreur se produit pendant la comparaison, elle est capturée et stockée dans la variable error.
  } finally { //match qui indique si les mots de passe correspondent, et err qui contient l'éventuelle erreur survenue lors de la comparaison.
    return { match, err: error };
  }
};
