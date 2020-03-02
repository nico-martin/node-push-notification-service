import express from "express";
import { setVapidDetails, sendNotification } from "web-push";
import { Subscriptions } from "../database";

export const createPush = async (
  req: express.Request,
  res: express.Response
) => {
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
  /*
  sendNotification(pushSubscription, JSON.stringify({ title, body }))
    .then(notification =>
      res.send({
        title,
        pushSubscription,
        notification
      })
    )
    .catch(err => res.send(err));
*/
};
