const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profiles Model
const Profile = require('../../models/Profile');
// Load Users Model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
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
// @route GET api/profiles/handle/:handle
// @desc Get Profile by handle
// @access Public

router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});
// @route GET api/profiles/all
// @desc Get all profiles
// @access Public
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find({})
		.populate('user', ['name', 'avatar'])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'there are no profiles to show';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});
// @route GET api/profiles/users/:user_id
// @desc Get Profile by handle
// @access Public
router.get('/users/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

// @route POST api/profiles/
// @desc Create User Profile
// @access Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);
		// Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
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
			profileFields.skills = req.body.skills.split(',');
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
// @route POST api/profiles/experience
// @desc Add an experience
// @access Private
router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);
		// Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		Profile.findOne({ user: req.user.id }).then((profile) => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,
			};
			// Add exp to profile
			profile.experience.unshift(newExp);
			profile
				.save()
				.then((profile) => res.json(profile))
				.catch((err) => res.json(err));
		});
	},
);
// @route POST api/profiles/education
// @desc Add an education
// @access Private
router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);
		// Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		Profile.findOne({ user: req.user.id }).then((profile) => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldOfStudy: req.body.fieldOfStudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,
			};
			// Add exp to profile
			profile.education.unshift(newEdu);
			profile
				.save()
				.then((profile) => res.json(profile))
				.catch((err) => res.json(err));
		});
	},
);
module.exports = router;
