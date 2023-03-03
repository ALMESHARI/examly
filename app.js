import express from "express";
import path from "path";
import mongoose from "mongoose";
// import { Department, Course, Exam, Question } from './models/Department.js'
import User from "./models/User.js";
import { department } from "./models/department.js";
import Courses from "./models/Course.js";
import mysql from "mysql";

const __dirname = path.resolve();

// express app
const app = express();

//tring for signin/up popup
import bodyParser from "body-parser";
import { copyFileSync } from "fs";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoDB databese connection
mongoose.set("strictQuery", true);
const dbURI = "";
mongoose
    .connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// using ejs as a view engine
app.set("view engine", "ejs");

// middleware of static files (public folder)
app.use(express.static("public"));

app.get("/explore", async (req, res) => {
    var departments;
    await department
        .find({ department })
        .then((results) => {
            departments = results;
        })
        .catch((err) => {
            console.log(err);
        });
    res.render("main", {
        user: "admin",
        departments: departments,
        page: "explore",
    });
});

app.get("/courses/:title/:course", async (req, res) => {
    var quizzes;
    var majors;
    var midterms;
    await department
        .findOne({ "courses.header": `${req.params.course}` })
        .then((results) => {
            quizzes = results.courses[0].quizzes;
            majors = results.courses[0].majors;
            midterms = results.courses[0].midterms;
        })
        .catch((err) => {
            console.log(err);
        });
    res.render("main", {
        courseName: req.params.id,
        user: "admin",
        quizzes: quizzes,
        page: "course",
        majors: majors,
        midterms: midterms,
    });
});

app.get("/courses/:title/:course/exams/:examType/:exam", async (req, res) => {
    //request for exam questions data as above (you can take the course name and exam name by req.params.course , req.params.exam)
    let questions = [];
    await department
        .findOne({ "courses.header": req.params.course })
        .then((results) => {
            const courses = results.courses;
            const examType = req.params.exam;
            const courseName = req.params.course;
            const examTypeMatch = req.params.examType.toLowerCase();
            console.log(examTypeMatch);
            console.log(req.body);

            for (let i = 0; i < courses.length; i++) {
                if (courses[i].header == `${courseName.toString()}`) {
                    if (examTypeMatch == "quizzes") {
                        const quizzes = courses[i].quizzes;
                        for (let j = 0; j < quizzes.length; j++) {
                            if (quizzes[j].header == `${examType.toString()}`) {
                                questions = quizzes[j].questions;
                            }
                        }
                    } else if (examTypeMatch == "majors") {
                        const majors = courses[i].majors;
                        for (let j = 0; j < majors.length; j++) {
                            if (majors[j].header == `${examType.toString()}`) {
                                questions = majors[j].questions;
                            }
                        }
                    } else {
                        const midterms = courses[i].midterms;
                        for (let j = 0; j < midterms.length; j++) {
                            if (
                                midterms[j].header == `${examType.toString()}`
                            ) {
                                questions = midterms[j].questions;
                            }
                        }
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
    console.log(questions);
    res.render("main", {
        examName: req.params.exam,
        user: "admin",
        questions: questions,
        page: "exam",
    });
});

app.post(
    "/courses/:title/:course/exams/:examType/:exam/reviewExam",
    async (req, res) => {
        let questions = [];
        let recivedAnsewrs = Object.values(req.body);
        let correctAnswers;

        await department
            .findOne({ "courses.header": req.params.course })
            .then((results) => {
                const courses = results.courses;
                const examType = req.params.exam;
                const courseName = req.params.course;
                const examTypeMatch = req.params.examType.toLowerCase();
                for (let i = 0; i < courses.length; i++) {
                    if (courses[i].header == `${courseName.toString()}`) {
                        if (examTypeMatch == "quizzes") {
                            const quizzes = courses[i].quizzes;
                            for (let j = 0; j < quizzes.length; j++) {
                                if (
                                    quizzes[j].header ==
                                    `${examType.toString()}`
                                ) {
                                    questions = quizzes[j].questions;
                                    correctAnswers = quizzes[j].correct_Answers;
                                }
                            }
                        } else if (examTypeMatch == "majors") {
                            const majors = courses[i].majors;
                            for (let j = 0; j < majors.length; j++) {
                                if (
                                    majors[j].header == `${examType.toString()}`
                                ) {
                                    questions = majors[j].questions;
                                    correctAnswers = majors[j].correct_Answers;
                                }
                            }
                        } else {
                            const midterms = courses[i].midterms;
                            for (let j = 0; j < midterms.length; j++) {
                                if (
                                    midterms[j].header ==
                                    `${examType.toString()}`
                                ) {
                                    questions = midterms[j].questions;
                                    correctAnswers =
                                        midterms[j].correct_Answers;
                                }
                            }
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });

        res.render("main", {
            user: "admin",
            recivedAnsewrs: recivedAnsewrs,
            questions: questions,
            correctAnswers: correctAnswers,
            page: "review",
        });
    }
);

app.get("/courses/:title/:course/add/:examType/exam", (req, res) => {
    // reciving course and examType(could be Quizzes or Midterms or Majors)
    //send the form for adding the exam (no database query required here!!)
    res.render("main", {
        user: "admin",
        examType: req.params.examType,
        page: "addexam",
    });
});

//reciveing data of the added exam, add the exam to database then redirect the user to the course page
app.post(
    "/courses/:title/:course/add/:examType/exam/data",
    async (req, res) => {
        console.log("data");
        console.log(req.body);
        const header = req.body.examName;
        const description = req.body.examDes;
        const questions = req.body.questions;
        const correct_Answers = req.body.correct_Answers;
        const courseheader = req.params.course;
        const quizheader = req.params.examType.toLowerCase();

        // const update=await department.updateOne({departmentName:departmentName},{$push: {courses:{header: req.body.ID, description: description}}})
        console.log(req.params.course, req.params.examType.toLowerCase());
        console.log(req.body); //add those data to database

        if (quizheader == "quizzes") {
            const update = await department.updateOne(
                { "courses.header": courseheader },
                {
                    $push: {
                        "courses.$.quizzes": {
                            header: header,
                            description: description,
                            questions: questions,
                            correct_Answers: correct_Answers,
                        },
                    },
                }
            );
        }
        if (quizheader == "majors") {
            const update = await department.updateOne(
                { "courses.header": courseheader },
                {
                    $push: {
                        "courses.$.majors": {
                            header: header,
                            description: description,
                            questions: questions,
                            correct_Answers: correct_Answers,
                        },
                    },
                }
            );
        } else {
            const update = await department.updateOne(
                { "courses.header": courseheader },
                {
                    $push: {
                        "courses.$.midterms": {
                            header: header,
                            description: description,
                            questions: questions,
                            correct_Answers: correct_Answers,
                        },
                    },
                }
            );
        }
        res.redirect(`/courses/${req.params.title}/${req.params.course}`);
    }
);

//reciveing data of the added course, add the course to database then redirect the user to the explore page
app.post("/explore/add/:department/courses", async (req, res) => {
    const departmentName = req.params.department;
    const { ID, description } = req.body;
    // console.log(ID,description, departmentName);
    const update = await department.updateOne(
        { departmentName: departmentName },
        {
            $push: {
                courses: { header: req.body.ID, description: description },
            },
        }
    );

    res.redirect(`/explore`);
});

// handling the requests for 404 page
app.use((req, res) => {
    req.on("data", (data) => {
        console.log(data.toString());
    });
    res.render("404");
});
