import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    ID:{
        type: String,
        required: true
    }
    ,description:{
        type: String,
        required: true
    },
})

const Courses = mongoose.model('Courses', courseSchema)

export default Courses