const {
  findAllTasksDb,
} = require("../../database/models/funcionalidades/task-model-funcionalidades");

class GetTaskController {
  async list(req, res) {
    try {
      const tasks = await findAllTasksDb();

      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = GetTaskController;