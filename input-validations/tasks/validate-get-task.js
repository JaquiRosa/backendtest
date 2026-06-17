function validateGetTask(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Task id is required",
    });
  }

  next();
}

module.exports = validateGetTask;