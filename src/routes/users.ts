import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/userController';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello from users!');
});

router.post('/reg', async (req: Request, res: Response) => {
  await registerUser(req, res);
});

router.post('/login', (req: Request, res: Response) => {
  res.send('Hello from users reg!');
});

export default router;
