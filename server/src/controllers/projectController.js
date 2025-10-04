
import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import { deleteCloudinaryImages } from "../utils/cloudinary.js";

//* GET ALL PROJECTS
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            success: true,
            projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

//* GET A PROJECT
export const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Project ID is required'
            });
        }

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        res.status(200).json({
            success: true,
            project
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

//* CREATE A PROJECT
export const createProject = async (req, res) => {
    try {
        const { title, description, liveUrl, githubUrl, technologies, features } = req.body;
       
        let thumbnail = null;
        if (req.files && req.files.thumbnail) {
            thumbnail = {
                public_id: req.files.thumbnail[0].filename,
                url: req.files.thumbnail[0].path,
            };
        }

        let images = [];
        if (req.files && req.files.images) {
            images = req.files.images.map((file) => ({
                public_id: file.filename,
                url: file.path,
            }));
        }

        const project = new Project({
            title,
            description,
            thumbnail,
            images,
            liveUrl,
            githubUrl,
            technologies: JSON.parse(technologies),
            features:features.split(',').map(feature => feature.trim()),
        });

        await project.save();
        res.status(201).json({
            success: true,
            message: "Project created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

//* UPDATE A PROJECT
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
       
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required",
            });
        }

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        console.log(req.files);

        // Handle thumbnail update
        if (req.files?.thumbnail) {
            if (project.thumbnail?.public_id) {
                await cloudinary.uploader.destroy(project.thumbnail.public_id);
            }

            const result = await cloudinary.uploader.upload(
                req.files.thumbnail.tempFilePath,
                { folder: "projects" }
            );

            req.body.thumbnail = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        }

        // Handle multiple images update
        if (req.files?.images) {
            const imagesArray = Array.isArray(req.files.images)
                ? req.files.images
                : [req.files.images];

            if (project.images?.length > 0) {
                for (const img of project.images) {
                    if (img.public_id) {
                        await cloudinary.uploader.destroy(img.public_id);
                    }
                }
            }

            // Upload new images
            const newImages = [];
            for (const img of imagesArray) {
                const result = await cloudinary.uploader.upload(img.tempFilePath, {
                    folder: "projects",
                });
                newImages.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
            req.body.images = newImages;
        }


        const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updatedProject,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

//* DELETE A PROJECT
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required",
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        // Delete thumbnail from Cloudinary
        if (project.thumbnail?.public_id) {
            await deleteCloudinaryImages(project.thumbnail.public_id);
        }

        // Delete gallery images from Cloudinary
        if (project.images && project.images.length > 0) {
            const imageIds = project.images.map((img) => img.public_id).filter(Boolean);
            await deleteCloudinaryImages(imageIds);
        }

        await Project.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};