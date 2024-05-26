const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routers/users");
const task = require("./routers/task");
// initialize the app
app = express();
app.use(cors());
app.use(express.json());
// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
// app.use('/api/workout',WorkoutRouter)
app.use("/api/user", user);
app.use("/api/tasks", task);
// Mangoose connet
// app listening on
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on the Port" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Oops! Can't connect to Database ");
    console.log(err);
  });
