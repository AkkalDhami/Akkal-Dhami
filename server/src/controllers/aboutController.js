import About from "../models/About.js";

//*  CREATE
export const createAbout = async (req, res) => {
    try {
        const about = new About(req.body);
        const savedAbout = await about.save();
        res.status(201).json({ success: true, data: savedAbout });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error creating About info"
        });
    }
};

//*  GET ALL
export const getAbout = async (req, res) => {
    try {
        const abouts = await About.find();
        res.status(200).json({ success: true, data: abouts });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error fetching About info",
        });
    }
};


//*  UPDATE
export const updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAbout = await About.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedAbout) return res.status(404).json({
            success: false,
            message: "About not found"
        });
        res.status(200).json({
            success: true,
            data: updatedAbout
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error updating About info",
        });
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
        res.status(500).json({
            success: false,
            message: "Error removing social/cta button", error
        });
    }
};


//* ADD MY CONTACT DETAILS
export const addMyContactDetails = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, contact, location, isAvailable, role } = req.body;
        const myContact = new About({ name, email, contact, location, isAvailable, role });
        await myContact.save();
        res.status(201).json({
            success: true,
            message: "Contact Info Added Sucessfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error while adding contact info"
        });
    }
}

//* Update MY CONTACT DETAILS
export const updateMyContactDetails = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            success: false,
            message: "Contact ID is required"
        });

        const { name, email, contact, location, isAvailable, role } = req.body;
        await About.findByIdAndUpdate(id, { name, email, contact, location, isAvailable, role }, { new: true, runValidators: true });
        res.status(201).json({
            success: true,
            message: "Contact Info Updated Sucessfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error while updating contact info"
        });
    }
}