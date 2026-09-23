import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminRegister() {

    const navigate = useNavigate();

    function handleAdminRegister(event) {

        event.preventDefault();

        alert("Admin registration successful!");

        navigate("/admin-login");
    }

    return (
        <>
            <Navbar />

            <div className="container login-page">

                <div className="login-icon">
                    🛡️
                </div>

                <h1>Admin Registration</h1>

                <p className="login-subtitle">
                    Create an account to manage the system
                </p>

                <form onSubmit={handleAdminRegister}>

                    <input
                        type="text"
                        placeholder="Enter Admin Name"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter Admin Email"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Create Password"
                        required
                    />

                    <button type="submit">
                        Register Admin →
                    </button>

                </form>

                <p className="register-text">
                    Already have an admin account?
                    <span onClick={() => navigate("/admin-login")}>
                        Login Here
                    </span>
                </p>

            </div>

            <Footer />
        </>
    );
}

export default AdminRegister;
