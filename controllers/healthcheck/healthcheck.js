
const STATUS = require("../../constants/status");

class HealthCheckController {
  async check(req, res) {
    return res.status(STATUS.OK).json({
      message: "Server is running",
    });
  }
}

module.exports = HealthCheckController;