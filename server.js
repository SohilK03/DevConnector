const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');

const app = express();

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
app.get('/', (req, res) => {
	res.send('Hello World!!!');
});
// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`The server running on port ${PORT}`);
});
