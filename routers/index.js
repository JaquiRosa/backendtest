const userRouter = require("./user-router");
const taskRouter = require("./task-router");
const healthcheckRouter = require("./healthcheck-router");

module.exports = [userRouter, taskRouter, healthcheckRouter];
