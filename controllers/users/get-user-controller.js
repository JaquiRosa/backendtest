const {
  findAllUsersDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class GetUserController {
  async list(req, res) {
    try {
      const users = await findAllUsersDb();

      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = GetUserController;