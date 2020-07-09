import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	render() {
		return (
			<div className='landing mb-0'>
				<div className='dark-overlay landing-inner text-light'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-md-12 text-center'>
								<h1 className='display-3 mb-4'>Developer Connector</h1>
								<p className='lead'>
									{' '}
									Create a developer profile/portfolio, share posts and get help
									from other developers
								</p>
								<div>
									<Link to='/register' className='btn btn-lg btn-info mr-2'>
										Sign Up
									</Link>
									<Link to='/login' className='btn btn-lg btn-light'>
										Login
									</Link>
								</div>
								<hr />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Landing.propTypes = {
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(Landing);
