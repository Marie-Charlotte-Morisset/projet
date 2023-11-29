import escape from "validator/lib/escape.js";

//permet de mettre en place un middleware qui va s'exécuter sur les routes des requêtes, avant que les requêtes ne soient traitées par le serveur.
//permet de protéger le serveur des données entrantes 
const sanitize = (obj) => {
  const keys = Object.keys(obj);
  const newObj = {};

  for (let key of keys) {
    const value = obj[key];
    let newValue = value;

    if (typeof value === "string") {
      newValue = escape(value);
    }

    newObj[key] = newValue;
  }
  return newObj;
};

export const sanitizeMiddleware = (req, res, next) => {
  // req.body = sanitize(req.body);
  // req.params = sanitize(req.params);

  console.log("_");
  console.log("body", req.body);

  next();
};