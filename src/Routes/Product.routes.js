import { Router } from "express";
import mongodb from "../Services/Monogodb.services.js";

const router = Router();
router.get("/basic/:category", async (req, res) => {
  const category = req.params.category;
  const details = await mongodb.basicProductDetails(category);
  if (details.length > 0) {
    res.json(details);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

router.get("/detailed/:id", async (req, res) => {
  const id = req.params.id;
  const details = await mongodb.detailedProductDetails(id);
  if (details) {
    res.json(details);
  } else {
    res.statusCode = 404;
    res.end();
  }
});
const ProductRoute = router;
export default ProductRoute;
