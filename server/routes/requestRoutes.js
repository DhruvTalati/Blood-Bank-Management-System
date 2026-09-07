const express = require("express");

const {
  createRequest,
  getRequests,
  getRequestById,
  approveRequest,
  rejectRequest,
  deleteRequest,
} = require("../controllers/requestController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", createRequest);
router.get("/", getRequests);
router.get("/:id", getRequestById);

router.put("/:id/approve", adminOnly, approveRequest);
router.put("/:id/reject", adminOnly, rejectRequest);

router.delete("/:id", adminOnly, deleteRequest);

module.exports = router;
