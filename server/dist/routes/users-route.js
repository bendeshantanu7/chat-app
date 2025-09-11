"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supabase_1 = require("../supabase");
const userRouter = express_1.default.Router();
userRouter.get('/', async (req, res) => {
    const { data, error } = await supabase_1.supabase.from('users').select('id, first_name, last_name, username, email');
    if (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
    else {
        const users = data.map((user) => ({
            id: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            username: user.username,
            email: user.email
        }));
        res.status(200).json(users);
    }
});
exports.default = userRouter;
