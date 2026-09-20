import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course-details" element={<CourseDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;