const express = require('express');
const router = express.Router();

const feedbackController = require('../../app/controllers/FeedbackController');

router.get('/', feedbackController.index);
router.get('/random', feedbackController.showRandom);

module.exports = router;