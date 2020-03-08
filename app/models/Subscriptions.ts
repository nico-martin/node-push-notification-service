import mongoose, { Schema } from "mongoose";
import { ISubscriptionBD } from "../utils/types";

const SubscriptionsSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
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

export default mongoose.model<ISubscriptionBD>(
  "subscriptions",
  SubscriptionsSchema
);
