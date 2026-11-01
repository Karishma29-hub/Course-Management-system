
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email: email.trim().toLowerCase(),
                password
            });

            // Debug: inspect the backend response
            console.log("LOGIN RESPONSE:", response.data);

            sessionStorage.setItem("token", response.data.token);

            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("LOGIN ERROR:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Login failed!");
        }
    }

    return (
        <>
            <Navbar />

            <div className="container login-page">
                <h1>Student Login</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter Email"
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

                    <button type="submit">Login</button>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default Login;
