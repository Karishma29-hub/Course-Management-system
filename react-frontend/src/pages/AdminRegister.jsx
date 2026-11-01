import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function AdminRegister() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");

    async function handleAdminRegister(event) {
        event.preventDefault();

        try {
            await api.post("/auth/admin-register", {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                department: department.trim(),
                password
            });

            alert("Admin registration successful!");
            navigate("/admin-login");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Admin registration failed!"
            );
        }
    }

    return (
        <>
            <Navbar />

            <div className="container login-page">
                <div className="login-icon">🛡️</div>

                <h1>Admin Registration</h1>

                <p className="login-subtitle">
                    Create an account to manage the system
                </p>

                <form onSubmit={handleAdminRegister}>
                    <input
                        type="text"
                        placeholder="Enter Admin Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter Admin Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Enter Department"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Create Password (8–72 characters)"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        minLength={8}
                        maxLength={72}
                        required
                    />

                    <button type="submit">
                        Register Admin →
                    </button>
                </form>

                <p className="register-text">
                    Already have an admin account?{" "}
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