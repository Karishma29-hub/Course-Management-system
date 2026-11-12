
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        department: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    async function handleRegister(event) {
        event.preventDefault();
        setError("");

        if (formData.password.length < 12) {
            setError("Password must contain at least 12 characters.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/auth/register",
                formData
            );

            alert(response.data.message || "Registration successful!");

            navigate("/login");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <div className="container register-page">
                <h1>Student Registration</h1>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Create Password (minimum 12 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={12}
                        maxLength={72}
                        required
                    />

                    <input
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default Register;
