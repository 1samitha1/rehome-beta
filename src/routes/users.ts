import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/user.controller';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello from users!');
});

router.post('/reg', async (req: Request, res: Response) => {
  await registerUser(req, res);
});



export default router;
