// routes/complaintRouter.js
const express = require("express");
const router = express.Router();
const { createComplaint, getMyComplaints } = require("../controllers/complaintController");
const authenticateUser = require("../middleware/userAuth"); // assuming you already have JWT auth middleware

// @route   POST /complaints
router.post("/", authenticateUser, createComplaint);

// @route   GET /complaints
router.get("/", authenticateUser, getMyComplaints);

module.exports = router;
 