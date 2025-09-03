import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true,
            trim: true
        },
        endDate: {
            type: Date,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        technologies: [
            {
                type: String,
                trim: true
            }
        ]
    },
    { timestamps: true }
);

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);

export default Experience;