const {Router} = require("express");
const router = Router();


const validateLoginUser = require("../input-validations/user/validate-login-user");
const validateCreateUser = require("../input-validations/user/validate-create-user");
const validateGetUser = require("../input-validations/user/validate-get-user");
const validateUpdateUser = require("../input-validations/user/validate-update-user");
const validateDeleteUser = require("../input-validations/user/validate-delete-user");

const LoginUserController = require("../controllers/users/login-user-controller");
const CreateUserController = require("../controllers/users/create-user-controller");
const GetUserController = require("../controllers/users/get-user-controller");
const GetUserByIdController = require("../controllers/users/get-user-by-id-controller");
const UpdateUserController = require("../controllers/users/update-user-controller");
const DeleteUserController = require("../controllers/users/delete-user-controller");

const authenticateToken = require("../utils/authenticateToken");

const loginUserController = new LoginUserController();
const createUserController = new CreateUserController();
const getUserController = new GetUserController();
const getUserByIdController = new GetUserByIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();


router.post("/login", validateLoginUser, (req, res) => {
  return loginUserController.login(req, res);
});

router.post("/users", validateCreateUser, (req, res) => {
  return createUserController.create(req, res);
});

router.get("/users", authenticateToken, (req, res) => {
  return getUserController.list(req, res);
});

router.get("/users/:id", authenticateToken, validateGetUser, (req, res) => {
  return getUserByIdController.get(req, res);
});

router.put("/users/:id", authenticateToken, validateUpdateUser, (req, res) => {
  return updateUserController.update(req, res);
});

router.delete("/users/:id", authenticateToken, validateDeleteUser, (req, res) => {
  return deleteUserController.delete(req, res);
});

module.exports = router;