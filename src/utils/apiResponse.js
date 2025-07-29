import { StatusCodes } from "http-status-codes";

const successResponse = (res, data, message = "Success", statusCode = StatusCodes.OK) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    statusCode
  });
};

const errorResponse = (res, message = "Error", statusCode = StatusCodes.INTERNAL_SERVER_ERROR, name = null, details = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    name,
    details,
    statusCode
  });
};

export { errorResponse, successResponse };