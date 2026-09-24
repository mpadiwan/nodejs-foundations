const { sendError } = require("./errorHandler");

function validateNoteBody(req, res, next) {
  const { title, content, tag } = req.body || {};

  if (typeof title !== "string" || title.trim() === "") {
    return sendError(res, 400, "title is required");
  }
  if (typeof content !== "string" || content.trim() === "") {
    return sendError(res, 400, "content is required");
  }
  if (tag !== undefined && typeof tag !== "string") {
    return sendError(res, 400, "tag must be a string");
  }

  next();
}

function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return sendError(res, 400, "id must be an integer");
  }

  req.noteId = id;
  next();
}

module.exports = { validateNoteBody, validateIdParam };
