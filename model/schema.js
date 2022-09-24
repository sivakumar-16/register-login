import mongoose from 'mongoose';
import Joi from 'joi'

const studentSchema= new mongoose.Schema({
    register_no:{
        type:String,
    },
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    course:{
        type:String
    },
  
})

var Student=mongoose.model('Student',studentSchema)

function validatestudent(student){
    const schema={
        name:Joi.string().min(3).max(20),
        register_no:Joi.string().min(3).max(3),
        email:Joi.string().required(),
        password:Joi.string().required(),
    }
}


export  {Student,validatestudent}