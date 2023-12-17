import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  id: String,
  timestamp: { type: Date, default: Date.now },
  location_type: String,
  message: String,
});

export default mongoose.model("Alert_info", AlertSchema);
