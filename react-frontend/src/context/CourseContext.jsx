
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

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);

    const limit = 10;

    // Fetch courses with pagination
    async function fetchCourses(page = 1) {
        try {
            setLoading(true);

            const response = await api.get(
                `/courses?page=${page}&limit=${limit}`
            );

            setCourses(response.data.data || []);

            setCurrentPage(
                response.data.pagination?.currentPage || page
            );

            setTotalPages(
                response.data.pagination?.totalPages || 1
            );

            setTotalCourses(
                response.data.pagination?.totalCourses || 0
            );

            setError(null);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            setError("Unable to load courses.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses(1);
    }, []);

    // Add a course
    async function addCourse(course) {
        await api.post("/courses", course);
        await fetchCourses(currentPage);
    }

    // Update a course
    async function updateCourse(id, updatedCourse) {
        await api.put(`/courses/${id}`, updatedCourse);
        await fetchCourses(currentPage);
    }

    // Delete a course
    async function deleteCourse(id) {
        await api.delete(`/courses/${id}`);

        const pageToLoad =
            courses.length === 1 && currentPage > 1
                ? currentPage - 1
                : currentPage;

        await fetchCourses(pageToLoad);
    }

    return (
        <CourseContext.Provider
            value={{
                courses,
                loading,
                error,
                currentPage,
                totalPages,
                totalCourses,
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
