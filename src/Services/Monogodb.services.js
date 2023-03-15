import { MongoClient, ObjectId } from "mongodb";
class MongoDB {
  async addProduct(data, filesCount) {
    return this.db.collection("product").insertOne({
      ...data,
      filesCount,
    });
  }

  async addWishlist(p_id, user_id) {
    if (!(await this.db.collection("wishlist").findOne({ p_id, user_id }))) {
      return await this.db.collection("wishlist").insertOne({ p_id, user_id });
    } else {
      throw new Error("Already Exist");
    }
  }

  async addToCart(p_id, user_id, quantity) {
    if (!(await this.db.collection("cart").findOne({ p_id, user_id }))) {
      return await this.db
        .collection("cart")
        .insertOne({ p_id, user_id, quantity });
    } else {
      throw new Error("Already Exist");
    }
  }

  async editProduct(data) {
    const _id = new ObjectId(data.id);
    delete data.id;
    console.log(data);
    await this.db
      .collection("product")
      .updateOne({ _id }, { $set: { ...data } });
  }

  async basicProductDetails(category) {
    return await this.db
      .collection("product")
      .find(
        { category },
        {
          projection: {
            id: { $toString: "$_id" },
            title: "$short_title",
            price: 1,
            _id: 0,
          },
        }
      )
      .toArray();
  }

  async cartcount(id) {
    return this.db
      .collection("cart")
      .aggregate([{ $match: { user_id: id } }, { $count: "countall" }]);
  }

  async checkCart(p_id, user_id) {
    return await this.db.collection("cart").findOne(
      { p_id, user_id },
      {
        projection: {
          id: { $toString: "$_id" },
          p_id: 1,
          user_id: 1,
          quantity: 1,
          _id: 0,
        },
      }
    );
  }

  async connect(baseUrl) {
    try {
      this.client = new MongoClient(baseUrl);
      await this.client.connect();
      this.db = this.client.db("project");
      console.log("Database Connected Successful");
      return true;
    } catch (e) {
      console.log("BD ERROR: " + e);
      return false;
    }
  }

  async deleteCart(p_id, user_id) {
    return await this.db.collection("cart").deleteOne({ p_id, user_id });
  }

  async deleteWishlist(p_id, user_id) {
    return await this.db.collection("wishlist").deleteOne({ p_id, user_id });
  }

  async detailedProductDetails(id) {
    return await this.db.collection("product").findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          id: { $toString: "$_id" },
          title: 1,
          quantity: 1,
          more_details: 1,
          category: 1,
          price: 1,
          filesCount: 1,
          _id: 0,
          short_title: 1,
        },
      }
    );
  }

  async getWishlist(p_id, user_id) {
    return await this.db.collection("wishlist").findOne({ p_id, user_id });
  }

  async login(email) {
    return await this.db.collection("user").findOne({ email });
  }

  async register(data) {
    return await this.db.collection("user").insertOne(data);
  }

  async search(data) {
    return await this.db
      .collection("product")
      .find(
        { title: { $regex: data, $options: "i" } },
        {
          projection: {
            id: { $toString: "$_id" },
            short_title: 1,
            _id: 0,
            price: 1,
          },
        }
      )
      .toArray();
  }

  async userCart(user_id) {
    return await this.db
      .collection("cart")
      .aggregate([
        {
          $match: {
            user_id,
          },
        },
        {
          $addFields: {
            p_ids: { $toObjectId: "$p_id" },
          },
        },
        {
          $lookup: {
            from: "product",
            localField: "p_ids",
            foreignField: "_id",
            as: "carts",
          },
        },
        { $unwind: "$carts" },
        {
          $project: {
            _id: 0,
            id: "$p_id",
            cart_id: { $toString: "$_id" },
            title: "$carts.title",
            maxQty: "$carts.quantity",
            quantity: 1,
            price: "$carts.price",
          },
        },
      ])
      .toArray();
  }
  async userCartQuantityChanger(id, type) {
    switch (type) {
      case "INC":
        return await this.db.collection("cart").updateOne(
          {
            _id: new ObjectId(id),
          },
          { $inc: { quantity: 1 } }
        );
      case "DEC":
        return await this.db.collection("cart").updateOne(
          {
            _id: new ObjectId(id),
          },
          { $inc: { quantity: -1 } }
        );
      default:
        throw new Error("Type must be INC or DEC");
    }
  }
  async userWishlist(user_id) {
    return await this.db
      .collection("wishlist")
      .aggregate([
        {
          $match: {
            user_id,
          },
        },
        {
          $addFields: {
            p_ids: { $toObjectId: "$p_id" },
          },
        },
        {
          $lookup: {
            from: "product",
            localField: "p_ids",
            foreignField: "_id",
            as: "carts",
          },
        },
        { $unwind: "$carts" },
        {
          $project: {
            _id: 0,
            id: "$p_id",
            wish_id: { $toString: "$_id" },
            title: "$carts.title",
            quantity: "$carts.quantity",
            price: "$carts.price",
          },
        },
      ])
      .toArray();
  }
}

const mongodb = new MongoDB();
export default mongodb;
