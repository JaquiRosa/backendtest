function validateCreateTask(req, res, next) {
  const { title } = req.body;

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

module.exports = validateCreateTask;