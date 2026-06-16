const deleteUserModel = require("../../database/models/funcionalidades/user-model-functionalidades");
export class DeleteUserController {
  async delete(id) {
    const foundUser = await getUserByIdDb({ id });
    if (!foundUser) {
      throw new Error("User not found");
    }
    await deleteUserModel({ id });
    return true;
  }
}
