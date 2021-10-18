const express = require("express");
const controller = require("../controller/controlCategories");
const router = express.Router();

//Create category
router.post("/categories", controller.addCategories);

//displayed or read all categories
router.get("/categories", controller.readCategories);

//displayed categories using id
router.get("/categories/:id", controller.readCategory);

//updated category
router.patch("/categories/:id", controller.updateCategory);

//deleted category using id
router.delete("/categories/:id", controller.deleteCategory);

//exported router and category
module.exports = router;
