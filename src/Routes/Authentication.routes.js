import { Router } from "express";
import {
  login,
  register,
  validate,
} from "../Controller/Authentication.controller.js";
import { jwtVerify } from "../Models/Register.model.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/validate", jwtVerify, validate);

const Authentication = router;
export default Authentication;
