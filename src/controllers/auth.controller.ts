import { Request, Response } from 'express';
import { login } from '../services/auth.service';
import { sendResponse } from '../utils/sendResponse';

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(res, 400, null, false);
    }

    const data = await login(username, password);

    return sendResponse(res, 200, {
      token: data.token,
      user: {
        id: data.user._id,
        username: data.user.userName,
      },
    });

  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      return sendResponse(res, 404, 'User does not exist', false);
    }

    if (error.message === 'INVALID_PASSWORD') {
      return sendResponse(res, 401, 'Invalid credentials', false);
    }

    return sendResponse(res, 500, 'Internal server error', false);
  }
};