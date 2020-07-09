import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import isEmpty from '../../../Validation/isEmpty'

function textFieldGroup({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled,
}) {
	return (
		<div className='form-group'>
			<input
				type={type}
				className={classnames('form-control form-control-lg', {
					'is-invalid':error ,
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
			{!isEmpty(info) && <small className='form-text text-muted'>{info}</small>}
			{!isEmpty(error) && <div className='invalid-feedback'>{error}</div>}
		</div>
	);
}
textFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string.isRequired,
};

textFieldGroup.defaultProps = {
	type: 'text',
};
export default textFieldGroup;
