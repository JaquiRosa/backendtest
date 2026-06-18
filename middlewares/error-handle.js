const STATUS = require("../constants/status");

function errorHandler(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error";

    return res.status(statusCode).json({
        message,
    });
}

module.exports = errorHandler;