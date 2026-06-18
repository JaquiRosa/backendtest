const express = require("express");
const cors = require("cors");


const routers = require("./routers");
const errorHandler = require("./middlewares/error-handle");

const app = express();

app.use(cors());
app.use(express.json());

routers.forEach((router) => app.use(router));

app.use(errorHandler);

module.exports = app;