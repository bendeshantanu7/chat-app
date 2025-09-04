import { supabase } from "../supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const JWT_SECRET = process.env.JWT_SECRET || '';

export const signupController = async (req: any, res: any) => {
  const { firstname, lastname, username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([{ first_name: firstname, last_name: lastname, username, email, password: hashedPassword }])
    .select()
    .single();
  if (userError) {
    console.error(userError);
    res.status(500).send("Error creating user profile");
  } else {
    const token = jwt.sign({id: userData.id}, JWT_SECRET, {expiresIn: '1d'})
    res.status(200).json({token});
  }
};
