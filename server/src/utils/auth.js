import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Otp } from '../models/Otp.js';

export function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
    };
}

export function signAccessToken(payload) {
    const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_ACCESS_EXPIRES || '15m';
    return jwt.sign(payload, secret, { expiresIn });
}

export function signRefreshToken(payload) {
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_REFRESH_EXPIRES || '7d';
    return jwt.sign(payload, secret, { expiresIn });
}

export function generateOtp() {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = crypto.createHash('sha256').update(code).digest('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    return { code, codeHash, expiresAt };
}

export async function saveOtp(email, codeHash, expiresAt) {
    return Otp.create({ email, codeHash, expiresAt, attempts: 0, consumed: false });
}
