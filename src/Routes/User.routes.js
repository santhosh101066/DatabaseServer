import { Router } from "express";
import mongodb from "../Services/Monogodb.services.js";
import { UserAuth } from "../Middleware/UserAuth.middleware.js";

const router = Router();
router.get("/cartcount",UserAuth, async (req, res) => {
  console.log(res.locals.auth);
  const length = (
    await (await mongodb.cartcount(res.locals.auth.uid)).toArray()
  )[0].countall;
  res.json({ length });
});

const UserRoute = router;
export default UserRoute;
   