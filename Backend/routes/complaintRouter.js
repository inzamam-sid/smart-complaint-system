// routes/complaintRouter.js
const express = require("express");
const router = express.Router();
const { createComplaint, getMyComplaints } = require("../controllers/complaintController");
const authenticateUser = require("../middleware/userAuth"); // assuming you already have JWT auth middleware
// const authorizeAdmin = require("../middleware/authorizeAdmin")
// const { updateComplaintStatus } = require("../controllers/updateComplaintStatus");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const updateComplaintStatus = require("../controllers/updateComplaintStatus");
// @route   POST /complaints
router.post("/", authenticateUser, createComplaint);

// @route   GET /complaints
router.get("/", authenticateUser, getMyComplaints);

router.put("/:id/status", authenticateUser, authorizeAdmin, updateComplaintStatus);
module.exports = router;
