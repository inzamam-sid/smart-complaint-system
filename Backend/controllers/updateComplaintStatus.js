const complaint = require("../models/complaint");
const updateComplaintStatus = async (req, res) => { 
    try {
        const { id} = req.params;
        const { status, resolutionNote} = req.body;


        if(! ["Pending", "In Progress", "Resolved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedComplaint = await complaint.findByIdAndUpdate(
            id,
            {status, resolutionNote, resolvedBy: req.user._id},
            { new: true }
        )

        if(!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json({ message: "Complaint status updated", complaint: updatedComplaint });

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = updateComplaintStatus;