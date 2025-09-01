"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const authRouter = express_1.default.Router();
authRouter.post("/login", (req, res) => { });
authRouter.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const { data: userData, error: userError } = await __1.supabase.from('users').insert([
        { username, email, password }
    ]);
    if (userError) {
        console.error(userError);
        res.status(500).send("Error creating user profile");
    }
    else {
        res.status(200).json(userData);
    }
});
exports.default = authRouter;
