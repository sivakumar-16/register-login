import express from "express";
import {insertdata,login,studentdata,remove,updatedata} from "../controller/controller.js";
import auth from '../middleware/auth.js'
// import staff from "../middleware/staff.js";
// import hod from '../middleware/hod.js';


const route=express.Router()

route.post('/register',insertdata);
route.post('/login',login);
route.get('/viewprofile',auth,studentdata)
route.put('/update',auth,updatedata);
route.delete('/delete',remove);



export default route;