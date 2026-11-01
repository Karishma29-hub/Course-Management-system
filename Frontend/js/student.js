import { addStudent, getStudents } from "./state.js";

export function addNewStudent(id, name, marks) {

    let student = {
        id: id,
        name: name,
        marks: marks
    };

    addStudent(student);

    console.log("Student added:", student);
}

export function displayStudents() {

    let students = getStudents();

    console.log("Student List:");

    for (let student of students) {
        console.log(
            student.id,
            student.name,
            student.marks
        );
    }
}