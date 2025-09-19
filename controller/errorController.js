function globalErrorHandler(err, req, res, next) {
  const status = err.status;
  const statusCode = err.statusCode;
  return res.status(statusCode).json({
    status: status,
    message: err.message,
  });
}
module.exports = globalErrorHandler;
