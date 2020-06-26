const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User Model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests usees route
// @access Public
router.get('/test', (req, res) => {
	res.json({ message: 'Chal gya' });
});

// @route GET api/users/register
// @desc Register a user
// @access Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: 'email already exists' });
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', //Size
				r: 'pg', //Rating
				d: 'mm', //Default
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar: avatar,
				password: req.body.password,
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => {
							res.json(user);
						})
						.catch((err) => {
							console.log(err);
						});
				});
			});
		}
	});
});

// @route GET api/users/login
// @desc Login User / returning the JWT Token
// @access Public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	// Check Validation
	
	
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	// Find User by email
	User.findOne({ email: email })
		.then((user) => {
			// Check for user
			if (!user) {
				errors.email = 'User not found';
				return res.status(404).json(errors);
			}

			// Check Password
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (isMatch) {
					// User Matched

					// JWT Payload creation
					const payload = {
						id: user.id,
						name: user.name,
						avatar: user.avatar,
					};

					// Sign the token
					jwt.sign(
						payload,
						keys.secretorKey,
						{ expiresIn: 3600 },
						(err, token) => {
							res.json({ success: true, token: 'Bearer ' + token });
						},
					);
				} else {
					errors.password = 'Password is incorrect';
					return res.status(400).json(errors);
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
		});
	},
);
module.exports = router;
