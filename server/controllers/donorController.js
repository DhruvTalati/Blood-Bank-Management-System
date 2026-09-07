const Donor = require("../models/Donor");

// Generate donor ID
const generateDonorId = async () => {
  const count = await Donor.countDocuments();

  return `DON-${String(count + 1).padStart(4, "0")}`;
};

// Create donor
const createDonor = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      dateOfBirth,
      bloodGroup,
      city,
      address,
      lastDonationDate,
    } = req.body;

    if (!name || !mobile || !bloodGroup || !city) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile, blood group and city are required.",
      });
    }

    const donor = await Donor.create({
      donorId: await generateDonorId(),
      name,
      email,
      mobile,
      dateOfBirth,
      bloodGroup,
      city,
      address,
      lastDonationDate,
    });

    res.status(201).json({
      success: true,
      message: "Donor registered successfully.",
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all donors
const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single donor
const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found.",
      });
    }

    res.json({
      success: true,
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update donor
const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found.",
      });
    }

    res.json({
      success: true,
      message: "Donor updated successfully.",
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete donor
const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found.",
      });
    }

    res.json({
      success: true,
      message: "Donor deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
};
