const express = require("express");

const router = express.Router();

let categories = [
    { id: 1, title: "Romance", createdDate: new Date() },
    { id: 2, title: "Horror", createdDate: new Date() }
];

router.post("/categories", (request, response) => {
    const properties = Object.keys(request.body);
    if (properties.length < 1) {
        return response.status(400).send("Body cannot be empty");
    }

    const category = categories.find(
        (category) => request.body.id == category.id
    );

    if (category) {
        return response.status(400).send("ID already in use.");
    }

    request.body.createdDate = new Date();
    categories.push(request.body);
    response.status(201).send(categories);
});

router.get("/categories", (request, response) => {
    response.send(categories);
});

router.get("/categories/:id", (request, response) => {
    const category = categories.find(
        (category) => request.params.id == category.id
    );
    if (!category) {
        response.status(404).send("Category not found");
    }

    response.send(category);
});

router.patch("/categories/:id", (request, response) => {
    const allowedProperties = ["title"];
    const properties = Object.keys(request.body);
    const isValid = properties.every((property) =>
        allowedProperties.includes(property)
    );
    if (!isValid || properties.length <= 0) {
        return response.status(400).send("Invalid Input.");
    }

    const index = categories.findIndex(
        (category) => request.params.id == category.id
    );
    if (index < 0) {
        return response.status(404).send({ error: "ID not found!" });
    }

    categories[index].title = request.body.title;
    response.send(categories[index]);
});

router.delete("/categories/:id", (request, response) => {
    try {
        const index = categories.findIndex(
            (category) => request.params.id == category.id
        );
        if (index < 0) {
            response.status(404).send("Category not found");
        }

        const deleteCategory = categories.splice(index, 1)[0];
        response.send(deleteCategory);
    } catch (error) {
        response.status(500).send();
    }
});

module.exports = router;
