import mongoose from "mongoose"; //Importe la bibliothèque Mongoose pour interagir avec MongoDB.
//fonction async
const MongoDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(    //permet d'établir une connexion à la base de données MongoDB avec la fonction connect de monggose
      "mongodb+srv://mariecharlottemorisset:MGPk3OVv4Lma9ZjI@cluster-one.gh8llxt.mongodb.net/",
      { dbName: "test" }
    );
    console.log("Database connected"); //base de données connectées
  } catch (error) { //si une erreur se produit
    console.log("Not connected : ", error.message); //sinon message d'erreur
  }
};

export default MongoDb; //pour pouvoir l'utiliser dans d'autres fichiers