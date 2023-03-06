import { Router } from "express";
import { jwtVerify } from "../Models/Register.model.js";
import mongodb from "../Services/Monogodb.services.js";

const router = Router();
router.use(jwtVerify)
router.get('/cartcount',async(req,res)=>{
    console.log(res.locals.auth);
  const length =(await(await mongodb.cartcount(res.locals.auth.uid)).toArray())[0].countall;  
  res.json({length})
})


const UserRoute=router
export default UserRoute 