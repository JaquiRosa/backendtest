const {
  createTaskDb,
} = require("../../database/models/funcionalidades/task-model-funcionalidades");

class CreateTaskController {
  async create(req, res) {
    try {
      const { title, description } = req.body;

      const task = await createTaskDb({
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
  }
}

module.exports = CreateTaskController;