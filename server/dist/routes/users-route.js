"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const userRouter = express_1.default.Router();
userRouter.get('/', async (req, res) => {
    const { data, error } = await index_1.supabase.from('users').select('id, username, email');
    if (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
    else {
        res.status(200).json(data);
    }
});
exports.default = userRouter;
