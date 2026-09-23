import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {

    const [startedCourse, setStartedCourse] =
        useState(null);

    const [completedLessons, setCompletedLessons] =
        useState([]);

    useEffect(() => {

        const savedCourse =
            localStorage.getItem("startedCourse");

        if (savedCourse) {

            const course =
                JSON.parse(savedCourse);

            setStartedCourse(course);

            const savedLessons =
                localStorage.getItem(
                    "completed_" + course.courseName
                );

            if (savedLessons) {

                setCompletedLessons(
                    JSON.parse(savedLessons)
                );

            }

        }

    }, []);

    const totalLessons = 4;

    const progress =
        Math.round(
            (completedLessons.length /
                totalLessons) * 100
        );

    return (
        <>
            <Navbar />

            <div className="container">

                <h1>Student Dashboard</h1>

                <h3>Student Profile</h3>

                <p>
                    <b>Name:</b> Karishma
                </p>

                <p>
                    <b>Email:</b> student@gmail.com
                </p>

                <p>
                    <b>Course:</b> Computer Science with AI
                </p>


                <h3>My Learning</h3>


                {startedCourse ? (

                    <div className="course-card">

                        <h2>
                            📚 {startedCourse.courseName}
                        </h2>


                        <p>
                            Overall Course Progress
                        </p>


                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width:
                                        progress + "%"
                                }}
                            >
                            </div>

                        </div>


                        <p>
                            <b>
                                {progress}%
                            </b>{" "}
                            completed
                        </p>


                        <hr />


                        <h3>
                            Completed Topics
                        </h3>


                        {completedLessons.length === 0 ? (

                            <p>
                                No topics completed yet.
                            </p>

                        ) : (

                            completedLessons.map(
                                (lesson, index) => (

                                    <p key={index}>
                                        ✅ {lesson}
                                    </p>

                                )
                            )

                        )}


                        <p>

                            {progress === 100
                                ? "🎉 Course completed successfully!"
                                : "Keep learning and complete the remaining topics."
                            }

                        </p>

                    </div>

                ) : (

                    <p>
                        You have not started any course yet.
                    </p>

                )}

            </div>

            <Footer />
        </>
    );
}

export default Dashboard;
