import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Common/spinner';
import PostForm from './PostForm'

class Post extends Component {
	render() {
		return <div class='feed'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PostForm></PostForm>
                    </div>
                </div>
            </div>
        </div>;
	}
}

export default connect(null,{})(Post);
