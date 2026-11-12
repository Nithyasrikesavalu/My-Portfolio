export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Not found." });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body." });
  }
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: "Something went wrong on the server." });
}
