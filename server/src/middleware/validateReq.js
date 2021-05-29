const { validationResult } = require("express-validator");

const RequestValidationError = require("../errors/RequestValidationError");

const validateReq = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.errors);
  }

  next();
};

module.exports = validateReq;
