import { compareSync, hashSync } from "bcrypt";
import mongodb from "../Services/Monogodb.services.js";
import { jwtGenerator } from "../Models/Register.model.js";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    req.body.password = hashSync(req.body.password, 10);
    req.body.type = "user";
    try {
      const respose = await mongodb.register(req.body);
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 409;
      res.statusMessage = "Account Already Exist";
      res.end();
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.statusMessage = "Internal error";
    res.end();
  }
};
export const login = async (req, res) => {
  try {
    const details = await mongodb.login(req.body.email);
    if(details){
    if (compareSync(req.body.password, details.password)) {
      const token = jwtGenerator({
        uid: details._id,
        type: details.type,
        first_name: details.first_name,
      });
      res.json({ token, type: details.type, first_name: details.first_name });
    } else {

      res.statusCode = 401;
      res.statusMessage = "Invalid Username Or Password";
      res.send();
    }}
    else{
      res.statusCode = 401;
      res.statusMessage = "Account Not Found. If you are new Kindly Signup and try again.";
      res.send();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send();
  }
};

export const validate = (req, res) => {
  res.json({
    status: "sucess",
    type: res.locals.auth.type,
    first_name: res.locals.auth.first_name,
  });
};
