const express = require('express');

const router = express.Router();
// @route GET api/posts/test
// @desc Tests Prosts route
// @access Public
router.get('/test', (req, res) => {
	res.json({ message: ' Haan Ye bhi Chal gya' });
});

module.exports = router;
