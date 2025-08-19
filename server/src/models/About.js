import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    shortIntro: {
        type: String,
        trim: true,
        default: 'I build modern, responsive web applications using MongoDB, Express, React, and Node.js. Passionate about creating seamless user experiences with clean, efficient code.'
    },

    description: {
        type: String,
        trim: true,
        default: 'I build modern, responsive web applications using MongoDB, Express, React, and Node.js. Passionate about creating seamless user experiences with clean, efficient code.'
    },

    role: {
        type: String,
        required: true, trim: true
    },

    email: {
        type: String,
        required: true, trim: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    contact: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    socials: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        link: {
            type: String,
            required: true,
            trim: true
        },
        icon: {
            name: String,
            component: String,
            color: String
        },
    }],

    ctaButtons: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        link: {
            type: String,
            required: true,
            trim: true
        },
        icon: {
            name: String,
            component: String,
            color: String
        },
    }],

}, { timestamps: true });

export default mongoose.model("About", aboutSchema);
