const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const path = require('path');

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Database Connected Successfully');
	})
	.catch((err) => {
		console.log(err);
	});

// Passport middleware
app.use(passport.initialize());
// Passport Config

require('./config/passport')(passport);
// "start": "node server.js",
// Use API Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

// Serve Static assets if in porduction
if (process.env.NODE_ENV === 'production') {
	// Set the static folder
	app.use(express.static('client/buid'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`The server running on port ${PORT}`);
});
