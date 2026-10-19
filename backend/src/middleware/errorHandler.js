export function errorHandler(error, _req, res, _next) {
  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || "field";
    return res.status(409).json({ message: `That ${field} is already in use.` });
  }
  console.error(error);
  res.status(500).json({ message: "Something went wrong on the server." });
}
