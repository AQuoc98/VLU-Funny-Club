import UpdateClubWithLogo from './UpdateClubWithLogo';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

function UpdateClubWithLogoContainer(props) {
	const {match, history} = props;
	const {id} = match.params;
	return <UpdateClubWithLogo id={id} history={history} />;
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(UpdateClubWithLogoContainer);
