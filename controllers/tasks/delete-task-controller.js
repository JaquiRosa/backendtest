const {
  deleteTaskDb,
} = require("../../database/models/funcionalidades/task-model-funcionalidades");

class DeleteTaskController {
  async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedTask = await deleteTaskDb({ id });

      if (!deletedTask) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting task:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = DeleteTaskController;