"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const users_route_1 = __importDefault(require("./routes/users-route"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const mongo_1 = require("./mongo");
const conversation_route_1 = require("./routes/conversation-route");
const socket_1 = require("./socket");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(server, {
    cors: { origin: "*" }
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, mongo_1.run)();
app.use('/users', users_route_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/conversations', conversation_route_1.conversationRouter);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.io.on("connection", socket_1.socketController);
