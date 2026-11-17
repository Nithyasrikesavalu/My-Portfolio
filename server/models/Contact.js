import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
    emailDelivered: { type: Boolean, default: false },
    resendId: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
