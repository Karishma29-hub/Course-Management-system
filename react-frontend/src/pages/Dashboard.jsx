import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Student Dashboard</h1>

                <h3>Student Profile</h3>

                <p><b>Name:</b> Karishma</p>
                <p><b>Email:</b> student@gmail.com</p>
                <p><b>Course:</b> Computer Science with AI</p>
            </div>

            <Footer />
        </>
    );
}

export default Dashboard;