// models/complaint.js
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Academic", "Hostel", "Administration", "Other"],
    default: "Other",
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Rejected"],
    default: "Pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // only Admin will be referenced
  },
  resolutionNote: {
    type: String,
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
