function validateUpdateTask(req, res, next) {
  const { id } = req.params;
  const { title } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Task id is required",
    });
  }

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (title.length > 255) {
    return res.status(400).json({
      message: "The title is too long. Maximum length is 255 characters",
    });
  }

  next();
}

module.exports = validateUpdateTask;