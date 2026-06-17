const express = require("express");
const cors = require("cors");

const sequelize = require("./database/sequelize");

const userRouter = require("./routers/user-router");
const taskRouter = require("./routers/task-router");

// Importa os models antes do sync
require("./database/models/definitions/task");
require("./database/models/definitions/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const PORT = process.env.PORT || 3000;

// -------------------------- HEALTHCHECK --------------------

app.get("/healthcheck", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Application is running",
  });
});

// -------------------------- START SERVER --------------------

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully");

    await sequelize.sync();

    console.log("Database synchronized successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
