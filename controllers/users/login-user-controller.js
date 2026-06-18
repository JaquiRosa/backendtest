const comparePassword = require("../../utils/comparePassword");
const generateToken = require("../../utils/generateToken");
const STATUS = require("../../constants/status");

const {
  findUserByEmailDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class LoginUserController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError("Email and password are required", STATUS.BAD_REQUEST);
      }

      const user = await findUserByEmailDb({ email });

      if (!user) {
        throw new AppError("Invalid credentials", STATUS.UNAUTHORIZED);
      }

      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        throw new AppError("Invalid credentials", STATUS.UNAUTHORIZED);
      }

      const token = generateToken(user.id);

      return res.status(STATUS.OK).json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginUserController;