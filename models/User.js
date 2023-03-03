import mongoose from "mongoose";

const Schema = mongoose.Schema;
const favoriteSchema=new Schema({
        userId:{
                type: String,
                required: true
        },
        courseId:{
                type: String,
                required: true
        }

})
const resultsSchema=new Schema({
        userId:{
                type: String,
                required: true
        },
        exam:{
                type: String,
                required: true
        },
        score:{
                type: String,
                required: true
        }
})
const userSchema = new Schema({
        firstname: {
                type: String,
                required: true
        }
        ,lastname:{
                type: String,
                required: true
        }
        ,email:{
                type: String,
                required: true
        }
        ,password:{
                type: String,
                required: true
        },
        favCourses:[favoriteSchema]
        ,
        results:[resultsSchema]
})

const User = mongoose.model('User', userSchema)

export default User