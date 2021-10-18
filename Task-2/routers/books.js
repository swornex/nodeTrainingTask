const express = require("express");

//imported from category
const { categories } = require("../controller/control");

const router = express.Router();

// array of books
let books = [
    {
        id: 1,
        title: "Seto dharti",
        description: "It's about widow's life.",
        categoryId: 3,
        author: "Amar Neupane",
        createdDate: new Date()
    },
    {
        id: 2,
        title: "Half-Girlfriend",
        description: "It's a quest of winning love.",
        categoryId: 1,
        author: "Chetan Bhagat",
        createdDate: new Date()
    }
];

//created books
router.post("/books", (request, response) => {
    //checked whther the id has been used.
    const book = books.find((book) => {
        return request.body.id == book.id;
    });

    if (book) {
        return response.status(400).send("Id already in use.");
    }
    // checked whther the category id exist
    const category = categories.find(
        (category) => request.body.categoryId == category.id
    );

    if (!category) {
        return response.status(404).send("Category Id not found");
    }

    request.body.createdDate = new Date();
    //added book in array
    books.push(request.body);
    response.status(201).send(books);
});

//read all books
router.get("/books", (request, response) => {
    response.send(books);
});

//read books by id
router.get("/books/:id", (request, response) => {
    const book = books.find((book) => request.params.id == book.id);
    if (!book) {
        return response.status(404).send("Books Id not found");
    }
    response.send(book);
});

//read books by categoryid
router.get("/book/:categoryId", (request, response) => {
    const bookCategory = books.filter((book) => {
        return request.params.categoryId == book.categoryId;
    });
    response.send(bookCategory);
});

//update book
router.patch("/books/:id", (request, response) => {
    const allowedProperties = ["title", "description", "categoryId", "author"];
    const properties = Object.keys(request.body);
    //filtered property
    const isValid = properties.every((property) =>
        allowedProperties.includes(property)
    );
    //checked whether body is empty or not and checked whether the properties are valid inputs.
    if (!isValid || properties.length != 4) {
        return response.status(400).send("Insufficient values");
    }
    const index = books.findIndex((book) => {
        return request.params.id == book.id;
    });
    if (index < 0) {
        return response.status(404).send("Id not found");
    }
    //checked whether the category exist or not
    const category = categories.find(
        (category) => request.body.categoryId == category.id
    );

    if (!category) {
        return response.status(404).send("Category Id not found");
    }
    //updated values
    books[index].title = request.body.title;
    books[index].description = request.body.description;
    books[index].categoryId = request.body.categoryId;
    books[index].author = request.body.author;
    response.send(books[index]);
});

//delete book by id
router.delete("/books/:id", (request, response) => {
    try {
        const index = books.findIndex((book) => {
            return request.params.id == book.id;
        });
        if (index < 0) {
            return response.status(404).send("Id not found");
        }
        const deletedBook = books.splice(index, 1)[0];
        response.send(deletedBook);
    } catch (error) {
        response.status(500).send();
    }
});

//exported router
module.exports = router;
