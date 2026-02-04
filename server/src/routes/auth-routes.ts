import express from "express";
import { signupController } from "../controllers/signup-controller";
import { loginController } from "../controllers/login-controller";
import multer from "multer";
import fs from "fs";

const authRouter = express.Router();

const upload = multer({storage: multer.memoryStorage(), limits: { fileSize: 30 * 1024 * 1024 }})


authRouter.post("/login", loginController)
authRouter.post("/signup", upload.single("photo"), signupController)

export default authRouter;