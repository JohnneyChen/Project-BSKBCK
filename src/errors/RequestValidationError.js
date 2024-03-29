class RequestValidationError extends Error {
  constructor(errs) {
    super();
    this.errors = errs.map((err) => {
      return { message: err.msg, field: err.param };
    });

    this.statusCode = 400;
  }
}

module.exports = RequestValidationError;
