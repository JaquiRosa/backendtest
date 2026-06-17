const {
  updateTaskDb,
} = require("../../database/models/funcionalidades/task-model-funcionalidades");

class UpdateTaskController {
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const task = await updateTaskDb({
        id,
        title,
        description,
      });

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      return res.status(200).json(task);
    } catch (error) {
      console.error("Error updating task:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = UpdateTaskController;