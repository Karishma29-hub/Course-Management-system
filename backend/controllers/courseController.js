
const courses = require("../data/courses");

// Get all courses
const getAllCourses = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Courses fetched successfully",
    data: courses
  });
};

// Get course by ID
const getCourseById = (req, res) => {
  const course = courses.find(
    c => c.id === Number(req.params.id)
  );

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
};

// Create a new course with validation
const createCourse = (req, res) => {
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

  const course = {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    instructor: instructor.trim(),
    duration: duration.trim()
  };

  courses.push(course);

  return res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: course
  });
};

// Update a course with validation
const updateCourse = (req, res) => {
  const index = courses.findIndex(
    c => c.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Course not found"
    });
  }

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

  courses[index] = {
    ...courses[index],
    ...(title !== undefined && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(instructor !== undefined && { instructor: instructor.trim() }),
    ...(duration !== undefined && { duration: duration.trim() })
  };

  return res.status(200).json({
    success: true,
    message: "Course updated successfully",
    data: courses[index]
  });
};

// Delete a course
const deleteCourse = (req, res) => {
  const index = courses.findIndex(
    c => c.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Course not found"
    });
  }

  courses.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "Course deleted successfully"
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
