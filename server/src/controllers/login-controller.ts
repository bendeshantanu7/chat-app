import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../supabase";

const saltRounds = 10;
const JWT_SECRET = "Test123";

export const loginController = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();

  bcrypt.compare(password, data.password, (err, result) => {
    if (err) {
      console.error("Error comparing passwords:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!result) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Passwords match, proceed with login
    const token = jwt.sign({ id: data.id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: "Login successful", token });
  });
};
