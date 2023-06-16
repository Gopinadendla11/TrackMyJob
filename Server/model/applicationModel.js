const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicationModelSchema = new Schema(
  {
    companyName: { type: String, required: true },
    jobRole: { type: String, required: true },
    jobDesc: { type: String },
    jobPortal: { type: String },
    jobLink: { type: String, required: true },
    refDetails: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: [
        "Applied",
        "Online Assessment",
        "Interview",
        "Rejected",
        "Selected",
      ],
      default: "Applied",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.Now },
  },
  { collection: "applications" }
);

module.exports = mongoose.model("Application", applicationModelSchema);
