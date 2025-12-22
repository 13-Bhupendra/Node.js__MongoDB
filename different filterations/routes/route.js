import express from "express";
import {
  post,
  fetchAllData,
  getSingleData,
  searchByName,
  searchByBrand,
  multiFieldSearch,
  getByCategory,
  filterByPriceRange,
  filterByRating,
  sortByPrice,
} from "../controller/controller.js";

const router = express.Router();

router.post("/product/add", post);
router.get("/products/get", fetchAllData);

router.get("/search/name", searchByName);
router.get("/search/brand", searchByBrand);
router.get("/search/multi", multiFieldSearch);

router.get("/filter/category", getByCategory);
router.get("/filter/price", filterByPriceRange);
router.get("/filter/rating", filterByRating);

router.get("/sort/price", sortByPrice);

export default router;
