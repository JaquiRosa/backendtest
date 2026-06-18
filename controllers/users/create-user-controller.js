const AppError = require("../../errors/app-error");
const STATUS = require("../../constants/status");
const hashPassword = require("../../utils/hashPassword");

const {
  createUserDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class CreateUserController {
  async create(req, res, next) {
    try {
      const { email, password } = req.body;

      const hashedPassword = await hashPassword(password);

      const user = await createUserDb({
        email,
        password: hashedPassword,
      });

      return res.status(STATUS.CREATED).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(new AppError("Error creating user", STATUS.INTERNAL_SERVER_ERROR));
    }
  }
}
module.exports = CreateUserController;
