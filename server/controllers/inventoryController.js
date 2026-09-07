const Inventory = require("../models/Inventory");

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Get complete inventory
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ bloodGroup: 1 });

    res.json({
      success: true,
      inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Initialize inventory
const initializeInventory = async (req, res) => {
  try {
    const defaultUnits = {
      "A+": 245,
      "A-": 86,
      "B+": 198,
      "B-": 64,
      "AB+": 112,
      "AB-": 38,
      "O+": 356,
      "O-": 185,
    };

    const inventory = [];

    for (const group of BLOOD_GROUPS) {
      const existing = await Inventory.findOne({
        bloodGroup: group,
      });

      if (!existing) {
        const item = await Inventory.create({
          bloodGroup: group,
          units: defaultUnits[group],
        });

        inventory.push(item);
      } else {
        inventory.push(existing);
      }
    }

    res.json({
      success: true,
      message: "Inventory initialized successfully.",
      inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update inventory
const updateInventory = async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    const { units } = req.body;

    if (!BLOOD_GROUPS.includes(bloodGroup)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blood group.",
      });
    }

    if (units === undefined || Number(units) < 0) {
      return res.status(400).json({
        success: false,
        message: "Units must be a non-negative number.",
      });
    }

    const inventory = await Inventory.findOneAndUpdate(
      { bloodGroup },
      {
        units: Number(units),
        lastUpdated: new Date(),
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    res.json({
      success: true,
      message: `${bloodGroup} inventory updated successfully.`,
      inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInventory,
  initializeInventory,
  updateInventory,
};
