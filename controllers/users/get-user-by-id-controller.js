const {
  findUserByIdWithoutPasswordDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class GetUserByIdController {
  async get(req, res) {
    try {
      const { id } = req.params;

      const user = await findUserByIdWithoutPasswordDb({ id });

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
  }
}

module.exports = GetUserByIdController;