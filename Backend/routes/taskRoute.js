const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTaskById,
  getAllTasks,
  getTaskById,
  deleteTaskById,
} = require("../controllers/taskController.js");

router.get("/", getAllTasks);
router.get("/:taskId", getTaskById);
router.post("/", createTask);
router.put("/:taskId", updateTaskById);
router.delete("/:taskId", deleteTaskById);

module.exports = router;
