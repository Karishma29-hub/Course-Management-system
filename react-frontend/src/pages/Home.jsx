import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Welcome to Student Management System</h1>
                <p>Manage students, courses and academic information.</p>
            </div>

            <Footer />
        </>
    );
}

export default Home;