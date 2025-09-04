import express from 'express';
import { supabase } from '../supabase';


const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const { data, error } = await supabase.from('users').select('id, first_name, last_name, username, email');
  if (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  } else {
    const users = data.map((user: any) => ({
      id: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      username: user.username,
      email: user.email
    }));
    res.status(200).json(users);
  }
});

export default userRouter;
