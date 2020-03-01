"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var PORT = process.env.PORT || 8080;
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send({
        hello: "world"
    });
});
app.listen(PORT, function () { return console.log("APP listening to " + PORT + "!"); });
