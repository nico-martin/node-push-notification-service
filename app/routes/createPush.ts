import express from "express";
import { setVapidDetails, sendNotification } from "web-push";
import { Subscriptions } from "../database";

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

  setVapidDetails(
    "mailto:" + process.env.VAPID_EMAIL,
    String(process.env.VAPID_PUBLIC_KEY),
    String(process.env.VAPID_PRIVATE_KEY)
  );

  const subscriptions = await Subscriptions.getAll();
  const r = [];
  for (let i = 0; i < subscriptions.length; i++) {
    const subscription = subscriptions[i];
    const pushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth
      }
    };
    r.push(
      await sendNotification(pushSubscription, JSON.stringify({ title, body }))
    );
  }

  res.send(r);
};
