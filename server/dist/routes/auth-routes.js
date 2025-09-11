"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_controller_1 = require("../controllers/signup-controller");
const login_controller_1 = require("../controllers/login-controller");
const authRouter = express_1.default.Router();
authRouter.post("/login", login_controller_1.loginController);
authRouter.post("/signup", signup_controller_1.signupController);
exports.default = authRouter;
