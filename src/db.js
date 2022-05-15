import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

console.log(chalk.bold.blue('URL:',process.env.MONGO_URL));

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);

try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.DATABASE);
  console.log("MongoDB database connected.")
} catch (error) {
  console.log("Erro connecting to database.");
  console.log(error);
}

export default db;