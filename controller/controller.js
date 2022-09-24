import {Student,validatestudent} from "../model/schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv/config';
// import auth from '../middleware/auth.js'

const insertdata=async(req,res)=>{
    validatestudent(req.body);
    let register_no=req.body.register_no;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let course=req.body.course;
    

    console.log(name+' '+email);
    try {
        const edata=await Student.findOne({email:email})
        if(edata) return res.send("Email is already used")
        // console.log("else part working");
        const salt_routes=10;
        bcrypt.hash(password,salt_routes,async function(err,hash){
            const data= await Student.insertMany({
                register_no,
                name,
                email,
                password:hash,
                course,
                
            })
            if(data) return res.send(data+"added")
        })
    } catch (error) {
        return res.send(error.message)
    }
}

const login=async(req,res)=>{
    validatestudent(req.body)
    let email=req.body.email;
    let pwd=req.body.pwd;
    console.log(email+" "+pwd);
    try {
        const data= await Student.findOne({email:email})
        if(data){
        bcrypt.compare(pwd,data.password,async function(err, result){
            // console.log();
            if(result==true){
                const token=jwt.sign({_id:data._id,isStaff:data.isStaff,iscashier:data.iscashier},''+process.env.SECRET)
                return res.header('x-auth-token',token).send()
                // return res.send({'x-auth-token':token})
                // return res.send(data)
            }
            return res.send("Please enter correct id and password")
        })
    }
    else{
        return res.send("No user on that email")
    }
    } catch (error) {
       return res.send(error.message)
    }
}

const updatedata=async(req,res)=>{
    let pwd=req.body.pwd;
    try {
        console.log(req.user._id);
        const data=await Student.findById(req.user._id)
        const salt_routes=10;
        bcrypt.hash(pwd,salt_routes,async function(err,hash){
            const udata=await Student.updateOne({email:data.email},{
                $set:{password:hash}
            })
            if(udata) return res.send("update"+udata)
        })
        if(data)return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}

const studentdata=async(req,res)=>{
    let stu_id=req.user._id;
    try {
        const data=await Student.findOne({_id:stu_id},{password:0})
        if(data) return res.send(data);
        return res.send('No data')
    } catch (error) {
        return res.send(error.message)
    }
}

const remove= async (req, res) => {
    const genre = await Student.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  }
  
//   router.get('/:id', async (req, res) => {
//     const genre = await Student.findById(req.params.id);
  
//     if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
//     res.send(genre);
//   });
  



export {insertdata,login,updatedata,studentdata,remove}