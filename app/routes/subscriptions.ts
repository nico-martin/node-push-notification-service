import express from "express";
import { Subscriptions } from "../database";
import { createPushNotification } from "../push";
import { md5 } from "../utils/cryto";

export const addOrUpdateSubscription = async (
  req: express.Request,
  res: express.Response
) => {
  const subscription = {
    id: md5(String(req.body.endpoint)),
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

export const deleteSubscription = async (
  req: express.Request,
  res: express.Response
) => {
  const deleted = await Subscriptions.delete(md5(String(req.body.endpoint)));
  res.status(deleted ? 404 : 200).send({ deleted });
};

export const getSubscription = async (
  req: express.Request,
  res: express.Response
) => {
  const subscription = await Subscriptions.get(md5(String(req.body.endpoint)));
  res
    .status(subscription === false ? 404 : 200)
    .send({ added: !!subscription });
};
