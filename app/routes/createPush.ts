import express from "express";
import { createPushNotification } from "../push";

export const createPush = async (
  req: express.Request,
  res: express.Response
) => {
  // Auth
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  const appPassword = String(process.env.AUTH_ADMIN_PASSWORD);

  if (
    appPassword !== "undefined" &&
    (login !== "admin" || password !== appPassword)
  ) {
    res.status(401).send({
      error: "Authentication failed"
    });
  }

  const title = req.body.title;
  const body = req.body.body;

  res.send(await createPushNotification(title, body, []));
};
