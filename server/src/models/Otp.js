import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, index: true, lowercase: true, trim: true },
        codeHash: { type: String, required: true },
        expiresAt: { type: Date, required: true, index: true },
        consumed: { type: Boolean, default: false },
        attempts: { type: Number, default: 0 }
    },
    { timestamps: true }
);

otpSchema.index({ email: 1, createdAt: -1 });

const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);

export { Otp };


