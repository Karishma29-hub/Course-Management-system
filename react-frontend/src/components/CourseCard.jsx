
import { useNavigate } from "react-router-dom";

function CourseCard({ courseName, description, image }) {
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
            {image && (
                <img
                    src={image}
                    alt={courseName}
                    className="course-image"
                />
            )}

            <h3>{courseName}</h3>
            <p>{description}</p>

            <button onClick={handleViewCourse}>
                View Course
            </button>
        </div>
    );
}

export default CourseCard;