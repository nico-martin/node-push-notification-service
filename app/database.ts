import models from "./models";

export interface ISubscription {
  id: string;
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
    id,
    endpoint,
    p256dh,
    auth
  }: ISubscription): Promise<ISubscriptionsAdded> => {
    const subscription = await models.Subscriptions.findOne({ id });

    console.log("endpoint", endpoint);
    console.log("subscription", subscription);
    subscription
      ? await models.Subscriptions.updateOne(
          { _id: subscription._id },
          {
            id,
            endpoint,
            p256dh,
            auth
          }
        )
      : await models.Subscriptions.create({
          id,
          endpoint,
          p256dh,
          auth
        });
    return {
      type: subscription ? "updated" : "add",
      data: await models.Subscriptions.findOne({ id })
    };
  },
  getAll: async (): Promise<ISubscription[]> => {
    const subscriptions = await models.Subscriptions.find({});
    return subscriptions.map(subscription => {
      return {
        id: subscription.id,
        endpoint: subscription.endpoint,
        p256dh: subscription.p256dh,
        auth: subscription.auth
      };
    });
  },
  get: async (id: string): Promise<ISubscription | false> => {
    const subscriptions = await models.Subscriptions.find({ id });
    return subscriptions[0] || false;
  },
  delete: async (id: string): Promise<boolean> => {
    const deleted = await models.Subscriptions.deleteOne({ id });
    return deleted.deletedCount === 1;
  }
};
