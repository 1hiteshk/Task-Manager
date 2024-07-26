const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    taskName: { type: String, required: true },
    taskDescription: { type: String , required : true},
    taskStatus: {
      type: String,
      enum: ["completed", "not completed"],
      default: "not completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
