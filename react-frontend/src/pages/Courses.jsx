
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../context/CourseContext";

const courseImages = {
    "Python Programming":
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600",

    "Web Development":
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",

    "Artificial Intelligence":
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=350&fit=crop",

    "Data Science":
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",

    "Machine Learning":
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",

    "Cybersecurity":
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
};

function Courses() {
    const {
        courses,
        loading,
        error,
        currentPage,
        totalPages,
        totalCourses,
        fetchCourses
    } = useCourses();

    return (
        <>
            <Navbar />

            <div className="container courses-page">
                <h1>Courses</h1>

                {loading && <p>Loading courses...</p>}
                {error && <p>{error}</p>}

                {!loading && !error && (
                    <>
                        {courses.length === 0 ? (
                            <p>No courses available.</p>
                        ) : (
                            <div className="courses-grid">
                                {courses.map((course) => (
                                    <CourseCard
                                        key={course._id}
                                        courseName={course.title}
                                        description={course.description}
                                        image={courseImages[course.title]}
                                    />
                                ))}
                            </div>
                        )}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "15px",
                                margin: "25px 0"
                            }}
                        >
                            <button
                                onClick={() =>
                                    fetchCourses(currentPage - 1)
                                }
                                disabled={
                                    currentPage <= 1 || loading
                                }
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} of {totalPages}
                                {" | "}
                                Total Courses: {totalCourses}
                            </span>

                            <button
                                onClick={() =>
                                    fetchCourses(currentPage + 1)
                                }
                                disabled={
                                    currentPage >= totalPages || loading
                                }
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Courses;
