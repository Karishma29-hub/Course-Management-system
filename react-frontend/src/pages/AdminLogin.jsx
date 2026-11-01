import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleAdminLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email: email.trim().toLowerCase(),
                password
            });

            const user = response.data.user;

            if (user.role !== "admin") {
                alert("Access denied. Admin account required.");
                return;
            }

            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("user", JSON.stringify(user));

            alert("Admin Login successful!");
            navigate("/admin-dashboard");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Admin login failed!"
            );
        }
    }

    return (
        <>
            <Navbar />

            <div className="container login-page">
                <div className="login-icon">🛡️</div>

                <h1>Admin Login</h1>

                <p className="login-subtitle">
                    Login to manage students and courses
                </p>

                <form onSubmit={handleAdminLogin}>
                    <input
                        type="email"
                        placeholder="Enter Admin Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <button type="submit">
                        Admin Login →
                    </button>
                </form>

                <p className="register-text">
                    Don't have an admin account?{" "}
                    <span onClick={() => navigate("/admin-register")}>
                        Register Here
                    </span>
                </p>
            </div>

            <Footer />
        </>
    );
}

export default AdminLogin;