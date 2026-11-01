import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>Student Management System</h2>

            <ul>

                <li>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/login">
                        Student Login
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin-login">
                        Admin Login
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard">
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/courses">
                        Courses
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;