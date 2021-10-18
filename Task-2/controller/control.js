let categories = [
    { id: 1, title: "Romance", createdDate: new Date() },
    { id: 2, title: "Horror", createdDate: new Date() },
    { id: 3, title: "Fiction", createdDate: new Date() },
    { id: 4, title: "Biography", createdDate: new Date() }
];

let addCategories = (request, response) => {
    //took keys from request.body
    const properties = Object.keys(request.body);
    //checked whether the body is empty or not.
    if (properties.length < 1) {
        return response.status(400).send("Body cannot be empty");
    }
    //checked whether the id is already used
    const category = categories.find(
        (category) => request.body.id == category.id
    );

    if (category) {
        return response.status(400).send("ID already in use.");
    }
    // added current date
    request.body.createdDate = new Date();
    //category added in array
    categories.push(request.body);
    response.status(201).send(categories);
};

let readCategories = (request, response) => {
    response.send(categories);
};

let readCategory = (request, response) => {
    //checked whether id exists or not
    const category = categories.find(
        (category) => request.params.id == category.id
    );
    if (!category) {
        response.status(404).send("Category not found");
    }

    response.send(category);
};

let updateCategory = (request, response) => {
    const allowedProperties = ["title"];
    const properties = Object.keys(request.body);
    //filtered properties
    const isValid = properties.every((property) =>
        allowedProperties.includes(property)
    );
    //checked whether body is empty or not and checked whether the properties are valid inputs.
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
};

let deleteCategory = (request, response) => {
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
};

module.exports = {
    addCategories,
    readCategories,
    readCategory,
    updateCategory,
    deleteCategory,
    categories
};
