import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello from users!');
});

router.post('/reg', (req: Request, res: Response) => {
  res.send('Hello from users reg!');
});

router.post('/login', (req: Request, res: Response) => {
  res.send('Hello from users reg!');
});

export default router;
