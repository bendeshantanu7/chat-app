import { supabase } from "../supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadProfilePicture } from "../services/s3-service";

const saltRounds = 10;

const JWT_SECRET = process.env.JWT_SECRET || '';

export const signupController = async (req: any, res: any) => {
  const { firstname, lastname, username, email, password } = req.body;
  
  let photoUrl = null;
  if (req.file) {
    try {
      photoUrl = await uploadProfilePicture(req.file, username);
      console.log('Profile photo uploaded:', photoUrl);
    } catch (uploadError) {
      console.error('Failed to upload profile photo:', uploadError);
      // We'll continue without the photo rather than failing signup
    }
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([{ 
      first_name: firstname, 
      last_name: lastname, 
      username, 
      email, 
      password: hashedPassword,
      photo_url: photoUrl
    }])
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
