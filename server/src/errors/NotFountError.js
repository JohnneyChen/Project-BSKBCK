class NotFoundError extends Error {
  constructor(type) {
    super();
    if (type === "route") {
      this.errors = [{ message: "Route not found" }];
    }

    if (type === "record") {
      this.errors = [{ message: "Record not found" }];
    }

    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
