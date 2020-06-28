const validator = require('validator');
const isEmpty = require('./is_empty');
module.exports = function validateExperienceInput(data) {
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : '';
	data.company = !isEmpty(data.company) ? data.company : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	if (validator.isEmpty(data.title)) {
		errors.title = 'job title field is required';
	}
	if (validator.isEmpty(data.company)) {
		errors.company = 'job company field is required';
	}
	if (validator.isEmpty(data.from)) {
		errors.from = 'from date field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
