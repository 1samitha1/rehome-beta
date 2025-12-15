import { Request, Response } from 'express';
import { addNewUser } from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, fullName, userName } = req.body;

        // Validate input
        if (!email || !password || !fullName || !userName) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // TODO: Hash password, save to database, etc.

        await addNewUser(req.body);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};