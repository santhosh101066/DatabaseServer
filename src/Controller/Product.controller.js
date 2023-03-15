import mongodb from "../Services/Monogodb.services.js";

export const basicProductController = async (req, res) => {
  const category = req.params.category;
  const details = await mongodb.basicProductDetails(category);
  if (details.length > 0) {
    res.json(details);
  } else {
    res.statusCode = 404;
    res.end();
  }
};

export const detailedProductView = async (req, res) => {
  const id = req.params.id;
  try {
    const details = await mongodb.detailedProductDetails(id);
    if (details) {
      res.json(details);
    } else {
      res.statusCode = 404;
      res.end();
    }
  } catch (err) {
    res.statusCode = 404;
    res.end();
  }
};

export const searchEngine = async (req, res) => {
  const value = req.params.find;
  console.log(value);
  const data = await mongodb.search(value);
  console.log(data);
  res.json(data);
};
