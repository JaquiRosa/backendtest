const Task = require("../definitions/task");

async function createTaskDb({ title, description }) {
  const task = await Task.create({
    title,
    description,
  });

  return task;
}

async function findAllTasksDb() {
  const tasks = await Task.findAll();

  return tasks;
}

async function findTaskByIdDb({ id }) {
  const task = await Task.findByPk(id);

  return task;
}

async function updateTaskDb({ id, title, description }) {
  const task = await Task.findByPk(id);

  if (!task) {
    return null;
  }

  task.title = title;
  task.description = description;

  await task.save();

  return task;
}

async function deleteTaskDb({ id }) {
  const task = await Task.findByPk(id);

  if (!task) {
    return null;
  }

  await task.destroy();

  return true;
}

module.exports = {
  createTaskDb,
  findAllTasksDb,
  findTaskByIdDb,
  updateTaskDb,
  deleteTaskDb,
};