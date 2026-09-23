import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {

    const [selectedSection, setSelectedSection] =
        useState("");

    return (
        <>
            <Navbar />

            <div className="container admin-dashboard">

                <div className="admin-icon">
                    🛡️
                </div>

                <h1>Admin Dashboard</h1>

                <p className="dashboard-subtitle">
                    Manage students, courses and system information
                </p>

                <div className="admin-cards">

                    {/* MANAGE STUDENTS */}

                    <div className="admin-card">

                        <div className="admin-card-icon">
                            👨‍🎓
                        </div>

                        <h3>Manage Students</h3>

                        <p>
                            View and manage student information.
                        </p>

                        <button
                            onClick={() =>
                                setSelectedSection("students")
                            }
                        >
                            View Students
                        </button>

                    </div>


                    {/* MANAGE COURSES */}

                    <div className="admin-card">

                        <div className="admin-card-icon">
                            📚
                        </div>

                        <h3>Manage Courses</h3>

                        <p>
                            Add and manage available courses.
                        </p>

                        <button
                            onClick={() =>
                                setSelectedSection("courses")
                            }
                        >
                            Manage Courses
                        </button>

                    </div>


                    {/* SYSTEM OVERVIEW */}

                    <div className="admin-card">

                        <div className="admin-card-icon">
                            📊
                        </div>

                        <h3>System Overview</h3>

                        <p>
                            View overall system information.
                        </p>

                        <button
                            onClick={() =>
                                setSelectedSection("overview")
                            }
                        >
                            View Overview
                        </button>

                    </div>

                </div>


                {/* STUDENT INFORMATION */}

                {selectedSection === "students" && (

                    <div className="course-card">

                        <h2>👨‍🎓 Student Information</h2>

                        <p>
                            <b>Name:</b> Karishma
                        </p>

                        <p>
                            <b>Email:</b> student@gmail.com
                        </p>

                        <p>
                            <b>Course:</b> Computer Science with AI
                        </p>

                        <p>
                            <b>Status:</b> Active
                        </p>

                    </div>

                )}


                {/* COURSE INFORMATION */}

                {selectedSection === "courses" && (

                    <div className="course-card">

                        <h2>📚 Available Courses</h2>

                        <p>
                            💻 Computer Science
                        </p>

                        <p>
                            🤖 Artificial Intelligence
                        </p>

                        <p>
                            🌐 Web Development
                        </p>

                    </div>

                )}


                {/* SYSTEM OVERVIEW */}

                {selectedSection === "overview" && (

                    <div className="course-card">

                        <h2>📊 System Overview</h2>

                        <p>
                            <b>Total Students:</b> 1
                        </p>

                        <p>
                            <b>Total Courses:</b> 3
                        </p>

                        <p>
                            <b>Active Students:</b> 1
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
