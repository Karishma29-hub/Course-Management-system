
const LearningProgress = require("../models/LearningProgress");

// Get progress for the logged-in student
async function getMyProgress(req, res, next) {
    try {
        const progress = await LearningProgress.find({
            student: req.user.id
        })
            .populate("course")
            .sort({ updatedAt: -1 })
            .limit(100)
            .lean();

        return res.status(200).json({
            success: true,
            progress
        });

    } catch (error) {
        next(error);
    }
}

// Save or update progress for a course
async function updateMyProgress(req, res, next) {
    try {
        const { courseId, completedLessons, totalLessons } = req.body;

        if (
            !courseId ||
            !Number.isInteger(completedLessons) ||
            !Number.isInteger(totalLessons) ||
            completedLessons < 0 ||
            totalLessons < 1 ||
            completedLessons > totalLessons
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid learning progress details"
            });
        }

        const progressPercentage = Math.round(
            (completedLessons / totalLessons) * 100
        );

        const progress = await LearningProgress.findOneAndUpdate(
            {
                student: req.user.id,
                course: courseId
            },
            {
                student: req.user.id,
                course: courseId,
                completedLessons,
                totalLessons,
                progressPercentage
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            }
        ).populate("course");

        return res.status(200).json({
            success: true,
            message: "Learning progress saved",
            progress
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getMyProgress,
    updateMyProgress
};
