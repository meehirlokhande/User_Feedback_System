const express = require('express');
const {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    getFeedbackStats,
    updateFeedback,
} = require('../controllers/feedbackController');

const {protect, adminOnly} = require('../middleware/authMiddleware');

const router = express.Router();

//Public
router.post('/',createFeedback);

//Admin Only Api's
router.get('/',protect,adminOnly,getAllFeedback);
router.get('/stats', protect, adminOnly, getFeedbackStats);
router.get('/:id', protect, adminOnly, getFeedbackById);
router.put('/:id', protect, adminOnly, updateFeedback);

module.exports = router;