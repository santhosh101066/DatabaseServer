import { Router } from "express";
import { register } from "../Controller/Authentication.controller.js";

const router=Router()
router.post('/register',register)

const Authentication=router
export default Authentication