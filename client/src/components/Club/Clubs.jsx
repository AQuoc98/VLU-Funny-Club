import React from 'react';
import {connect} from 'react-redux';
import {actGetAllClubRequest} from '../../Redux/actions/user-clubs.action';

const Clubs = (props) => {
	const {userClubs, match} = props;
	return (
		<div>
			<h1>this is clubs of {match.params.id}</h1>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		userClubs: state.userClubs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllclbs: () => dispatch(actGetAllClubRequest()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Clubs);
