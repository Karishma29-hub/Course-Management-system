import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminLogin() {

    const navigate = useNavigate();

    function handleAdminLogin(event) {

        event.preventDefault();

        alert("Admin Login successful!");

        navigate("/admin-dashboard");
    }

    return (
        <>
            <Navbar />

            <div className="container login-page">

                <div className="login-icon">
                    🛡️
                </div>

                <h1>Admin Login</h1>

                <p className="login-subtitle">
                    Login to manage students and courses
                </p>

                <form onSubmit={handleAdminLogin}>

                    <input
                        type="email"
                        placeholder="Enter Admin Email"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        required
                    />

                    <button type="submit">
                        Admin Login →
                    </button>

                </form>

                <p className="register-text">
                    Don't have an admin account?
                    <span onClick={() => navigate("/admin-register")}>
                        Register Here
                    </span>
                </p>

            </div>

            <Footer />x
        </>
    );
}

export default AdminLogin;
