
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

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
        ],

        "Data Science": [
            {
                name: "Introduction to Data Science",
                icon: "📊",
                video: "https://www.youtube.com/embed/ua-CiDNNj30"
            },
            {
                name: "Python for Data Analysis",
                icon: "🐍",
                video: "https://www.youtube.com/embed/r-uOLxNrNk8"
            },
            {
                name: "Data Visualization",
                icon: "📈",
                video: "https://www.youtube.com/embed/GPVsHOlRBBI"
            },
            {
                name: "Statistics and Data Analysis",
                icon: "📉",
                video: "https://www.youtube.com/embed/xxpc-HPKN28"
            }
        ],

        "Machine Learning": [
            {
                name: "Introduction to Machine Learning",
                icon: "🤖",
                video: "https://www.youtube.com/embed/ukzFI9rgwfU"
            },
            {
                name: "Supervised Learning",
                icon: "🎯",
                video: "https://www.youtube.com/embed/4qVRBYAdLAo"
            },
            {
                name: "Unsupervised Learning",
                icon: "🔍",
                video: "https://www.youtube.com/embed/azXCzI57Yfc"
            },
            {
                name: "Model Training and Prediction",
                icon: "🧠",
                video: "https://www.youtube.com/embed/GwIo3gDZCVQ"
            }
        ],

        "Cybersecurity": [
            {
                name: "Introduction to Cybersecurity",
                icon: "🔐",
                video: "https://www.youtube.com/embed/inWWhr5tnEA"
            },
            {
                name: "Network Security Basics",
                icon: "🌐",
                video: "https://www.youtube.com/embed/qiQR5rTSshw"
            },
            {
                name: "Cyber Threats and Attacks",
                icon: "⚠️",
                video: "https://www.youtube.com/embed/Dk-ZqQ-bfy4"
            },
            {
                name: "Data Protection and Security",
                icon: "🛡️",
                video: "https://www.youtube.com/embed/AuYNXgO_f3Y"
            }
        ]
    };

    const courses = courseData[courseName] || [];

    const [showCourses, setShowCourses] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [savingProgress, setSavingProgress] = useState(false);
    const [progressError, setProgressError] = useState("");

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
        setProgressError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function handleComplete() {
        if (
            !selectedCourse ||
            completedLessons.includes(selectedCourse.name) ||
            savingProgress
        ) {
            return;
        }

        setSavingProgress(true);
        setProgressError("");

        const updatedCompletedLessons = [
            ...completedLessons,
            selectedCourse.name
        ];

        try {
            const courseResponse = await api.get("/courses");

            const courseList =
                courseResponse.data.courses ||
                courseResponse.data.data ||
                courseResponse.data;

            const matchingCourse = Array.isArray(courseList)
                ? courseList.find((course) => course.title === courseName)
                : null;

            if (!matchingCourse) {
                throw new Error(
                    "Course not found in the database. Please check the course title."
                );
            }

            await api.put("/students/progress", {
                courseId: matchingCourse._id,
                completedLessons: updatedCompletedLessons.length,
                totalLessons: courses.length
            });

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
        } catch (error) {
            console.error(
                "Progress save error:",
                error.response?.data || error.message
            );

            setProgressError(
                error.response?.data?.message ||
                error.message ||
                "Unable to save progress."
            );
        } finally {
            setSavingProgress(false);
        }
    }

    const overallProgress = calculateProgress(completedLessons);

    return (
        <>
            <Navbar />

            <div className="container course-details-page">
                <div className="course-header">
                    <span className="course-badge">📚 Learning Course</span>
                    <h1>{courseName}</h1>
                    <p>
                        Explore the course topics, watch lessons and track your learning progress.
                    </p>
                </div>

                {!showCourses && (
                    <button className="enroll-button" onClick={handleEnroll}>
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
                                <span>{selectedCourse.name} Progress</span>
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
                                disabled={
                                    completedLessons.includes(selectedCourse.name) ||
                                    savingProgress
                                }
                            >
                                {savingProgress
                                    ? "Saving..."
                                    : completedLessons.includes(selectedCourse.name)
                                    ? "Completed ✓"
                                    : "Mark as Completed"}
                            </button>

                            {progressError && (
                                <p className="progress-message">{progressError}</p>
                            )}

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
