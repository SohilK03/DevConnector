const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profiles Model
const Profile = require('../../models/Profile');
// Load Users Model
const User = require('../../models/User');

// @route GET api/profiles/test
// @desc Tests profiles route
// @access Public
router.get('/test', (req, res) => {
	res.json({ message: 'Ye bhi Chal gya' });
});
// @route GET api/profiles/
// @desc Get current User's Profile
// @access Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				if (!profile) {
					errors.noprofile = 'there is no profile for this user';
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
);
module.exports = router;
