const BloodRequest = require("../models/BloodRequest");
const Inventory = require("../models/Inventory");

const generateRequestId = async () => {
  const count = await BloodRequest.countDocuments();

  return `REQ-${String(count + 1).padStart(4, "0")}`;
};

// Create request
const createRequest = async (req, res) => {
  try {
    const {
      hospital,
      patientName,
      patientAge,
      bloodGroup,
      units,
      urgency,
      contact,
      reason,
    } = req.body;

    if (
      !hospital ||
      !patientName ||
      patientAge === undefined ||
      !bloodGroup ||
      !units ||
      !contact
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Hospital, patient name, age, blood group, units and contact are required.",
      });
    }

    const request = await BloodRequest.create({
      requestId: await generateRequestId(),
      hospital,
      patientName,
      patientAge,
      bloodGroup,
      units,
      urgency: urgency || "Normal",
      contact,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Blood request created successfully.",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all requests
const getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single request
const getRequestById = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found.",
      });
    }

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve request
const approveRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found.",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending requests can be approved.",
      });
    }

    const inventory = await Inventory.findOne({
      bloodGroup: request.bloodGroup,
    });

    if (!inventory) {
      return res.status(400).json({
        success: false,
        message: `No inventory found for ${request.bloodGroup}.`,
      });
    }

    if (inventory.units < request.units) {
      return res.status(400).json({
        success: false,
        message: `Insufficient ${request.bloodGroup} blood units.`,
        availableUnits: inventory.units,
        requestedUnits: request.units,
      });
    }

    inventory.units -= request.units;
    inventory.lastUpdated = new Date();

    await inventory.save();

    request.status = "Approved";
    request.approvedAt = new Date();

    await request.save();

    res.json({
      success: true,
      message: "Blood request approved successfully.",
      request,
      remainingUnits: inventory.units,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject request
const rejectRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found.",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending requests can be rejected.",
      });
    }

    request.status = "Rejected";
    request.rejectedAt = new Date();

    await request.save();

    res.json({
      success: true,
      message: "Blood request rejected successfully.",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete request
const deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found.",
      });
    }

    res.json({
      success: true,
      message: "Blood request deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  approveRequest,
  rejectRequest,
  deleteRequest,
};
