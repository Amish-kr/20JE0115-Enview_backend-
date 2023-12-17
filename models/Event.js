import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  location_type: {
    type: String,
    required: true,
  },
  is_overspeeding: {
    type: Boolean,
    default: false,
  },
  vehicle_id: {
    type: String,
    default: "000000000",
    required: true,
  },
});

export default mongoose.model("Event_info", EventSchema);
