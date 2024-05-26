const task = require("../models/taskModel");
const mongoose = require("mongoose");

//add the new task (POST methode)

const createTask = async (req, res) => {
  const { title, description, isCompleted } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  // if (!isCompleted) {
  //   emptyFields.push("isCompleted");
  // }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ err: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const taskPost = await task.create({
      title,
      description,
      isCompleted,
      user_id,
    });
    res.status(200).json(taskPost);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

// get the all task (GET )

const getTask = async (req, res) => {
  const user_id = req.user._id;
  const taskGet = await task.find({ user_id }).sort({ createdAT: -1 });
  res.status(200).json(taskGet);
};
// get the all task (GET )3

const getTasks = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const taskGets = await task.findById(id);
    if (!taskGets) {
      res.status(404).json({ err: "No such task" });
    }
    res.status(200).json(taskGets);
  } else {
    res.status(404).json({ err: "No such task" });
  }
};

// Delete  the  task (DELETE )

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const taskDelete = await task.findOneAndDelete(id);
    if (!taskDelete) {
      res.status(404).json({ err: "No such task" });
    }
    res.status(200).json(taskDelete);
  } else {
    res.status(404).json({ err: "No such task" });
  }
};

// update   the  task (PATCH )

const updateTask = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const taskUpdate = await task.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!taskUpdate) {
      res.status(404).json({ err: "No such task" });
    }
    res.status(200).json(taskUpdate);
  } else {
    res.status(404).json({ err: "No such task" });
  }
};

module.exports = {
  createTask,
  getTask,
  getTasks,
  deleteTask,
  updateTask,
};
