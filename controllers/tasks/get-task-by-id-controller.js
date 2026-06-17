const {
  findTaskByIdDb,
} = require("../../database/models/funcionalidades/task-model-funcionalidades");

class GetTaskByIdController {
  async get(req, res) {
    try {
      const { id } = req.params;

      const task = await findTaskByIdDb({ id });

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
  }
}

module.exports = GetTaskByIdController;