import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(json());

dotenv.config();

// routes
app.use(routes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});