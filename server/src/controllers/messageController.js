import Message from "../models/Message.js";
import fs from 'fs';
import path from 'path';
import mjml2html from 'mjml';
import { sendMessage } from "../utils/email.js";

//? GET MESSAGES
export const getMessages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await Message.countDocuments();
        const messages = await Message.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            total,
            page,
            pages: Math.ceil(total / limit),
            messages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

//? GET SINGLE MESSAGE
export const getMessage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            success: false,
            message: "Message ID is required"
        });

        const message = await Message.findById(id);

        if (!message) return res.status(404).json({
            success: false,
            message: "Message not found"
        });

        res.status(200).json({
            success: true,
            message
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

//? POST MESSAGE
export const addMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required"
            });
        }

        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        const templatePath = path.resolve(process.cwd(), 'src', 'templates', 'contact.mjml');
        const mjml = fs.readFileSync(templatePath, 'utf8')
            .replaceAll('{{NAME}}', String(name))
            .replaceAll('{{EMAIL}}', String(email))
            .replaceAll('{{MESSAGE}}', String(message))
            .replaceAll('{{SENT_AT}}', new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }))
            .replaceAll('{{ADMIN_PANEL_URL}}', process.env.ADMIN_PANEL_URL || '#')
            .replaceAll('{{CURRENT_DATE}}', new Date().getFullYear().toString());
        const { html, errors } = mjml2html(mjml, { validationLevel: 'soft' });
        if (!html) {
            throw new Error('Failed to render contact email');
        }
        console.log("errors:", errors);
        await sendMessage({
            to: process.env.CONTACT_EMAIL,
            from: email,
            html,
            subject: `New message from ${name} via Portfolio Contact Form`
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

//? DELETE MESSAGE
export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            success: false,
            message: "Message ID is required"
        });

        const message = await Message.findByIdAndDelete(id);

        if (!message) return res.status(404).json({
            success: false,
            message: "Message not found"
        });

        res.status(200).json({
            success: true,
            message: "Message deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

//? UPDATE MESSAGE
export const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message, read } = req.body;

        if (!id) return res.status(400).json({
            success: false,
            message: "Message ID is required"
        });

        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { name, email, message, read },
            { new: true, runValidators: true }
        );

        if (!updatedMessage) return res.status(404).json({
            success: false,
            message: "Message not found"
        });

        res.status(200).json({
            success: true,
            message: "Message Updated Successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const markMessageAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const { read } = req.body;
        if (!id) return res.status(400).json({
            success: false,
            message: "Message ID is required"
        });

        const message = await Message.findByIdAndUpdate(
            id,
            { read },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        res.status(200).json({ success: true, message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update message' });
    }
};