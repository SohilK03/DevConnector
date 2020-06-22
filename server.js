const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const app = express();
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
app.use('/api/profiles', profile);
app.use('/api/posts', posts);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`The server running on port ${PORT}`);
});
