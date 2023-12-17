const { default: mongoose } = require("mongoose");
const monoose = require("mongoose");

const userSchema = monoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please add username"],
    },
    email: {
      type: String,
      require: [true, "Please add email"],
      unique: [true, "Email address is already taken"],
    },
    password: {
      type: String,
      require: [true, "Please add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
