const express = require("express");
const { allowedNodeEnvironmentFlags } = require("process");
const app = express();

const router = require("./routers/categories");

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`The server is on ${port}.`);
});
