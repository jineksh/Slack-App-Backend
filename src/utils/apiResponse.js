const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message = "Error", statusCode = 500, name = null, details = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    name,
    details,
  });
};

export { errorResponse,successResponse };
