import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    createdAt: number;
}

export const UserModel: Schema = new Schema({
    fullName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Number, default: () => new Date().getTime() },
});

export default mongoose.model<IUser>('Users', UserModel);