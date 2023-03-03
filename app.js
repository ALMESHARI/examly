import express from "express";
import path from "path";
import mongoose from "mongoose";
import {
    Department,
    Course,
    Exam,
    Question,
    addCourse,
    addDeprtment,
    getDepartments,
    addExam,
    getExams,
    getExam,
} from "./models/Department.js";

// because ES6 doesn't have __dirname
const __dirname = path.resolve();

// express app
const app = express();

//for testing
// const user = new User({username:'jamel aldin'}).save()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoDB databese connection
const dbURI = "";
mongoose
    .connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// using ejs as a view engine
app.set("view engine", "ejs");

// middleware of static files (public folder)
app.use(express.static("public"));

app.get("/explore", (req, res) => {
    // get database request for departemnts like the dummy objects above for rendering the explore page
    getDepartments().then((departments) =>
        res.render("main", {
            user: "student",
            departments: departments,
            page: "explore",
        })
    );
});

app.get("/courses/:department/:course", (req, res) => {
    // request to database to get the course as shown above (you can take the course name by req.params.course)
    getExams(req.params.course).then(([quizzes, majors, midterms]) => {
        res.render("main", {
            courseName: req.params.id,
            user: "admin",
            quizzes: quizzes,
            page: "course",
            majors: majors,
            midterms: midterms,
        });
    });
});

app.get("/courses/:department/:course/exams/:examType/:exam", (req, res) => {
    //request for exam questions data as above (you can take the course name and exam name by req.params.course , req.params.exam)
    getExam(req.params.exam, req.params.course, req.params.examType).then(
        (exam) => {
            console.log(exam);
            res.render("main", {
                examName: req.params.exam,
                user: "admin",
                questions: shuffle(exam.questions),
                page: "exam",
            });
        }
    );
});
// APT for above request
app.get(
    "/api/courses/:department/:course/exams/:examType/:exam",
    (req, res) => {
        //request for exam questions data as above (you can take the course name and exam name by req.params.course , req.params.exam)
        getExam(req.params.exam, req.params.course, req.params.examType).then(
            (exam) => {
                exam.questions.forEach((el) => {
                    el._id = null;
                });
                res.json(JSON.stringify(exam.questions));
            }
        );
    }
);

app.post(
    "/courses/:department/:course/exams/:examType/:exam/reviewExam",
    (req, res) => {
        //recieve an exam req.params.exam return the correct answers of that exam
        //recived ansewrs:
        //its just an array of answers

        //dummy correct answers object (in real database get the questions of exam as the object above and the correct answers)
        getExam(req.params.exam, req.params.course, req.params.examType).then(
            (exam) => {
                res.render("main", {
                    user: "admin",
                    recivedAnsewrs: Object.values(req.body),
                    questions: exam.questions,
                    correctAnswers: exam.correctAnswers,
                    page: "review",
                });
            }
        );
    }
);

app.get("/courses/:department/:course/add/:examType/exam", (req, res) => {
    // reciving course and examType(could be Quizzes or Midterms or Majors)
    //send the form for adding the exam (no database query required here!!)
    res.render("main", {
        user: "admin",
        examType: req.params.examType,
        page: "addexam",
    });
});

//reciveing data of the added exam, add the exam to database then redirect the user to the course page
app.post("/courses/:department/:course/add/:examType/exam/data", (req, res) => {
    // console.log(req.body)//add those data to database
    let examName = req.body.examName;
    let examDescription = req.body.examDescription;
    let questions = req.body.questions;
    let correctAnswer = req.body.correct_Answers;
    let courseName = req.params.course;
    let examType = req.params.examType;

    let exam = {
        examType: examType,
        courseName: courseName,
        header: examName,
        description: examDescription,
        questions: questions,
        correctAnswers: correctAnswer,
    };
    console.log(exam);

    addExam(req.params.examType, req.params.course, exam);
    res.redirect(`/courses/${req.params.department}/${req.params.course}`);
});

//reciveing data of the added course, add the course to database then redirect the user to the explore page
app.post("/explore/add/:department/courses", (req, res) => {
    console.log(req.body); //add those data to database
    addCourse({
        header: req.body.ID,
        description: req.body.description,
        departmentName: req.params.department,
    }).then(res.redirect(`/explore`));
});

app.get("/signin", (req, res) => {
    res.render("signin");
});

// handling the requests for 404 page
app.use((req, res) => {
    req.on("data", (data) => {
        console.log(data.toString());
    });
    res.render("404");
});

function shuffle(questions) {
    for (let question of questions) {
        question.answers = getShuffledArr(question.answers);
    }
    return questions;
}

const getShuffledArr = (arr) => {
    if (arr.length === 1) {
        return arr;
    }
    const rand = Math.floor(Math.random() * arr.length);
    return [arr[rand], ...getShuffledArr(arr.filter((_, i) => i != rand))];
};
