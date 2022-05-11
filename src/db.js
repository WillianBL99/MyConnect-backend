import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_URL);

let db = null;
//const mongoClient = new MongoClient(process.env.MONGO_URL);
const mongoClient = new MongoClient("mongodb://localhost:27017");

try {
  await mongoClient.connect();
  //db = mongoClient.db(process.env.DATABASE);
  db = mongoClient.db("test");
  console.log("MongoDB database connected.")
} catch (error) {
  console.log("Erro connecting to database.");
  console.log(error);
}

export default db;