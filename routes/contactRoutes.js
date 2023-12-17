const express = require("express");

const router = express.Router();

const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getSpecificContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);

router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

router.route("/:id").get(getSpecificContact);

module.exports = router;
