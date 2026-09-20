import { useNavigate } from "react-router-dom";

function CourseCard({ courseName, description }) {
    const navigate = useNavigate();

    function handleViewCourse() {
        navigate("/course-details", {
            state: {
                courseName: courseName
            }
        });
    }

    return (
        <div className="course-card">
            <h3>{courseName}</h3>
            <p>{description}</p>

            <button onClick={handleViewCourse}>
                View Course
            </button>
        </div>
    );
}

export default CourseCard;