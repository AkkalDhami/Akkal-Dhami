import {
    signAccessToken,
    signRefreshToken,
    getCookieOptions,
    generateOtp,
    saveOtp
} from '../utils/auth.js';
import { Otp } from '../models/Otp.js';
import { sendOtpEmail } from '../utils/email.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/User.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (!ADMIN_EMAIL) {
    console.warn('⚠️ ADMIN_EMAIL not configured in env');
}

export async function requestOtp(req, res) {
    try {
        if (!ADMIN_EMAIL) return res.status(500).json({
            success: false,
            message: 'Server auth not configured'
        });

        const { code, codeHash, expiresAt } = generateOtp();
        await saveOtp(ADMIN_EMAIL, codeHash, expiresAt);
        await sendOtpEmail({ to: ADMIN_EMAIL, code });

        return res.json({ success: true, message: 'OTP sent to admin email' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
}

export async function verifyOtp(req, res) {
    try {
        const { code } = req.body;
        if (!code || !/^[0-9]{6}$/.test(code)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid code'
            });
        }

        const codeHash = crypto.createHash('sha256').update(String(code)).digest('hex');
        const record = await Otp.findOne({ email: ADMIN_EMAIL }).sort({ createdAt: -1 });

        if (!record) return res.status(400).json({
            success: false,
            message: 'OTP not found'
        });
        if (record.consumed || record.expiresAt < new Date()) return res.status(400).json({ message: 'OTP expired' });
        if (record.codeHash !== codeHash) {
            record.attempts += 1;
            await record.save();

            if (record.attempts >= 5) {
                return res.status(429).json({
                    success: false,
                    message: 'Too many wrong attempts. OTP blocked.'
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Incorrect OTP'
            });
        }


        record.consumed = true;
        await record.save();

        let user = await User.findOne({ email: ADMIN_EMAIL });
        if (!user) {
            user = await User.create({ email: ADMIN_EMAIL, role: 'admin' });
        }

        const accessToken = signAccessToken({
            role: 'admin',
            email: ADMIN_EMAIL
        });
        const refreshToken = signRefreshToken({
            role: 'admin',
            email: ADMIN_EMAIL
        });

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, getCookieOptions());

        return res.json({ accessToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Failed to verify OTP'
        });
    }
}

export async function refreshToken(req, res) {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) return res.status(401).json({ message: 'No refresh token' });

        const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
        const payload = jwt.verify(token, secret);

        const user = await User.findOne({ email: payload.email });
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: 'Refresh token revoked or invalid' });
        }

        // Issue new tokens
        const accessToken = signAccessToken({ role: payload.role, email: payload.email });
        const newRefreshToken = signRefreshToken({ role: payload.role, email: payload.email });

        // Save new refresh token and invalidate old one
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, getCookieOptions());
        return res.json({ accessToken });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
}


export async function logout(req, res) {
    try {
        const token = req.cookies?.refreshToken;
        if (token) {
            const user = await User.findOne({ refreshToken: token });
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        res.clearCookie('refreshToken', getCookieOptions());
        return res.json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Logout failed' });
    }
}
