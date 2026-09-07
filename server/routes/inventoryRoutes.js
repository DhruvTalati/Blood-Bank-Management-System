const express = require("express");

const {
  getInventory,
  initializeInventory,
  updateInventory,
} = require("../controllers/inventoryController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getInventory);

router.post("/initialize", adminOnly, initializeInventory);

router.put("/:bloodGroup", adminOnly, updateInventory);

module.exports = router;
