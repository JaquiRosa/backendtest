const { Router } = require("express");

const HealthcheckController = require("../controllers/healthcheck/healthcheck");

const router = Router();

const healthcheckController = new HealthcheckController();

router.get("/healthcheck", (req, res, next) => {
  return healthcheckController.check(req, res, next);
});

module.exports = router;