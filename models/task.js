import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  placetype: {
    type: String,
    required: true,
  },
  nodalDepartment: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  GISlocation: {
    type: Object,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  siteImage: {
    type: Object,
    required: true,
  },
  ticketImage: {
    type: Object,
    required: true,
  },

  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  }
 
});
taskSchema.set("timestamps", true);

const Task = new mongoose.model("task", taskSchema);

export { Task, taskSchema };
