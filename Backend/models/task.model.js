const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"please enter name"],
    trim: true,
    maxlength: [30,"Name cannot be more than 30 Characters"]
  },
  description: {
    type: String,
    required: true,
  },
  status : {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;