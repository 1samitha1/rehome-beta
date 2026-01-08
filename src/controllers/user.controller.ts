import { Request, Response } from 'express';
import { addNewUser } from '../services/user.service';
import { sendResponse } from '../utils/sendResponse';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, fullName, userName } = req.body;

        // Validate input
        if (!email || !password || !fullName || !userName) {
            return sendResponse(res, 400, 'All fields are required', false);
        }

        const data = await addNewUser(req.body);

        return sendResponse(res, 200, {
            id: data._id,
            username: data.userName,
        });

    } catch (error: any) {

        if (error.message ==='USER_ALREADY_EXISTS') {
            return sendResponse(res, 409, 'User already exists', false);
        }

        return sendResponse(res, 500, 'Registration failed', false);
    }
};
