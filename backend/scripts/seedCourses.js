
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("../models/Course");

dotenv.config();

const newCourses = [
    {
        title: "Data Science",
        description: "Learn data analysis, visualization, statistics, and Python for extracting meaningful insights.",
        instructor: "Admin",
        duration: "6 weeks"
    },
    {
        title: "Machine Learning",
        description: "Understand supervised learning, unsupervised learning, model training, and prediction techniques.",
        instructor: "Admin",
        duration: "8 weeks"
    },
    {
        title: "Cybersecurity",
        description: "Learn network security, common cyber threats, data protection, and basic ethical hacking concepts.",
        instructor: "Admin",
        duration: "5 weeks"
    }
];

async function seedCourses() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        for (const course of newCourses) {
            const existingCourse = await Course.findOne({
                title: course.title
            });

            if (existingCourse) {
                console.log(`${course.title} already exists. Skipping.`);
                continue;
            }

            await Course.create(course);
            console.log(`${course.title} added successfully.`);
        }

        console.log("Course seeding completed.");
    } catch (error) {
        console.error("Error adding courses:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedCourses();
