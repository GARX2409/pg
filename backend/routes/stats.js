const express = require('express');
const { getStats } = require('../controllers/statsController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getStats);

module.exports = router;