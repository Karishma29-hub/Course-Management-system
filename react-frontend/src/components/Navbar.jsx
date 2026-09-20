import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>Student Management System</h2>

            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>

                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>

                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>

                <li>
                    <NavLink to="/courses">Courses</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;