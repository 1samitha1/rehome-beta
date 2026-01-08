import { access } from 'fs';
import mongoose, { Schema, Document } from 'mongoose';

export interface IGarageSale extends Document {
    state: string;
    city: string;
    suburb: string;
    startDate: Number;
    endDate: Number;
    active: boolean;
    createdAt: number;
}

export const GarageSaleModel: Schema = new Schema({
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true, unique: true },
    suburb: { type: String, required: true, trim: true },
    startDate: { type: Number, default: () => new Date().getTime() },
    endDate: { type: Number, required: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Number, default: () => new Date().getTime() },
});

export default mongoose.model<IGarageSale>('GarageSale', GarageSaleModel);