const hashPassword = require("../../utils/hashPassword");
const STATUS = require("../../constants/status");

const {
  updateUserDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class UpdateUserController {
  async update(req, res, next) {
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
        throw new AppError("User not found", STATUS.NOT_FOUND
        );
      }

      return res.status(STATUS.OK).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
      }
    }
  }

module.exports = UpdateUserController;