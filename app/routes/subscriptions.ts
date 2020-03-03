import express from "express";
import { Subscriptions } from "../database";
import { createPushNotification } from "../push";

export const addOrUpdateSubscription = async (
  req: express.Request,
  res: express.Response
) => {
  const subscription = {
    endpoint: String(req.body.endpoint),
    p256dh: String(req.body.p256dh),
    auth: String(req.body.auth)
  };

  const added = await Subscriptions.add(subscription);
  if (added.type === "add") {
    await createPushNotification("Welcome!", "Thanks for subscribing.", [
      subscription
    ]);
  }
  res.status(added.type === "add" ? 201 : 200).send(added);
};
