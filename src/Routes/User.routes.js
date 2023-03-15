import { Router } from "express";
import { UserAuth } from "../Middleware/UserAuth.middleware.js";
import {
  userAddWishlist,
  userAddtoCart,
  userCart,
  userCartCount,
  userCartQuantity,
  userDeleteWishlist,
  userGetCart,
  userGetWishlist,
  userSingleCartDelete,
  userWishlist,
} from "../Controller/User.controller.js";

const router = Router();
router.get("/cartcount", UserAuth, userCartCount);
router.get("/cart/:id", UserAuth, userGetCart);
router.get("/cart", UserAuth, userCart);
router.put("/cart/:id", UserAuth, userCartQuantity);
router.post("/addtocart", UserAuth, userAddtoCart);
router.delete("/cart/:id", UserAuth, userSingleCartDelete);
router.get("/wishlist/:id", UserAuth, userGetWishlist);
router.post("/wishlist", UserAuth, userAddWishlist);
router.delete("/wishlist/:id", UserAuth, userDeleteWishlist);
router.get('/wishlistpage',UserAuth,userWishlist)

const UserRoute = router;
export default UserRoute;
