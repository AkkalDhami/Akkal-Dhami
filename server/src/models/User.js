// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    password: { type: String },
    refreshToken: { type: String }, 
});

export const User = mongoose.model('User', userSchema);
