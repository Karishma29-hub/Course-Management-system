
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
};

function Courses() {
    const { courses, loading, error } = useCourses();

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Courses</h1>

                {loading && <p>Loading courses...</p>}
                {error && <p>{error}</p>}

                {!loading && !error &&
                    courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            courseName={course.title}
                            description={course.description}
                            image={courseImages[course.title]}
                        />
                    ))}
            </div>

            <Footer />
        </>
    );
}

export default Courses;