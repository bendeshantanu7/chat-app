"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_route_1 = __importDefault(require("./routes/users-route"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" }
});
dotenv_1.default.config({ path: './.env' });
const SUPABASE_URL = 'https://fphysyalrgzrvtcwtsdx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaHlzeWFscmd6cnZ0Y3d0c2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTE2MzMsImV4cCI6MjA3MTkyNzYzM30.gEelIvqGHntGmXnOn2ZPhKe_HHtXSzSvkNt_MAyi6u8';
exports.supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_ANON_KEY);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/users', users_route_1.default);
app.use('/auth', auth_routes_1.default);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("register", (userId) => {
        console.log("User registered:", userId);
        onlineUsers.set(userId, socket.id);
    });
});
