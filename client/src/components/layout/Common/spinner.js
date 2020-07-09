import React from 'react';
import spinnergif from './spinner.gif';
export default function spinner() {
	return (
		<div>
			<img
				src={spinnergif}
				alt='Loading'
				style={{
					width: '200px',
					display: 'block',
					marging: 'auto',
					alignSelf: 'center',
				}}
			/>
		</div>
	);
}
