import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  listCategory,
  listSubcategoryByCategory,
} from "../controllers/productController.js";

import multer from "multer";

const productRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProduct);
productRouter.get("/listcategory", listCategory);
productRouter.get("/subcategory/:category", listSubcategoryByCategory);
productRouter.delete("/remove/:id", removeProduct);

export default productRouter;
