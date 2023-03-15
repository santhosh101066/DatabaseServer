import mongodb from "../Services/Monogodb.services.js";

export const userCartCount = async (req, res) => {
  const length = (
    await (await mongodb.cartcount(res.locals.auth.uid)).toArray()
  )[0];
  length ? res.json({ length: length.countall }) : res.json({ length: 0 });
};

export const userGetCart = async (req, res) => {
  const [p_id, user_id] = [req.params.id, res.locals.auth.uid];
  const data = await mongodb.checkCart(p_id, user_id);
  res.json(data);
};

export const userAddtoCart = async (req, res) => {
  const data = req.body;
  try {
    await mongodb.addToCart(data.p_id, res.locals.auth.uid, data.quantity);
    res.statusCode = 201;
    res.end();
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.end();
  }
};

export const userSingleCartDelete = async (req, res) => {
  try {
    await mongodb.deleteCart(req.params.id, res.locals.auth.uid);
    res.statusCode = 200;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

export const userGetWishlist = async (req, res) => {
  const [p_id, user_id] = [req.params.id, res.locals.auth.uid];
  try {
    const data = await mongodb.getWishlist(p_id, user_id);
    res.json(data);
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

export const userAddWishlist = async (req, res) => {
  try {
    const data = req.body;
    await mongodb.addWishlist(data.p_id, res.locals.auth.uid);
    res.statusCode = 201;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

export const userDeleteWishlist = async (req, res) => {
  try {
    await mongodb.deleteWishlist(req.params.id, res.locals.auth.uid);
    res.statusCode = 200;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
  }
};

export const userCart = async (req, res) => {
  try {
    const data = await mongodb.userCart(res.locals.auth.uid);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send(err);
  }
};

export const userCartQuantity = async (req, res) => {
  console.log(req.body.type);
  try {
    await mongodb.userCartQuantityChanger(req.params.id, req.body.type);
    res.statusCode = 201;
    res.end();
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send(err);
  }
};

export const userWishlist = async (req, res) => {
  try {
    const data = await mongodb.userWishlist(res.locals.auth.uid);
    res.json(data);
  } catch (err) {
    res.statusCode = 500;
    res.send(err);
  }
};
