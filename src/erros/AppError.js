class AppError extends Error {
  constructor(message, statusCode = 500, name = "AppError", details = null) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.details = details;
    this.isOperational = true; // Identify expected errors
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
