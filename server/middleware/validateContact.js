const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function checkContact(body) {
  const b = body && typeof body === "object" ? body : {};
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const errors = {};
  if (name.length < 2 || name.length > 100) errors.name = "Name must be 2 to 100 characters.";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Enter a valid email address.";
  if (message.length < 10 || message.length > 5000) errors.message = "Message must be 10 to 5000 characters.";
  return { errors, value: { name, email, message } };
}

export function validateContact(req, res, next) {
  const { errors, value } = checkContact(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: Object.values(errors)[0], errors });
  }
  req.contact = value;
  next();
}
