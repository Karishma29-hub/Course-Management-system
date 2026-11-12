
const Course = require("../models/Course");

// Get all courses with pagination
const getAllCourses = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(
            100,
            Math.max(1, parseInt(req.query.limit) || 10)
        );

        const skip = (page - 1) * limit;

        const totalCourses = await Course.countDocuments();

        const courses = await Course.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: courses,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCourses / limit),
                totalCourses: totalCourses,
                limit: limit
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get course by ID
const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id).lean();

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// Create a new course
const createCourse = async (req, res, next) => {
    try {
        const { title, description, instructor, duration } = req.body || {};

        if (
            typeof title !== "string" || title.trim().length < 2 || title.trim().length > 150 ||
            typeof description !== "string" || description.trim().length < 5 || description.trim().length > 3000 ||
            typeof instructor !== "string" || instructor.trim().length < 2 || instructor.trim().length > 100 ||
            typeof duration !== "string" || !duration.trim() || duration.trim().length > 50
        ) {
            return res.status(400).json({
                success: false,
                message: "All course fields are required and must contain valid values"
            });
        }

        const course = await Course.create({
            title: title.trim(),
            description: description.trim(),
            instructor: instructor.trim(),
            duration: duration.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// Update a course
const updateCourse = async (req, res, next) => {
    try {
        const { title, description, instructor, duration } = req.body || {};

        const updates = {};

        if (title !== undefined) {
            if (typeof title !== "string" || title.trim().length < 2 || title.trim().length > 150) {
                return res.status(400).json({
                    success: false,
                    message: "Title must be between 2 and 150 characters"
                });
            }
            updates.title = title.trim();
        }

        if (description !== undefined) {
            if (typeof description !== "string" || description.trim().length < 5 || description.trim().length > 3000) {
                return res.status(400).json({
                    success: false,
                    message: "Description must be between 5 and 3000 characters"
                });
            }
            updates.description = description.trim();
        }

        if (instructor !== undefined) {
            if (typeof instructor !== "string" || instructor.trim().length < 2 || instructor.trim().length > 100) {
                return res.status(400).json({
                    success: false,
                    message: "Instructor must be between 2 and 100 characters"
                });
            }
            updates.instructor = instructor.trim();
        }

        if (duration !== undefined) {
            if (typeof duration !== "string" || !duration.trim() || duration.trim().length > 50) {
                return res.status(400).json({
                    success: false,
                    message: "Duration must contain 1 to 50 characters"
                });
            }
            updates.duration = duration.trim();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one valid course field to update"
            });
        }

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// Delete a course
const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
