
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function AdminDashboard() {
    const [selectedSection, setSelectedSection] = useState("");
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const emptyStudentForm = {
        name: "",
        email: "",
        password: "",
        department: ""
    };

    const emptyCourseForm = {
        title: "",
        description: "",
        instructor: "",
        duration: ""
    };

    const [studentForm, setStudentForm] = useState(emptyStudentForm);
    const [editingStudentId, setEditingStudentId] = useState(null);

    const [courseForm, setCourseForm] = useState(emptyCourseForm);
    const [editingCourseId, setEditingCourseId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError("");

        try {
            const [studentResponse, courseResponse] =
                await Promise.all([
                    api.get("/students"),
                    api.get("/courses")
                ]);

            setStudents(studentResponse.data.students || []);
            setCourses(courseResponse.data.data || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Student form functions
    const handleStudentInputChange = (event) => {
        const { name, value } = event.target;

        setStudentForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const resetStudentForm = () => {
        setStudentForm(emptyStudentForm);
        setEditingStudentId(null);
    };

    const handleStudentSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        try {
            if (editingStudentId) {
                const { name, email, department } = studentForm;

                await api.put(`/students/${editingStudentId}`, {
                    name,
                    email,
                    department
                });

                setMessage("Student updated successfully.");
            } else {
                await api.post("/students", studentForm);
                setMessage("Student added successfully.");
            }

            resetStudentForm();
            await fetchData();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to save student."
            );
        }
    };

    const handleStudentEdit = (student) => {
        setStudentForm({
            name: student.name || "",
            email: student.email || "",
            password: "",
            department: student.department || ""
        });

        setEditingStudentId(student._id);
        setMessage("");
        setError("");
    };

    const handleStudentDelete = async (studentId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmed) return;

        setError("");
        setMessage("");

        try {
            await api.delete(`/students/${studentId}`);
            setMessage("Student deleted successfully.");

            if (editingStudentId === studentId) {
                resetStudentForm();
            }

            await fetchData();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to delete student."
            );
        }
    };

    // Course form functions
    const handleCourseInputChange = (event) => {
        const { name, value } = event.target;

        setCourseForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const resetCourseForm = () => {
        setCourseForm(emptyCourseForm);
        setEditingCourseId(null);
    };

    const handleCourseSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        try {
            if (editingCourseId) {
                await api.put(
                    `/courses/${editingCourseId}`,
                    courseForm
                );
                setMessage("Course updated successfully.");
            } else {
                await api.post("/courses", courseForm);
                setMessage("Course added successfully.");
            }

            resetCourseForm();
            await fetchData();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to save course."
            );
        }
    };

    const handleCourseEdit = (course) => {
        setCourseForm({
            title: course.title || "",
            description: course.description || "",
            instructor: course.instructor || "",
            duration: course.duration || ""
        });

        setEditingCourseId(course._id);
        setMessage("");
        setError("");
    };

    const handleCourseDelete = async (courseId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) return;

        setError("");
        setMessage("");

        try {
            await api.delete(`/courses/${courseId}`);
            setMessage("Course deleted successfully.");

            if (editingCourseId === courseId) {
                resetCourseForm();
            }

            await fetchData();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to delete course."
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="container admin-dashboard">
                <div className="admin-icon">🛡️</div>

                <h1>Admin Dashboard</h1>

                <p className="dashboard-subtitle">
                    Manage students, courses and system information
                </p>

                {loading && <p>Loading dashboard data...</p>}
                {error && <p className="error-message">{error}</p>}
                {message && <p>{message}</p>}

                <div className="admin-cards">
                    <div className="admin-card">
                        <div className="admin-card-icon">👨‍🎓</div>
                        <h3>Manage Students</h3>
                        <p>View and manage student information.</p>
                        <button
                            onClick={() => setSelectedSection("students")}
                        >
                            View Students
                        </button>
                    </div>

                    <div className="admin-card">
                        <div className="admin-card-icon">📚</div>
                        <h3>Manage Courses</h3>
                        <p>Add, edit and delete courses.</p>
                        <button
                            onClick={() => setSelectedSection("courses")}
                        >
                            Manage Courses
                        </button>
                    </div>

                    <div className="admin-card">
                        <div className="admin-card-icon">📊</div>
                        <h3>System Overview</h3>
                        <p>View overall system information.</p>
                        <button
                            onClick={() => setSelectedSection("overview")}
                        >
                            View Overview
                        </button>
                    </div>
                </div>

                {/* Student Management */}
                {selectedSection === "students" && (
                    <div className="course-card">
                        <h2>👨‍🎓 Manage Students</h2>

                        <form onSubmit={handleStudentSubmit}>
                            <h3>
                                {editingStudentId
                                    ? "Edit Student"
                                    : "Add New Student"}
                            </h3>

                            <label>Student Name</label>
                            <input
                                type="text"
                                name="name"
                                value={studentForm.name}
                                onChange={handleStudentInputChange}
                                required
                            />

                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={studentForm.email}
                                onChange={handleStudentInputChange}
                                required
                            />

                            {!editingStudentId && (
                                <>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={studentForm.password}
                                        onChange={handleStudentInputChange}
                                        required
                                    />
                                </>
                            )}

                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={studentForm.department}
                                onChange={handleStudentInputChange}
                                required
                            />

                            <button type="submit">
                                {editingStudentId
                                    ? "Update Student"
                                    : "Add Student"}
                            </button>

                            {editingStudentId && (
                                <button
                                    type="button"
                                    onClick={resetStudentForm}
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>

                        <hr />

                        <h3>Registered Students</h3>

                        {students.length === 0 ? (
                            <p>No students found.</p>
                        ) : (
                            students.map((student) => (
                                <div key={student._id}>
                                    <hr />
                                    <p>
                                        <b>Name:</b> {student.name}
                                    </p>
                                    <p>
                                        <b>Email:</b> {student.email}
                                    </p>
                                    <p>
                                        <b>Department:</b>{" "}
                                        {student.department}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStudentEdit(student)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStudentDelete(student._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Course Management */}
                {selectedSection === "courses" && (
                    <div className="course-card">
                        <h2>📚 Manage Courses</h2>

                        <form onSubmit={handleCourseSubmit}>
                            <h3>
                                {editingCourseId
                                    ? "Edit Course"
                                    : "Add New Course"}
                            </h3>

                            <label>Course Title</label>
                            <input
                                type="text"
                                name="title"
                                value={courseForm.title}
                                onChange={handleCourseInputChange}
                                required
                            />

                            <label>Description</label>
                            <textarea
                                name="description"
                                value={courseForm.description}
                                onChange={handleCourseInputChange}
                                required
                            />

                            <label>Instructor</label>
                            <input
                                type="text"
                                name="instructor"
                                value={courseForm.instructor}
                                onChange={handleCourseInputChange}
                                required
                            />

                            <label>Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={courseForm.duration}
                                onChange={handleCourseInputChange}
                                placeholder="Example: 8 weeks"
                                required
                            />

                            <button type="submit">
                                {editingCourseId
                                    ? "Update Course"
                                    : "Add Course"}
                            </button>

                            {editingCourseId && (
                                <button
                                    type="button"
                                    onClick={resetCourseForm}
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>

                        <hr />

                        <h3>Available Courses</h3>

                        {courses.length === 0 ? (
                            <p>No courses found.</p>
                        ) : (
                            courses.map((course) => (
                                <div key={course._id}>
                                    <hr />
                                    <h3>{course.title}</h3>
                                    <p>{course.description}</p>
                                    <p>
                                        <b>Instructor:</b>{" "}
                                        {course.instructor}
                                    </p>
                                    <p>
                                        <b>Duration:</b>{" "}
                                        {course.duration}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCourseEdit(course)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCourseDelete(course._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* System Overview */}
                {selectedSection === "overview" && (
                    <div className="course-card">
                        <h2>📊 System Overview</h2>
                        <p>
                            <b>Total Students:</b> {students.length}
                        </p>
                        <p>
                            <b>Total Courses:</b> {courses.length}
                        </p>
                        <p>
                            <b>System Status:</b> Active
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default AdminDashboard;
