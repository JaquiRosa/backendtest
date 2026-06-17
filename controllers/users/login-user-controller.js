const comparePassword = require("../../utils/comparePassword");
const generateToken = require("../../utils/generateToken");

const {
  findUserByEmailDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class LoginUserController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const user = await findUserByEmailDb({ email });

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = generateToken(user.id);

      return res.status(200).json({
        token,
      });
    } catch (error) {
      console.error("Error logging in user:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = LoginUserController;