const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connectDb = require('./config/db.js');
const errorHandler = require("./middleware/erorHandler.js");
const taskRoute = require('./routes/taskRoute.js');
// require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(errorHandler);

connectDb();

// app.use('/api/task',taskRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
// }
app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
