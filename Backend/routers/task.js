const express = require("express");
const requireAuth = require("../middleware/requireAuth");
// const Task = require('../models/TaskModel.js')
const {
  createTask,
  getTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("../controller/taskController");
const router = express.Router();
//require auth for all Task
router.use(requireAuth);
// get  all the Task
router.get("/", getTask);

// get Specific Task
router.get("/:id", getTasks);

// Post new Task
router.post("/", createTask);

// Delete a Task
router.delete("/:id", deleteTask);

// update a Task
router.put("/:id", updateTask);
module.exports = router;
