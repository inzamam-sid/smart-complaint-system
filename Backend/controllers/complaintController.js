// controllers/complaintController.js
const Complaint = require("../models/complaint");
const User = require("../models/User");

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newComplaint = new Complaint({
      title,
      description,
      category,
      createdBy: req.user._id,
    });

    await newComplaint.save();

    res.status(201).json({ success: true, message: "Complaint created", complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get complaints created by the logged-in user
// exports.getMyComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, complaints });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


exports.getMyComplaints = async (req, res) => {
  try {
    const currentUser = req.user;
    const filter = {};

//     console.log("Current User:", currentUser);
//    console.log("Filter:", filter);


    if (currentUser.role.toLowerCase() === "student") {
      const studentIds = await User.find({ role: "student" }).select("_id");
      filter.createdBy = { $in: studentIds.map(u => u._id) };
    } 
    else if (currentUser.role.toLowerCase() === "faculty") {
      const facultyIds = await User.find({ role: "faculty" }).select("_id");
      filter.createdBy = { $in: facultyIds.map(u => u._id) };
    } 
    else if (currentUser.role.toLowerCase() === "admin") {
      const userIds = await User.find({  }).select("_id");
      filter.createdBy = { $in: userIds };
    } 

    // Include own complaints always (even if role check missed it)
    if (!filter.createdBy) {
      filter.createdBy = currentUser._id;
    } 
    else {
      filter.createdBy.$in.push(currentUser._id);
    }

    const complaints = await Complaint.find(filter)
      .populate("createdBy", "firstName lastName role")
      .populate("resolvedBy", "firstName lastName role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, complaints });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
