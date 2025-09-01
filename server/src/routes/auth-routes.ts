import express from "express";
import { signupController } from "../controllers/signup-controller";
import { loginController } from "../controllers/login-controller";

const authRouter = express.Router();


authRouter.post("/login", loginController)
authRouter.post("/signup", signupController)

export default authRouter;