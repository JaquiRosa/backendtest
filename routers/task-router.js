const {Router} = require("express");
const router = Router();

const validateCreateTask = require("../input-validations/tasks/validate-create-task");
const validateGetTask = require("../input-validations/tasks/validate-get-task");
const validateUpdateTask = require("../input-validations/tasks/validate-update-task");
const validateDeleteTask = require("../input-validations/tasks/validate-delete-task");

const CreateTaskController = require("../controllers/tasks/create-task-controller");
const GetTaskController = require("../controllers/tasks/get-task-controller");
const GetTaskByIdController = require("../controllers/tasks/get-task-by-id-controller");
const UpdateTaskController = require("../controllers/tasks/update-task-controller");
const DeleteTaskController = require("../controllers/tasks/delete-task-controller");

const createTaskController = new CreateTaskController();
const getTaskController = new GetTaskController();
const getTaskByIdController = new GetTaskByIdController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

router.post("/tasks", validateCreateTask, (req, res) => {
  return createTaskController.create(req, res);
});

router.get("/tasks", (req, res) => {
  return getTaskController.list(req, res);
});

router.get("/tasks/:id", validateGetTask, (req, res) => {
  return getTaskByIdController.get(req, res);
});

router.put("/tasks/:id", validateUpdateTask, (req, res) => {
  return updateTaskController.update(req, res);
});

router.delete("/tasks/:id", validateDeleteTask, (req, res) => {
  return deleteTaskController.delete(req, res);
});

module.exports = router;