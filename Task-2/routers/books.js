const express = require("express");

const controller = require("../controller/controlBooks");
const router = express.Router();

//created books
router.post("/books", controller.addBooks);

//read all books
router.get("/books", controller.readBooks);

//read books by id
router.get("/books/:id", controller.readBook);

//read books by categoryid
router.get("/book/:categoryId", controller.readBookByCategory);

//update book
router.patch("/books/:id", controller.updateBook);

//delete book by id
router.delete("/books/:id", controller.deletedBook);

//exported router
module.exports = router;
