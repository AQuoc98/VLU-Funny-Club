import React, {useEffect} from 'react';
import Profile from '../../components/Profile/index';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/banner';
import {connect} from 'react-redux';
import {getProfileFetch} from '../../Redux/actions/student.action';
import {actGetAllClubRequest} from '../../Redux/actions/user-clubs.action';

const ProfilePage = (props) => {
	const {
		match,
		getUserInfoById,
		getProfileFetch,
		getAllclbs,
		userclubs,
	} = props;
	useEffect(() => {
		getProfileFetch(match.params.id);
		getAllclbs();
	}, [match.params.id]);
	return (
		<div>
			<Header />
			<Profile
				match={match}
				getUserInfoById={getUserInfoById}
				userclubs={userclubs}
			/>
			<Footer></Footer>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		getUserInfoById: state.getUserInfoById,
		userclubs: state.userClubs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProfileFetch: (id) => {
			dispatch(getProfileFetch(id));
		},
		getAllclbs: () => dispatch(actGetAllClubRequest()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
