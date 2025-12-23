import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/user.controller';
const router = Router();

router.post('/login', (req: Request, res: Response) => {
  res.send('Hello from users reg!');
});
