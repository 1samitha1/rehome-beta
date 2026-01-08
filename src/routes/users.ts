import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/user.controller';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello from users!');
});

router.post('/reg', registerUser);

export default router;
