import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        icon: {
            component: String,
            color: String
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
    },
    { timestamps: true }
);

const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);

export default Skill;