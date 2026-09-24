function sendError(res, status, message) {
  res.status(status).json({ error: { status, message } });
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;

  if (status >= 500) {
    console.error(err);
  }

  const message = status < 500 ? err.message : "Internal server error";

  sendError(res, status, message);
}

module.exports = { errorHandler, sendError };
