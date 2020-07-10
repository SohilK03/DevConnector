import React from 'react';
import spinnergif from './spinner.gif';
export default function spinner() {
	return (
		<div className=' container container-fluid text-center'>
			<img
				src={spinnergif}
				alt='Loading'
				style={{
					width: '300px',
					display: 'block',
					margin: 'auto',
					alignSelf: 'center',
				}}
			/>
			<h2>Loading</h2>
		</div>
	);
}
