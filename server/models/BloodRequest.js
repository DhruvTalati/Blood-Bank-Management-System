const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
      trim: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    patientAge: {
      type: Number,
      required: true,
      min: 0,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    units: {
      type: Number,
      required: true,
      min: 1,
    },

    urgency: {
      type: String,
      enum: ["Normal", "Urgent", "Critical"],
      default: "Normal",
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    approvedAt: {
      type: Date,
    },

    rejectedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
