const {
  findUserByIdWithoutPasswordDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

const STATUS = require("../../constants/status");

class GetUserByIdController {
  async get(req, res, next) {
    try {
      const { id } = req.params;

      const user = await findUserByIdWithoutPasswordDb({ id });

      if (!user) {
        throw new AppError("User not found", STATUS.NOT_FOUND);
      }

      return res.status(STATUS.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GetUserByIdController;
