
const courses = require("../data/courses");

// Get all courses
const getAllCourses = (req, res) => {
  res.json({
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

  res.json({
    success: true,
    data: course
  });
};

// Create a new course with validation
const createCourse = (req, res) => {
  const { title, description, instructor, duration } = req.body;

  if (!title || !description || !instructor || !duration) {
    return res.status(400).json({
      success: false,
      message: "All course fields are required"
    });
  }

  const course = {
    id: Date.now(),
    title,
    description,
    instructor,
    duration
  };

  courses.push(course);

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: course
  });
};

// Update a course
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

  courses[index] = {
    ...courses[index],
    ...req.body
  };

  res.json({
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

  res.json({
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