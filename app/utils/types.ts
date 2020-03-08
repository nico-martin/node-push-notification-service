import { Document } from "mongoose";

export interface errorReturn {
  status: number;
  code: string;
  text: string;
  trace?: string;
}

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

export interface ISubscriptionBD extends Document {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}
