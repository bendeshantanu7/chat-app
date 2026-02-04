import express from 'express';
import { supabase } from '../supabase';
import { getPresignedUrl } from '../services/s3-service';


const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const { data, error } = await supabase.from('users').select('id, first_name, last_name, username, email, photo_url');
  
  if (error) {
    console.error(error);
    return res.status(500).send('Error fetching users');
  }

  const users = await Promise.all((data || []).map(async (user: any) => {
    let photo_url = user.photo_url || null;
    if (photo_url) {
      try {
        const url = new URL(photo_url);
        const key = decodeURIComponent(url.pathname.slice(1));
        photo_url = await getPresignedUrl(key);
      } catch (e) {
        console.error('Error generating presigned URL for user', user.id, e);
      }
    }
    console.log('user', user)
    return {
      id: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      username: user.username,
      email: user.email,
      photo_url
    };
  }));

  res.status(200).json(users);
});

export default userRouter;
