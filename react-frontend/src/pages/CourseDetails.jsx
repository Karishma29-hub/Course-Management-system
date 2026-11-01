
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CourseDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const courseName = location.state?.courseName || "Course";

    const courseData = {
        "Python Programming": [
            {
                name: "Python Basics",
                icon: "🐍",
                video: "https://www.youtube.com/embed/kqtD5dpn9C8"
            },
            {
                name: "Variables and Data Types",
                icon: "📦",
                video: "https://www.youtube.com/embed/6i3e-j3w2S0"
            },
            {
                name: "Conditional Statements and Loops",
                icon: "🔁",
                video: "https://www.youtube.com/embed/7eh4d6sabA0"
            },
            {
                name: "Functions",
                icon: "⚙️",
                video: "https://www.youtube.com/embed/9Os0o3wzS_I"
            }
        ],

        "Web Development": [
            {
                name: "HTML and CSS",
                icon: "🌐",
                video: "https://www.youtube.com/embed/mU6anWqZJcc"
            },
            {
                name: "JavaScript",
                icon: "📜",
                video: "https://www.youtube.com/embed/PkZNo7MFNFg"
            },
            {
                name: "React",
                icon: "⚛️",
                video: "https://www.youtube.com/embed/SqcY0GlETPk"
            },
            {
                name: "Responsive Web Design",
                icon: "📱",
                video: "https://www.youtube.com/embed/srvUrASNj0s"
            }
        ],

        "Artificial Intelligence": [
            {
                name: "Introduction to Artificial Intelligence",
                icon: "🤖",
                video: "https://www.youtube.com/embed/ad79nYk2keg"
            },
            {
                name: "Machine Learning",
                icon: "📊",
                video: "https://www.youtube.com/embed/ukzFI9rgwfU"
            },
            {
                name: "Natural Language Processing",
                icon: "💬",
                video: "https://www.youtube.com/embed/fLvJ8VdHLA0"
            },
            {
                name: "Deep Learning",
                icon: "🧠",
                video: "https://www.youtube.com/embed/aircAruvnKk"
            }
        ]
    };

    const courses = courseData[courseName] || [];

    const [showCourses, setShowCourses] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [completedLessons, setCompletedLessons] = useState(() => {
        const saved = localStorage.getItem("completed_" + courseName);
        return saved ? JSON.parse(saved) : [];
    });

    function calculateProgress(completed) {
        if (courses.length === 0) return 0;

        return Math.round((completed.length / courses.length) * 100);
    }

    function handleEnroll() {
        localStorage.setItem(
            "startedCourse",
            JSON.stringify({
                courseName,
                progress: calculateProgress(completedLessons)
            })
        );

        setShowCourses(true);
    }

    function handleCourseClick(course) {
        setSelectedCourse(course);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function handleComplete() {
        if (
            !selectedCourse ||
            completedLessons.includes(selectedCourse.name)
        ) {
            return;
        }

        const updatedCompletedLessons = [
            ...completedLessons,
            selectedCourse.name
        ];

        setCompletedLessons(updatedCompletedLessons);

        localStorage.setItem(
            "completed_" + courseName,
            JSON.stringify(updatedCompletedLessons)
        );

        localStorage.setItem(
            "startedCourse",
            JSON.stringify({
                courseName,
                progress: calculateProgress(updatedCompletedLessons)
            })
        );
    }

    const overallProgress = calculateProgress(completedLessons);

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="course-header">
                    <span className="course-badge">
                        📚 Learning Course
                    </span>

                    <h1>{courseName}</h1>

                    <p>
                        Explore the course topics, watch lessons and track your learning progress.
                    </p>
                </div>

                {!showCourses && (
                    <button
                        className="enroll-button"
                        onClick={handleEnroll}
                    >
                        Enroll Now →
                    </button>
                )}

                {showCourses && (
                    <div className="course-list">
                        <h2>Course Topics</h2>

                        <p>Select a topic to start learning.</p>

                        {courses.map((course, index) => (
                            <div
                                className="course-item"
                                key={index}
                                onClick={() => handleCourseClick(course)}
                            >
                                <div className="course-thumbnail">
                                    {course.icon}
                                </div>

                                <div className="course-info">
                                    <h3>{course.name}</h3>

                                    <span>
                                        {completedLessons.includes(course.name)
                                            ? "Completed ✓"
                                            : "Not Completed"}
                                    </span>
                                </div>

                                <span className="arrow">→</span>
                            </div>
                        ))}
                    </div>
                )}

                {selectedCourse && (
                    <div className="learning-card">
                        <div className="selected-thumbnail">
                            {selectedCourse.icon}
                        </div>

                        <h2>{selectedCourse.name}</h2>

                        <p>Course Lesson</p>

                        <div className="video-container">
                            <iframe
                                key={selectedCourse.video}
                                src={selectedCourse.video}
                                title={selectedCourse.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>

                        <div className="progress-section">
                            <div className="progress-heading">
                                <span>
                                    {selectedCourse.name} Progress
                                </span>

                                <strong>
                                    {completedLessons.includes(selectedCourse.name)
                                        ? "100%"
                                        : "0%"}
                                </strong>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: completedLessons.includes(selectedCourse.name)
                                            ? "100%"
                                            : "0%"
                                    }}
                                />
                            </div>

                            <button
                                className="enroll-button"
                                onClick={handleComplete}
                                disabled={completedLessons.includes(selectedCourse.name)}
                            >
                                {completedLessons.includes(selectedCourse.name)
                                    ? "Completed ✓"
                                    : "Mark as Completed"}
                            </button>

                            <p className="progress-message">
                                {completedLessons.includes(selectedCourse.name)
                                    ? "🎉 Topic completed!"
                                    : "Complete the lesson and mark it as completed."}
                            </p>
                        </div>
                    </div>
                )}

                {showCourses && (
                    <div className="progress-section">
                        <h2>Overall Course Progress</h2>

                        <div className="progress-heading">
                            <span>{courseName}</span>
                            <strong>{overallProgress}%</strong>
                        </div>

                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: overallProgress + "%" }}
                            />
                        </div>

                        {overallProgress === 100 && (
                            <div className="course-card">
                                <h2>🎉 Course Completed!</h2>

                                <p>
                                    Congratulations! You have successfully completed the {courseName} course.
                                </p>

                                <button
                                    className="enroll-button"
                                    onClick={() =>
                                        navigate("/certificate", {
                                            state: { courseName }
                                        })
                                    }
                                >
                                    🏆 Get Certificate
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default CourseDetails;
