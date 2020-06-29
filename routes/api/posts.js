const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// Load model
const Post = require('../../models/Post');
// Load validation
const validatePostInput = require('../../validation/post');
// @route GET api/posts/test
// @desc Tests Prosts route
// @access Public
router.get('/test', (req, res) => {
	res.json({ message: ' Haan Ye bhi Chal gya' });
});
// @route POST api/posts/
// @desc Create Posts
// @access Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		if (!isValid) {
			// Error found send with status 400
			res.status(400).json(errors);
		} else {
			const newPost = new Post({
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id,
			});
			newPost.save().then((post) => res.json(post));
		}
	},
);
// @route GET api/posts/
// @desc Get all posts
// @access Public
router.get('/', (req, res) => {
	Post.find({})
		.sort({ date: -1 })
		.then((posts) => res.json(posts))
		.catch((err) => res.status(404).json(err));
});
// @route GET api/posts/:id
// @desc Get a particular
// @access Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) => res.status(404).json({nopostfound:'not found'}));
});

module.exports = router;
