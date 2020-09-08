import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {actGetAllEventRequest} from '../../Redux/actions/user-events.action';
import {Fragment} from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {Link} from 'react-router-dom';
import {decode} from 'jsonwebtoken';
import DetailEvent from '../../components/Event/DetailEvent/DetailEvent';
import {actGetAllClubRequest} from '../../Redux/actions/user-clubs.action';
import {getProfileFetch} from '../../Redux/actions/student.action';

const EventDetail = ({
	match,
	getAllEvent,
	userEvents,
	userLogin,
	userClubs,
	getAllClub,
	getProfileFetch,
	getUserInfoById,
}) => {
	const Authorization = localStorage.getItem('Authorization');
	const AfterDecoded = decode(Authorization);
	const Payload = AfterDecoded ? AfterDecoded.payload : '';
	const UserType = Payload.userType;
	const id = match.params.id;

	useEffect(() => {
		getAllEvent();
		getAllClub();
		getProfileFetch(Payload.id);
	}, []);
	console.log(getUserInfoById);

	return (
		<Fragment>
			{userEvents
				.filter((item) => {
					return item._id === id && item.isActive === true;
				})
				.map((event, index) => {
					const clubs = userClubs.filter((item) => {
						return item.isActive === true && item._id === event.Club;
					});
					return (
						<Fragment key={index}>
							<DetailEvent
								event={event}
								userLogin={userLogin}
								clubOfEvent={clubs}
							/>
						</Fragment>
					);
				})}
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		userEvents: state.userEvents,
		userLogin: state.userLogin,
		userClubs: state.userClubs,
		getUserInfoById: state.getUserInfoById,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllEvent: () => {
			dispatch(actGetAllEventRequest());
		},
		getAllClub: () => dispatch(actGetAllClubRequest()),
		getProfileFetch: (id) => {
			dispatch(getProfileFetch(id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
