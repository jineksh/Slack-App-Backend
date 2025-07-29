import { StatusCodes } from 'http-status-codes';

import AppError from "../erros/AppError.js";
import { errorResponse } from '../utils/apiResponse.js';

const globalErrorHandler = (err, req, res) => {
  console.error("Error:", err);

  //  Custom AppError
  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode, err.name, err.details);
  }

  //  Mongoose Validation Error
  if (err.name === "ValidationError") {
    const details = Object.fromEntries(
      Object.entries(err.errors).map(([field, error]) => [field, error.message])
    );
    return errorResponse(res, "Validation failed", StatusCodes.BAD_REQUEST, err.name, details);
  }

  // Mongo Duplicate Key Error
  if (err.code === 11000) {
    return errorResponse(
      res,
      "Duplicate field value entered",
      StatusCodes.CONFLICT,
      "DuplicateKeyError",
      err.keyValue
    );
  }

  //  JWT Error
  if (err.name === "JsonWebTokenError") {
    return errorResponse(res, "Invalid token", StatusCodes.UNAUTHORIZED, err.name);
  }

  if (err.name === "TokenExpiredError") {
    return errorResponse(res, "Token expired", StatusCodes.UNAUTHORIZED, err.name);
  }

  //  Fallback (unexpected error)
  return errorResponse(res, "Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR, err.name || "UnknownError");
 
};

export default globalErrorHandler;