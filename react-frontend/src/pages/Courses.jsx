import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";

function Courses() {
    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Courses</h1>

                <CourseCard
                    courseName="Computer Science"
                    description="Learn programming and computer science concepts."
                />

                <CourseCard
                    courseName="Artificial Intelligence"
                    description="Learn AI and machine learning concepts."
                />

                <CourseCard
                    courseName="Web Development"
                    description="Learn HTML, CSS, JavaScript and React."
                />
            </div>

            <Footer />
        </>
    );
}

export default Courses;
