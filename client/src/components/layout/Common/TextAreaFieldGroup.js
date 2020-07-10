import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import isEmpty from '../../../Validation/isEmpty';

function textAreaFieldGroup({
	name,
	placeholder,
	value,

	error,
	info,

	onChange,
}) {
	return (
		<div className='form-group'>
			<textarea
				className={classnames('form-control form-control-lg', {
					'is-invalid': error,
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{!isEmpty(info) && <small className='form-text text-muted'>{info}</small>}
			{!isEmpty(error) && <div className='invalid-feedback'>{error}</div>}
		</div>
	);
}
textAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default textAreaFieldGroup;
