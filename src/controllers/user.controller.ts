import { Request, Response } from 'express';
import { addNewUser, login } from '../services/user.service';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, fullName, userName } = req.body;

        // Validate input
        if (!email || !password || !fullName || !userName) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        await addNewUser(req.body);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        await login(req.body);

        res.status(200).json({ message: 'Login successful' });
       
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};