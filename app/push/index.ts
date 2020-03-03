import { sendNotification, setVapidDetails } from "web-push";
import { ISubscription, Subscriptions } from "../database";

export const createPushNotification = async (
  title: string,
  body: string,
  subscriptions: ISubscription[] = []
) => {
  setVapidDetails(
    "mailto:" + process.env.VAPID_EMAIL,
    String(process.env.VAPID_PUBLIC_KEY),
    String(process.env.VAPID_PRIVATE_KEY)
  );

  if (subscriptions.length === 0) {
    subscriptions = await Subscriptions.getAll();
  }
  const r = [];
  let failed = 0;
  let success = 0;
  for (let i = 0; i < subscriptions.length; i++) {
    const subscription = subscriptions[i];
    const pushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth
      }
    };
    try {
      success++;
      r.push(
        await sendNotification(
          pushSubscription,
          JSON.stringify({ title, body })
        )
      );
    } catch (e) {
      success--;
      failed++;
      r.push(e);
    }
  }

  return {
    status: {
      success,
      failed
    },
    responses: r
  };
};
