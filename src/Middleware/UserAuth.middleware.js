import jwt from "jsonwebtoken";

export const UserAuth = (req, res, next) => {
  const authHead = req.headers.authorization;
  const token = authHead && authHead.split(" ")[1];
  jwt.verify(token, process.env.JwtSecretKey, (err, sucess) => {
    if (err === jwt.TokenExpiredError) {
      res.statusCode = 401;
      res.statusMessage = "Your Session have been Expired.";
      return res.send();
    } else if (err) {
      res.statusCode = 401;
      res.statusMessage = "Your account have been Logged out.";
      return res.send();
    } else if (sucess.type !== "user") {
      res.statusCode = 401;
      res.statusMessage = "You are not authorized to access this sight.";
    } else {
      res.locals.auth = sucess;
      next();
    }
  });
};
