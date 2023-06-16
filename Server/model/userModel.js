const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Schema = mongoose.Schema;

const userModelSchema = new Schema(
  {
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    token: { type: String },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("User", userModelSchema);

// exports.findUser = async (email) => {
//   console.log(`finding user with email ${email}`);
//   userModel
//     .findOne({ email: email })
//     .then((user) => {
//       return user;
//     })
//     .catch((err) => {
//       console.log(error);
//     });
// };
