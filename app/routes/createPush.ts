import express from "express";
import { setGCMAPIKey, setVapidDetails, sendNotification } from "web-push";

export const createPush = async (
  req: express.Request,
  res: express.Response
) => {
  const title = req.body.title;
  const body = req.body.body;
  setGCMAPIKey(String(process.env.FCM_API_KEY));
  setVapidDetails(
    "mailto:" + process.env.VAPID_EMAIL,
    String(process.env.VAPID_PUBLIC_KEY),
    String(process.env.VAPID_PRIVATE_KEY)
  );

  res.send({
    hello: "welt",
    title,
    body
  });
};
