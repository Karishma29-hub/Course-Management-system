import Navbar from "../components/Navbar";
console.log("MY HOME FILE IS RUNNING");

import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="home-page">

                {/* HERO SECTION */}

                <section className="hero-section">

                    <div className="hero-content">

                        <span className="welcome-badge">
                            ✨ Welcome to your learning space
                        </span>

                        <h1>
                            Student Management
                            <br />
                            <span>System</span>
                        </h1>

                        <p>
                            Manage students, explore courses and
                            track your academic learning journey
                            in one simple platform.
                        </p>

                        <div className="hero-buttons">

                            <button
                                className="primary-button"
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                👨‍🎓 Student Login →
                            </button>

                            <button
                                className="secondary-button"
                                onClick={() =>
                                    navigate("/admin-login")
                                }
                            >
                                🛡️ Admin Login →
                            </button>

                        </div>

                    </div>

                    <div className="hero-icon">
                        🎓
                    </div>

                </section>


                {/* FEATURES */}

                <section className="features-section">

                    <h2>Everything You Need</h2>

                    <p className="features-subtitle">
                        Simple tools to manage your academic journey
                    </p>

                    <div className="features-grid">

                        <div className="feature-card">

                            <div className="feature-icon">
                                👨‍🎓
                            </div>

                            <h3>
                                Student Management
                            </h3>

                            <p>
                                Manage student information
                                quickly and efficiently.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="feature-icon">
                                📚
                            </div>

                            <h3>
                                Online Courses
                            </h3>

                            <p>
                                Explore courses and learn
                                new technical skills.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="feature-icon">
                                📊
                            </div>

                            <h3>
                                Track Progress
                            </h3>

                            <p>
                                Monitor your learning progress
                                and course completion.
                            </p>

                        </div>

                    </div>

                </section>


                {/* COURSES */}

                <section className="courses-home-section">

                    <h2>Explore Our Courses</h2>

                    <p className="features-subtitle">
                        Choose a course and start learning
                    </p>

                    <div className="home-courses-grid">

                        <div className="home-course-card">

                            <div className="home-course-icon">
                                💻
                            </div>

                            <h3>
                                Computer Science
                            </h3>

                            <p>
                                Learn programming, data structures,
                                databases and computer science concepts.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/course-details",
                                        {
                                            state: {
                                                courseName:
                                                    "Computer Science"
                                            }
                                        }
                                    )
                                }
                            >
                                View Course →
                            </button>

                        </div>


                        <div className="home-course-card">

                            <div className="home-course-icon">
                                🤖
                            </div>

                            <h3>
                                Artificial Intelligence
                            </h3>

                            <p>
                                Learn machine learning, NLP,
                                deep learning and computer vision.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/course-details",
                                        {
                                            state: {
                                                courseName:
                                                    "Artificial Intelligence"
                                            }
                                        }
                                    )
                                }
                            >
                                View Course →
                            </button>

                        </div>


                        <div className="home-course-card">

                            <div className="home-course-icon">
                                🌐
                            </div>

                            <h3>
                                Web Development
                            </h3>

                            <p>
                                Learn HTML, CSS, JavaScript,
                                responsive design and React.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/course-details",
                                        {
                                            state: {
                                                courseName:
                                                    "Web Development"
                                            }
                                        }
                                    )
                                }
                            >
                                View Course →
                            </button>

                        </div>

                    </div>

                </section>

            </div>

            <Footer />
        </>
    );
}

export default Home;
