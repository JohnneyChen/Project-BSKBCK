const { validateRequest } = require("express-validator");

const RequestValidationError = require("../errors/RequestValidationError");

const validateRequest = (req, res, next) => {
  const errors = validateRequest(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors);
  }

  next();
};
