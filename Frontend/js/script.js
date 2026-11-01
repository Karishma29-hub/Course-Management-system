import { setUser, logoutUser, getState } from "./state.js";
import { addNewStudent, displayStudents } from "./student.js";

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter email and password");
        return;
    }

    setUser({
        email: email
    });

    alert("Login successful!");

    console.log("Application State:", getState());
}

function logout() {
    logoutUser();
    alert("Logged out successfully!");
    window.location.href = "student-login.html";
}

window.login = login;
window.logout = logout;
window.addNewStudent = addNewStudent;
window.displayStudents = displayStudents;