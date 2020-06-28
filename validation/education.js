const validator = require('validator');
const isEmpty = require('./is_empty');
module.exports = function validateExperienceInput(data) {
	let errors = {};

	data.school = !isEmpty(data.school) ? data.school : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	if (validator.isEmpty(data.school)) {
		errors.school = 'school field is required';
	}
	if (validator.isEmpty(data.degree)) {
		errors.degree = 'degree field is required';
	}
	if (validator.isEmpty(data.fieldOfStudy)) {
		errors.fieldOfStudy = 'fieldOfStudy field is required';
	}
	if (validator.isEmpty(data.from)) {
		errors.from = 'from date field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
