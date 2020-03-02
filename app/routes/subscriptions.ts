import express from "express";
import { Subscriptions } from "../database";

export const addOrUpdateSubscription = async (
  req: express.Request,
  res: express.Response
) => {
  const sub = await Subscriptions.add({
    endpoint: String(req.body.endpoint),
    p256dh: String(req.body.p256dh),
    auth: String(req.body.auth)
  });

  res.status(sub.type === "add" ? 201 : 200).send(sub);
};
