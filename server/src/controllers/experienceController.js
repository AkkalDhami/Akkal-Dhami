import Experience from "../models/Experience.js";

//* GET EXPERIENCES
export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ endDate: -1 });
        res.status(200).json({
            success: true,
            experiences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

//* ADD EXPERIENCE
export const addExperience = async (req, res) => {
    try {
        const { company, position, startDate, endDate, description, technologies } = req.body;
        const newExperience = await Experience.create({
            company,
            position,
            startDate,
            endDate,
            description,
            technologies
        });
        res.status(201).json({
            success: true,
            message: 'Experience added successfully',
            newExperience
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

//* DELETE EXPERIENCE
export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            success: false,
            message: "Experience ID is required"
        });
        const deletedExperience = await Experience.findByIdAndDelete(id);
        if (!deletedExperience) return res.status(404).json({
            success: false,
            message: "Experience not found"
        });

        res.status(200).json({
            success: true,
            message: "Experience deleted successfully",
            deletedExperience
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

//* UPDATE EXPERIENCE
export const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            success: false,
            message: "Experience ID is required"
        });
        const updatedExperience = await Experience.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedExperience) return res.status(404).json({
            success: false,
            message: "Experience not found"
        });
        res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            updatedExperience
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}