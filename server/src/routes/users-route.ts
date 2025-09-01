import express from 'express';
import { supabase } from '../supabase';


const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const { data, error } = await supabase.from('users').select('id, username, email');
  if (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  } else {
    res.status(200).json(data);
  }
});

export default userRouter;
