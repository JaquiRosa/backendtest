const express = require("express");
const sequelize = require("./database/sequelize");
const Task = require("./database/models/task");
const User = require("./database/models/user");
const cors = require("cors");
// Importa os models antes do sync
require("./database/models/task");
require("./database/models/user");

const app = express();

app.use(cors()); // libera todas as origens

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(express.json());

//--------------------------USERS--------------------

app.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }
    const user = await User.create({
      email,
      password,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    user.email = email;
    user.password = password;
    await user.save();
    return res.status(200).json(user);

  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/users/:id", async (req, res)=>{
try {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    await user.destroy();
    return res.status(204).send();
} catch (error) {
    console.error("Erro ao deletar usuário", error);
    return res.status(500).json({ message: "Internal Server Error"});
}
});

//--------------------- TASKS-------------------
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    //  Condição para verificar que o title tem mais que 255 caracteres
    if (title.length > 255) {
      return res.status(400).json({
        message: "The title is too long. Maximum length is 255 characters",
      });
    }

    const task = await Task.create({
      title,
      description,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    task.title = title;
    task.description = description;
    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    console.error("Erro ao atualizar tarefa", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar tarefa", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// CHECKAGEM DO BACKEND

app.get("/healthcheck", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Application is running",
  });
});

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
