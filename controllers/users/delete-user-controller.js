const AppError = require("../../errors/app-error");
const STATUS = require("../../constants/status");

const {
  deleteUserDb,
} = require("../../database/models/funcionalidades/user-model-funcionalidades");

class DeleteUserController {
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const deletedUser = await deleteUserDb({ id });

      if (!deletedUser) {
        throw new AppError("User not found", STATUS.NOT_FOUND);
      }

      return res.status(STATUS.OK).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DeleteUserController;