const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// Load model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
// Load validation
const validatePostInput = require('../../validation/post');
const { profile_url } = require('gravatar');
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
		.catch((err) => res.status(404).json({ nopostfound: 'not found' }));
});
// @route DELETE api/posts/:id
// @desc delete a particular post
// @access Private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then((profile) => {
			Post.findById(req.params.id).then((post) => {
				// CHeck for post owner
				if (post.user.toString() !== req.user.id) {
					res.status(401).json({ notAuthorized: 'User not authorized' });
				}
				//Delete
				post
					.remove()
					.then(() => res.json({ deleted: 'success' }))
					.catch((err) => res.json(err));
			});
		});
	},
);
// @route POST api/like/:id
// @desc like post
// @access Private
router.post(
	'/like/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then((profile) => {
			Post.findById(req.params.id)
				.then((post) => {
					if (
						post.likes.filter((like) => like.user.toString() === req.user.id)
							.length > 0
					) {
						return res
							.status(400)
							.json({ alreadyliked: 'User has already liked this post' });
					}
					// Add user to likes array
					post.likes.unshift({ user: req.user.id });
					post
						.save()
						.then((post) => res.json(post))
						.catch((err) => res.json(err));
				})
				.catch((err) => res.status(400).json({ notfound: 'Post not found' }));
		});
	},
);
// @route POST api/unlike/:id
// @desc unlike post
// @access Private
router.post(
	'/unlike/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then((profile) => {
			Post.findById(req.params.id).then((post) => {
				if (
					post.likes.filter((like) => like.user.toString() === req.user.id)
						.length === 0
				) {
					return res.status(400).json({ notliked: 'Not yet liked' });
				}
				// Remove user to likes array
				// get remove index

				const removeIndex = post.likes
					.map((item) => item.user.toString())
					.indexOf(req.user.id);
				// Splice it out
				post.likes.splice(removeIndex, 1);
				//Save
				post
					.save()
					.then((post) => res.json(post))
					.catch((err) => res.json(err));
			});
		});
	},
);
module.exports = router;
