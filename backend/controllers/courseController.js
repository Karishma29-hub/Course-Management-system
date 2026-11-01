const Course = require("../models/Course");

// Get all courses
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

// Get course by ID
const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

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
            typeof title !== "string" || !title.trim() ||
            typeof description !== "string" || !description.trim() ||
            typeof instructor !== "string" || !instructor.trim() ||
            typeof duration !== "string" || !duration.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "All course fields are required and must be valid"
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

        if (
            (title !== undefined &&
                (typeof title !== "string" || !title.trim())) ||
            (description !== undefined &&
                (typeof description !== "string" || !description.trim())) ||
            (instructor !== undefined &&
                (typeof instructor !== "string" || !instructor.trim())) ||
            (duration !== undefined &&
                (typeof duration !== "string" || !duration.trim()))
        ) {
            return res.status(400).json({
                success: false,
                message: "Course fields must contain valid, non-empty values"
            });
        }

        const updates = {};

        if (title !== undefined) updates.title = title.trim();
        if (description !== undefined) updates.description = description.trim();
        if (instructor !== undefined) updates.instructor = instructor.trim();
        if (duration !== undefined) updates.duration = duration.trim();

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