function sendError(res, status, message) {
  res.status(status).json({ error: { status, message } });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.statusCode || err.status || 500;
  const message = status < 500 ? err.message : "Internal server error";

  sendError(res, status, message);
}

module.exports = { errorHandler, sendError };
