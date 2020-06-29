const validator = require('validator');
const isEmpty = require('./is_empty');
module.exports = function validatePostInput(data) {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (!validator.isLength(data.text, { min: 10, max: 300 })) {
		errors.text = 'Post must be between 10 and 300 characters';
	}
	if (validator.isEmpty(data.text)) {
		errors.text = 'text field is required';
	}
    console.log(errors);
    
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
