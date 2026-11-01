
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchCourses() {
        try {
            setLoading(true);

            const response = await api.get("/courses");
            setCourses(response.data.data || []);
            setError(null);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            setError("Unable to load courses.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    async function addCourse(course) {
        const response = await api.post("/courses", course);
        setCourses((previous) => [
            ...previous,
            response.data.data
        ]);
    }

    async function updateCourse(id, updatedCourse) {
        const response = await api.put(
            `/courses/${id}`,
            updatedCourse
        );

        setCourses((previous) =>
            previous.map((course) =>
                String(course._id) === String(id)
                    ? response.data.data
                    : course
            )
        );
    }

    async function deleteCourse(id) {
        await api.delete(`/courses/${id}`);

        setCourses((previous) =>
            previous.filter(
                (course) => String(course._id) !== String(id)
            )
        );
    }

    return (
        <CourseContext.Provider
            value={{
                courses,
                loading,
                error,
                fetchCourses,
                addCourse,
                updateCourse,
                deleteCourse
            }}
        >
            {children}
        </CourseContext.Provider>
    );
}

export function useCourses() {
    return useContext(CourseContext);
}
