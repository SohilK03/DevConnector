const express = require('express');

const router = express.Router();
// @route GET api/profiles/test
// @desc Tests profiles route
// @access Public
router.get('/test', (req, res) => {
	res.json({ message: 'Ye bhi Chal gya' });
});

module.exports = router;
