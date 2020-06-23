const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();

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
	const email = req.body.email;
	const password = req.body.password;

	// Find User by email
	user
		.findOne({ email: email })
		.then((user) => {
			// Check for user
			if (!user) {
				return res.status(404).json({ email: 'email not found' });
			}

			// Check Password
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (isMatch) {
					res.json({ message: 'Success' });
				} else {
					return res.status(400).json({ password: 'Password Incorrect' });
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
module.exports = router;
