const course = require('../models/Course')

const createCourse = async (req,res)=>{
    const{modal_type,description}=req.body;
    const newCourse = await course.create({modal_type,description})
    res.json(newCourse)
}
module.exports={
    createCourse,
}