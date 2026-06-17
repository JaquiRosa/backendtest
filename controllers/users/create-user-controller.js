const hashPassword = require("../../utils/hashPassword");

const {
  createUserDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class CreateUserController {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const hashedPassword = await hashPassword(password);

      const user = await createUserDb({
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.error("Error creating user:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = CreateUserController;