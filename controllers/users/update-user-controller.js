const hashPassword = require("../../utils/hashPassword");

const {
  updateUserDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class UpdateUserController {
  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const hashedPassword = await hashPassword(password);

      const user = await updateUserDb({
        id,
        email,
        password: hashedPassword,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.error("Error updating user:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = UpdateUserController;