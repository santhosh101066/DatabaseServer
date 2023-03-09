import { Router } from "express";
import multer from "multer";
import { addProduct } from "../Controller/Admin.controller.js";

const router = Router();
const storage = multer({ dest: "./ProductImages/" });
const upload = storage.fields([
  { name: "main_image", maxCount: 1 },
  { name: "other_image" },
]);
router.post("/newproduct", upload, addProduct);
const AdminRoutes = router;
export default AdminRoutes;
