const express = require('express');
const { getMediations, createMediation, updateMediation, deleteMediation } = require('../controllers/mediationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getMediations);
router.post('/', authMiddleware, createMediation);
router.put('/:id', authMiddleware, updateMediation);
router.delete('/:id', authMiddleware, deleteMediation);

module.exports = router;