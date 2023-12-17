const express = require("express");

const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
  createUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);

module.exports = router;
