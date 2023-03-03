import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
        question:{
                type: String,
                required: true
        },

        answers: {
                type: [String],
                required: true
        },
})

const examSchema = new Schema({
        header:{
                type: String,
                required: true
        },

        description: {
                type: String,
                required: true
        },

        examType: {
                type: String,
                required:true
        },

        courseName: {
                type: String,
                required:true
        },

        questions: [questionSchema]
        , correctAnswers: {
                type: [String]
        }
        
})

const courseSchema = new Schema({
        header:{
                type: String,
                required: true
        },

        description: {
                type: String,
                required: true
        },
        departmentName: {
                type: String,
                required:true

        },
})


const departemntSchema = new Schema({
        departmentName: {
                type: String,
                required: true
        },
        courses: {
                type: [String]
        }
})

const Department = mongoose.model('Department', departemntSchema)
const Course = mongoose.model('Course', courseSchema)
const Exam = mongoose.model('Exam', examSchema)
const Question = mongoose.model('Question', questionSchema)

async function addCourse(course) {
        console.log(course)
        await new Course(course).save()
}

async function addExam(examType, courseName, exam) {
        // for (let question in exam.questions) {
        //         question.courseName = courseName
        // }
        await new Exam(exam).save()
}

async function addDeprtment(departmentName) {
        await new Department({departmentName:departmentName}).save()
}

async function getDepartments() {
        let departmentNames = await Department.find()
        let courses = await getAllCourses()
        console.log(courses)
        let departments = []

        for (let depart of departmentNames) {
                let dpName = depart.departmentName
                let targetCourses = []
                for (let course of courses) {
                        if (course.departmentName == dpName) {
                                targetCourses.push(course)
                        }
                }
                if (targetCourses.length == 0) {
                        targetCourses = null
                }

                departments.push({
                        departmentName: dpName,
                        courses: targetCourses
                })
        }
        return departments
}

async function getAllCourses() {
        let courses = await Course.find()
        console.log(courses)
        return courses
}

// header is the exam name 
async function getExam(header, course, examType) {
        return await Exam.findOne({ header: header, courseName: course ,examType:examType})

}

async function getExams(course) {
        let quizzes = await Exam.find({ courseName: course, examType: 'Quizzes' })
        let majors = await Exam.find({ courseName: course, examType: 'Majors' })
        let midterms = await Exam.find({ courseName: course, examType: 'Midterms' })
        return [quizzes,majors,midterms]
}




export { Department, Course, Exam, Question , addCourse, addDeprtment, getDepartments , addExam , getExams ,getExam}