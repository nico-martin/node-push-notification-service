"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var promise_retry_1 = __importDefault(require("promise-retry"));
var Subscriptions_1 = __importDefault(require("./Subscriptions"));
var options = {
    useNewUrlParser: true,
    reconnectTries: 60,
    reconnectInterval: 1000,
    poolSize: 10,
    bufferMaxEntries: 0,
    useUnifiedTopology: true
};
var promiseRetryOptions = {
    retries: options.reconnectTries,
    factor: 2,
    minTimeout: options.reconnectInterval,
    maxTimeout: 5000
};
exports.connectDB = function () {
    return promise_retry_1.default(function (retry) {
        return mongoose_1.default.connect(String(process.env.DATABASE_URL), options).catch(retry);
    }, promiseRetryOptions);
};
exports.default = { Subscriptions: Subscriptions_1.default };
