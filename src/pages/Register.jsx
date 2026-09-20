import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
    const navigate = useNavigate();

    function handleRegister(event) {
        event.preventDefault();

        alert("Registration successful!");

        navigate("/login");
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Student Registration</h1>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Create Password"
                        required
                    />

                    <button type="submit">Register</button>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default Register;