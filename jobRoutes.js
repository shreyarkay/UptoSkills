const express = require('express');
const router = express.Router();
const { getAllJobs, createJob } = require('../controllers/jobController');

// Route to get all jobs
router.get('/', getAllJobs);

// Route to create a new job
router.post('/', createJob);

module.exports = router;
