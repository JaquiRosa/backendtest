const {
  findAllUsersDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

const STATUS = require("../../constants/status");
const AppError = require("../../errors/app-error");

class GetUserController {
  async list(req, res, next) {
    try {
      const users = await findAllUsersDb();

      return res.status(STATUS.OK).json(users);
    } catch (error) {
      next(new AppError("Error fetching users", STATUS.INTERNAL_SERVER_ERROR));
    }
  }
}

module.exports = GetUserController;
