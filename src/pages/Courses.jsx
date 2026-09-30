import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../context/CourseContext";

function Courses() {
    const { courses, loading, error } = useCourses();

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Courses</h1>

                {loading && <p>Loading courses...</p>}

                {error && <p>{error}</p>}

                {!loading &&
                    !error &&
                    courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            courseName={course.courseName}
                            description={course.overview}
                        />
                    ))}
            </div>

            <Footer />
        </>
    );
}

export default Courses;
