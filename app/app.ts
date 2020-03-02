import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectDB } from "./models";

import { createPush } from "./routes/createPush";
import { getPublicKey } from "./routes/getPublicKey";
import { addOrUpdateSubscription } from "./routes/subscriptions";

const PORT = Number(process.env.PORT) || 8080;

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/push/", createPush);
app.get("/key/", getPublicKey);
app.post("/subscription/", addOrUpdateSubscription);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`APP listening to ${PORT}!`));
});
