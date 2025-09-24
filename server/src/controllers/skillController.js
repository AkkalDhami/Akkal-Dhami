import Skill from "../models/Skill.js";

//* GET ALL SKILLS
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

//* GET A SKILL
export const getSkill = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Skill ID is required",
      });
    }

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }
    res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

//* CREATE A SKILL
export const createSkill = async (req, res) => {
  console.log(req.body);
  try {
    const { name, description, icon, category } = req.body;
    const skill = await Skill.create({
      name,
      description,
      icon,
      category,
    });
    res.status(201).json({
      success: true,
      message: "Skill created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

//* UPDATE A SKILL
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Skill ID is required",
      });
    }

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }
    await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

//* DELETE A SKILL
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Skill ID is required",
      });
    }
    const skill = await Skill.findOne({ _id: id });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }
    await Skill.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

//? SKILLS STATS

export const getSkillsDistribution = async (req, res) => {
  try {
    console.log('object');
    const skillsDistribution = await Skill.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const totalSkills = await Skill.countDocuments();


    // Basic data for charts
    const formattedData = skillsDistribution.map((category) => ({
      name: category._id,
      value: category.count,
      count: category.count,
      percentage:
        totalSkills > 0 ? Math.round((category.count / totalSkills) * 100) : 0,
    }));

    res.status(200).json({
      success: true,
      data: {
        distribution: formattedData,
        totalSkills,
        categoriesCount: skillsDistribution.length,
      },
    });
  } catch (error) {
    console.error("Error fetching skills distribution:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching skills distribution",
      error: error.message,
    });
  }
};
