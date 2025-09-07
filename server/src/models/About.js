import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
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
        trim: true
    },

    email: {
        type: String,
        trim: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    contact: {
        type: String,
        trim: true
    },

    location: {
        type: String,
        trim: true
    },

    socials: [{
        name: {
            type: String,
            trim: true
        },
        link: {
            type: String,
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
            trim: true
        },
        link: {
            type: String,
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
