import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        alert("Login successful!");

        navigate("/dashboard");
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Student Login</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
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