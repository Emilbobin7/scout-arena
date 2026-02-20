const express = require('express');
const router = express.Router();
const { updatePassword, deleteAccount } = require('../controllers/settingsController');
const protect = require('../middleware/authMiddleware');

router.put('/password', protect, updatePassword);
router.delete('/account', protect, deleteAccount);

module.exports = router;
