import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createPush } from "./routes/createPush";

const PORT = process.env.PORT || 8080;

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/push/", createPush);

app.listen(PORT, () => console.log(`APP listening to ${PORT}!`));
