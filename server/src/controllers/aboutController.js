import About from "../models/About.js";

//*  CREATE
export const createAbout = async (req, res) => {
    try {
        const about = new About(req.body);
        const savedAbout = await about.save();
        res.status(201).json({ success: true, data: savedAbout });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating About info", error });
    }
};

//*  GET ALL
export const getAllAbouts = async (req, res) => {
    try {
        const abouts = await About.find();
        res.status(200).json({ success: true, data: abouts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching About info", error });
    }
};

//*  GET SINGLE
export const getAboutById = async (req, res) => {
    try {
        const { id } = req.params;
        const about = await About.findById(id);
        if (!about) return res.status(404).json({ success: false, message: "About not found" });
        res.status(200).json({ success: true, data: about });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching About info", error });
    }
};

//*  UPDATE
export const updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAbout = await About.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedAbout) return res.status(404).json({ success: false, message: "About not found" });
        res.status(200).json({ success: true, data: updatedAbout });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating About info", error });
    }
};

//*  DELETE
export const deleteAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAbout = await About.findByIdAndDelete(id);
        if (!deletedAbout) return res.status(404).json({ success: false, message: "About not found" });
        res.status(200).json({ success: true, message: "About deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting About info", error });
    }
};


//*  ADD SOCIAL / CTA BUTTON
export const addSocialOrCta = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, data } = req.body; // type: 'socials' or 'ctaButtons'

        const about = await About.findById(id);
        if (!about) return res.status(404).json({ success: false, message: "About not found" });

        if (type === "socials") {
            about.socials.push(data);
        } else if (type === "ctaButtons") {
            about.ctaButtons.push(data);
        } else {
            return res.status(400).json({ success: false, message: "Invalid type. Must be 'socials' or 'ctaButtons'." });
        }

        const savedAbout = await about.save();
        res.status(200).json({ success: true, data: savedAbout });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding social/cta button", error });
    }
};

//*  REMOVE SOCIAL / CTA BUTTON
export const removeSocialOrCta = async (req, res) => {
    try {
        const { id, type, itemId } = req.params; // type: socials or ctaButtons

        const about = await About.findById(id);
        if (!about) return res.status(404).json({ success: false, message: "About not found" });

        if (type === "socials") {
            about.socials = about.socials.filter(item => item._id.toString() !== itemId);
        } else if (type === "ctaButtons") {
            about.ctaButtons = about.ctaButtons.filter(item => item._id.toString() !== itemId);
        } else {
            return res.status(400).json({ success: false, message: "Invalid type. Must be 'socials' or 'ctaButtons'." });
        }

        const savedAbout = await about.save();
        res.status(200).json({ success: true, data: savedAbout });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing social/cta button", error });
    }
};
