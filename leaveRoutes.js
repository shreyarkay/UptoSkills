const express = require("express");
const { createLeave, getLeaves, updateLeaveStatus } = require("../controllers/leaveController");
const router = express.Router();

router.post("/", createLeave);
router.get("/", getLeaves);
router.put("/:id", updateLeaveStatus);

module.exports = router;
