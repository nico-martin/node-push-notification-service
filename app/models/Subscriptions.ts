import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  endpoint: string;
  p256dh: string;
  auth: string;
}

const SubscriptionsSchema: Schema = new Schema({
  endpoint: {
    type: String,
    required: true,
    unique: true
  },
  p256dh: {
    type: String,
    required: true
  },
  auth: {
    type: String,
    required: true
  }
});

export default mongoose.model<ISubscription>(
  "subscriptions",
  SubscriptionsSchema
);
