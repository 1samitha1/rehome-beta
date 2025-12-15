import mongoose from 'mongoose';

export async function connectDatabase(mongoUrl: string): Promise<void> {

    if (!mongoUrl) {
        throw new Error('Connection string is not set');
    }

    try {
        await mongoose.connect(mongoUrl);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}