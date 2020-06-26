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
					errors.noprofile = 'There is no profile for this user';
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
);
// @route POST api/profiles/
// @desc Create User Profile
// @access Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// Get fields
		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.githubusername)
			profileFields.githubusername = req.body.githubusername;
		// Skills - Split into array
		if (typeof req.body.skills !== undefined) {
			(profileFields.skills = req), body.skills.split(',');
		}
		//Social
		profileFields.socials = {};
		if (req.body.youtube) profileFields.socials.youtube = req.body.youtube;
		if (req.body.facebook) profileFields.socials.facebook = req.body.facebook;
		if (req.body.linkedin) profileFields.socials.linkedin = req.body.linkedin;
		if (req.body.instagram)
			profileFields.socials.instagram = req.body.instagram;

		Profile.findOne({ user: req.user.id }).then((profile) => {
			if (profile) {
				// Update
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true },
				)
					.then((profile) => res.json(profile))
					.catch((err) => {
						res.json(err);
					});
			} else {
				// Create

				//Check if handle exists
				Profile.findOne({ handle: profileFields.handle }).then((profile) => {
					if (profile) {
						errors.handle = 'Handle already exists';
						res.status(400).json(errors);
					}
				});
				//Save Profile
				new Profile(profileFields).save().then((profile) => res.json(profile));
			}
		});
	},
);
module.exports = router;
