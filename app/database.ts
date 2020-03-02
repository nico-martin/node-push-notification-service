import models from "./models";

export interface ISubscription {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export interface ISubscriptionsAdded {
  type: string;
  data: ISubscription | null;
}

export const Subscriptions = {
  add: async ({
    endpoint,
    p256dh,
    auth
  }: ISubscription): Promise<ISubscriptionsAdded> => {
    const subscription = await models.Subscriptions.findOne({ endpoint });
    subscription
      ? await models.Subscriptions.updateOne(
          { _id: subscription._id },
          {
            endpoint,
            p256dh,
            auth
          }
        )
      : await models.Subscriptions.create({
          endpoint,
          p256dh,
          auth
        });
    return {
      type: subscription ? "updated" : "add",
      data: await models.Subscriptions.findOne({ endpoint })
    };
  },
  getAll: async (): Promise<ISubscription[]> => {
    const subscriptions = await models.Subscriptions.find({});
    return subscriptions.map(subscription => {
      return {
        endpoint: subscription.endpoint,
        p256dh: subscription.p256dh,
        auth: subscription.auth
      };
    });
  }
};
