import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Certificate() {

    const location = useLocation();

    const courseName =
        location.state?.courseName || "Course";

    const completionDate =
        new Date().toLocaleDateString("en-IN");

    return (
        <>
            <Navbar />

            <div className="certificate-page">

                <div className="certificate">

                    <div className="certificate-inner">

                        <div className="certificate-badge">
                            🏆
                        </div>

                        <p className="certificate-small-title">
                            STUDENT MANAGEMENT SYSTEM
                        </p>

                        <h1>
                            Certificate of Completion
                        </h1>

                        <div className="certificate-line"></div>

                        <p className="presented-text">
                            This certificate is proudly presented to
                        </p>

                        <h2 className="student-name">
                            Karishma
                        </h2>

                        <p className="certificate-text">
                            for successfully completing the course
                        </p>

                        <h2 className="course-name">
                            {courseName}
                        </h2>

                        <p className="certificate-text">
                            and successfully completing all the
                            required course topics.
                        </p>

                        <div className="certificate-message">
                            🎉 Congratulations!
                        </div>

                        <div className="certificate-bottom">

                            <div className="certificate-date">

                                <strong>
                                    {completionDate}
                                </strong>

                                <span>
                                    Date of Completion
                                </span>

                            </div>

                            <div className="certificate-seal">
                                ✓
                            </div>

                            <div className="certificate-signature">

                                <div className="signature-line">
                                </div>

                                <span>
                                    Program Coordinator
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                <button
                    className="print-button"
                    onClick={() => window.print()}
                >
                    🖨️ Print / Save Certificate
                </button>

            </div>

            <Footer />
        </>
    );
}

export default Certificate;
