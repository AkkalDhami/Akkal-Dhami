import Education from '../models/Education.js';

//* GET EDUCATION
export const getEducation = async (req, res) => {
    try {
        const education = await Education.find().sort({ endDate: -1 });
        res.status(200).json({
            success: true,
            education
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

//* ADD EDUCATION
export const addEducation = async (req, res) => {
    try {
        console.log(req.body);
        const { institution, degree, startDate, endDate, description } = req.body;
        await Education.create({
            institution,
            degree,
            startDate,
            endDate,
            description
        });
        res.status(201).json({
            success: true,
            message: 'Education added successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

//* DELETE EDUCATION
export const deleteEducation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            success: false,
            message: "Education ID is required"
        });

        const deletedEducation = await Education.findByIdAndDelete(id);

        if (!deletedEducation) return res.status(404).json({
            success: false,
            message: "Education not found"
        });

        res.status(200).json({
            success: true,
            message: "Education deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

//* UPDATE EDUCATION
export const updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({
            success: false,
            message: "Education ID is required"
        });

        const updatedEducation = await Education.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedEducation) return res.status(404).json({
            success: false,
            message: "Education not found"
        });

        res.status(200).json({
            success: true,
            message: "Education updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}