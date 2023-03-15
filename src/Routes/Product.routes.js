import { Router } from "express";
import { basicProductController, detailedProductView, searchEngine } from "../Controller/Product.controller.js";

const router = Router();
router.get("/basic/:category",basicProductController);
router.get("/detailed/:id",detailedProductView);
router.get("/search/:find",searchEngine)
const ProductRoute = router;
export default ProductRoute;