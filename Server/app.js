const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const hostname = "localhost";
const authRoutes = require("./routes/authRoute");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

app.use(express.json());

app.use(express.json());
app.use(express.text());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // userCreateIndex: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server running", process.env.PORT);
    });
  })
  .catch((err) => console.log(err.message));

// app.listen(port, hostname, async () => {
//   try {
//     await mongoose.connect(mongoDB);
//   } catch (error) {
//     console.log("Failed to connect to DB");
//     console.log(error);
//   }

//   console.log("Listening to localhost:5000");
// });

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/user", userRoutes);

// app.post("/api/auth/login", (req, res) => {
//   console.log(req.body);
//   res.status(200).send();
// });
