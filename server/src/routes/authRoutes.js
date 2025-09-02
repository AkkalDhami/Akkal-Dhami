import express from 'express';
import { logout, refreshToken, requestOtp, verifyOtp } from '../controllers/authController.js';
import { otpRequestLimiter } from '../utils/rateLimiter.js';

const router = express.Router();

router.post('/otp', requestOtp);           // Request OTP
router.post('/otp/verify', verifyOtp);     // Verify OTP
router.post('/refresh', refreshToken);     // Refresh JWT
router.post('/logout', logout);            // Logout

export default router;