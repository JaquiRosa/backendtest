const express = require("express");
const cors = require("cors");


const userRouter = require("./routers/user-router");
const taskRouter = require("./routers/task-router");
const healthcheckRouter = require("./routers/healthcheck-router");
const errorHandler = require("./middlewares/error-handle");

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use(healthcheckRouter);

app.use(errorHandler);

module.exports = app;