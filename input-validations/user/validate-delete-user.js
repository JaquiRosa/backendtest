function validateDeleteUser(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "User id is required",
    });
  }

  next();
}

module.exports = validateDeleteUser;