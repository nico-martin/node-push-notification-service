"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var models_1 = require("./models");
var createPush_1 = require("./routes/createPush");
var getPublicKey_1 = require("./routes/getPublicKey");
var subscriptions_1 = require("./routes/subscriptions");
var PORT = process.env.PORT || 8080;
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.post("/push/", createPush_1.createPush);
app.get("/key/", getPublicKey_1.getPublicKey);
app.post("/subscription/", subscriptions_1.addOrUpdateSubscription);
models_1.connectDB().then(function () {
    app.listen(PORT, function () { return console.log("APP listening to " + PORT + "!"); });
});
