import { Router } from "express";
import multer from "multer";
import { addProduct, editProduct } from "../Controller/Admin.controller.js";
import { AdminAuth } from "../Middleware/AdminAuth.middleware.js";

const router = Router();
const storage = multer({ dest: "./ProductImages/" });
const upload = storage.fields([
  { name: "main_image", maxCount: 1 },
  { name: "other_image" },
]);

router.post("/newproduct", AdminAuth, upload, addProduct);
router.put("/product", AdminAuth,editProduct);
const AdminRoutes = router;
export default AdminRoutes;
