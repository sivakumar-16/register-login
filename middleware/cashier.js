import env from 'dotenv/config'
import jwt from 'jsonwebtoken'

function  auth(req,res,next){
    const token=req.header('x-auth-token')
    try {
        console.log("authentication success ready for cashier check");
        const decoded=jwt.verify(token,''+process.env.SECRET)
        req.user=decoded;
        if(req.user.iscashier==false) return res.send('Sorry!, Only cashier make the change')
        next();
    } catch (error) {
        res.status(400).send('invalid token'+error.message)
    }
}

export default auth