import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        public_id: String,
        url: String
    },
    images: [
        {
            public_id: {
                type: String,
                trim: true
            },
            url: {
                type: String,
                trim: true
            }
        }
    ],
    liveUrl: {
        type: String,
        trim: true
    },
    githubUrl: {
        type: String,
        trim: true
    },
    technologies: [
        {
            name: { type: String, required: true, trim: true },
            icon: {
                component: { type: String, trim: true },
                color: { type: String, trim: true }
            }
        }
    ],
    features: [
        { type: String, required: true, trim: true }
    ]
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
