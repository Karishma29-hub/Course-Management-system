let state = {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    students: JSON.parse(localStorage.getItem("students")) || []
};

export function setUser(user) {
    state.currentUser = user;
    state.isLoggedIn = true;

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
}

export function logoutUser() {
    state.currentUser = null;
    state.isLoggedIn = false;

    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
}

export function getState() {
    return state;
}

export function addStudent(student) {
    state.students.push(student);
    localStorage.setItem("students", JSON.stringify(state.students));
}

export function getStudents() {
    return state.students;
}