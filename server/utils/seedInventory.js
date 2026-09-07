const Inventory = require("../models/Inventory");

const DEFAULT_UNITS = {
  "A+": 245,
  "A-": 86,
  "B+": 198,
  "B-": 64,
  "AB+": 112,
  "AB-": 38,
  "O+": 356,
  "O-": 185,
};

/**
 * Ensures the Inventory collection has one document per blood group.
 * The frontend's admin-only POST /api/inventory/initialize does the
 * same thing on demand, but running it once at server startup means
 * the app shows real data immediately on a fresh database rather than
 * an empty inventory page before anyone has clicked anything.
 */
const seedInventory = async () => {
  try {
    const existingCount = await Inventory.countDocuments();

    if (existingCount >= Object.keys(DEFAULT_UNITS).length) {
      return;
    }

    for (const [bloodGroup, units] of Object.entries(DEFAULT_UNITS)) {
      await Inventory.findOneAndUpdate(
        { bloodGroup },
        { $setOnInsert: { bloodGroup, units } },
        { upsert: true },
      );
    }

    console.log("Default blood inventory initialized.");
  } catch (error) {
    console.error("Error seeding inventory:", error.message);
  }
};

module.exports = seedInventory;
