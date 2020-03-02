"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var SubscriptionsSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.default.model("subscriptions", SubscriptionsSchema);
