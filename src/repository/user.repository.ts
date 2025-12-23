import userModel from '../models/user.model';
import { Document } from 'mongoose';

export interface IUser {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    createdAt?: number;
}

export async function findByEmail(email: string): Promise<Document | null> {
    return await userModel.findOne({ email }).exec();
}

export async function findByUserName(userName: string): Promise<Document | null> {
    return await userModel.findOne({ userName }).exec();
}

export async function createUser(userData: IUser): Promise<Document> {
    const user = new userModel(userData);
    return await user.save();
}

export async function userLogin(loginData: IUser): Promise<Document> {
    return await userModel.findOne({ userName: loginData.userName }).exec();
}