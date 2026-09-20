import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CourseDetails() {
    const location = useLocation();

    const courseName = location.state?.courseName || "Course";

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>{courseName}</h1>

                <h2>Course Details</h2>

                <p>
                    Welcome to the {courseName} course.
                </p>

                <p>
                    Learn important concepts, develop practical skills,
                    and improve your knowledge through this course.
                </p>

                <button onClick={() => alert("You have successfully enrolled in " + courseName)}>
    Enroll Now
</button>
            </div>

            <Footer />
        </>
    );
}

export default CourseDetails;