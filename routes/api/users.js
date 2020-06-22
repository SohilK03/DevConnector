const express = require('express');

const router = express.Router();
// @route GET api/users/test
// @desc Tests usees route
// @access Public
router.get('/test', (req, res) => {
	res.json({ message: 'Chal gya' });
});

module.exports =router;

