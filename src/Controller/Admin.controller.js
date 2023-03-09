import { ObjectId } from "mongodb";
import { renameSync, unlinkSync } from "fs";
import mongodb from "../Services/Monogodb.services.js";

export const addProduct = async (req, res) => {
  const obj = new ObjectId();
  req.body._id = obj;
  const main_image = req.files["main_image"][0];
  const other_image = req.files["other_image"];
  try {
    renameSync(
      main_image.path,
      "./ProductImages/" + obj.toHexString() + ".png"
    );
    other_image.forEach((value, index) => {
      renameSync(
        value.path,
        "./ProductImages/" + obj.toHexString() + "_" + index + "_" + ".png"
      );
    });
    await mongodb.addProduct(req.body, other_image.length);
    res.statusCode = 201;
    res.send("ok");
  } catch (err) {
    try {
      unlinkSync("./ProductImages/" + obj.toHexString() + ".png");
    } catch (err) {
      console.log("Rolling back main_image : " + err);
    }
    other_image.forEach((value, index) => {
      try {
        unlinkSync(
          "./ProductImages/" + obj.toHexString() + "_" + index + "_" + ".png"
        );
      } catch (err) {
        console.log("Rolling back Other_images : " + err);
      }
    });
    console.log(err);
    res.statusCode = 500;
    res.statusMessage = err;
    res.end()
  }
};
