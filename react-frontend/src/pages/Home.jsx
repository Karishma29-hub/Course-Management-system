
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const courses = [
        {
            icon: "🐍",
            category: "PROGRAMMING",
            title: "Python Programming",
            description:
                "Learn Python fundamentals, programming concepts, loops, functions and object-oriented programming.",
            courseName: "Python Programming"
        },
        {
            icon: "🤖",
            category: "EMERGING TECHNOLOGY",
            title: "Artificial Intelligence",
            description:
                "Explore machine learning, natural language processing, deep learning and computer vision.",
            courseName: "Artificial Intelligence"
        },
        {
            icon: "🌐",
            category: "WEB TECHNOLOGY",
            title: "Web Development",
            description:
                "Learn HTML, CSS, JavaScript, responsive web design and React.",
            courseName: "Web Development"
        }
    ];

    return (
        <>
            <Navbar />

            <main className="home-page">

                {/* HERO SECTION */}
                <section className="hero-section">
                    <div className="hero-content">

                        <span className="welcome-badge">
                            ✨ YOUR LEARNING JOURNEY STARTS HERE
                        </span>

                        <h1>
                            Student Management
                            <br />
                            <span>System</span>
                        </h1>

                        <p>
                            A simple platform to manage student activities,
                            explore learning opportunities and keep track
                            of your academic progress.
                        </p>

                        <div className="hero-buttons">
                            <button
                                className="primary-button"
                                onClick={() => navigate("/login")}
                            >
                                👨‍🎓 Student Login <span>→</span>
                            </button>

                            <button
                                className="secondary-button"
                                onClick={() => navigate("/admin-login")}
                            >
                                🛡️ Admin Login <span>→</span>
                            </button>
                        </div>

                        <div className="hero-note">
                            Learn. Manage. Grow.
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="hero-icon">🎓</div>
                        <span className="hero-visual-label">
                            YOUR ACADEMIC SPACE
                        </span>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="features-section">

                    <div className="section-heading">
                        <span className="section-label">OUR PLATFORM</span>
                        <h2>Everything You Need</h2>
                        <p className="features-subtitle">
                            Simple tools to manage your academic journey
                        </p>
                    </div>

                    <div className="features-grid">

                        <div className="feature-card">
                            <div className="feature-icon">👨‍🎓</div>
                            <h3>Student Management</h3>
                            <p>
                                Manage student information and keep
                                academic details organised.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📚</div>
                            <h3>Online Courses</h3>
                            <p>
                                Explore available courses and develop
                                useful technical skills.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Track Progress</h3>
                            <p>
                                Monitor your learning activity and
                                follow your course completion.
                            </p>
                        </div>

                    </div>
                </section>

                {/* COURSES SECTION */}
                <section className="courses-home-section">

                    <div className="section-heading">
                        <span className="section-label">START LEARNING</span>
                        <h2>Explore Our Courses</h2>
                        <p className="features-subtitle">
                            Find a subject that interests you and start learning
                        </p>
                    </div>

                    <div className="home-courses-grid">

                        {courses.map((course) => (
                            <div className="home-course-card" key={course.courseName}>

                                <div className="home-course-icon">
                                    {course.icon}
                                </div>

                                <span className="course-category">
                                    {course.category}
                                </span>

                                <h3>{course.title}</h3>

                                <p>{course.description}</p>

                                <button
                                    onClick={() =>
                                        navigate("/course-details", {
                                            state: {
                                                courseName: course.courseName
                                            }
                                        })
                                    }
                                >
                                    Explore Course <span>→</span>
                                </button>

                            </div>
                        ))}

                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}

export default Home;
