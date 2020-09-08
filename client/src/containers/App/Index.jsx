import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomePage from '../UserPage/index';
import AdminSystem from '../AdminPage/index';
import Clubs from '../../components/Club/Clubs';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import jwtDecode from 'jwt-decode';
import Profile from '../Profile/index';
import {decode} from 'jsonwebtoken';
import AdminClubPage from '../AdminClubPage/index';
import StaffPage from '../../containers/StaffPage/index';
import Introduce from '../Introduce/index';
import ViewAllClubsSortBy from '../../components/Club/ViewAllClubs/index';
import {Container} from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/banner';
import ClubDetail from '../ClubDetail/ClubDetail';
import Event from '../../components/Event';
import EventDetail from '../EventDetail/EventDetail';
import ViewAllEvents from '../../components/Event/ViewAllEvents/index';
import ViewAllEventsSortByClub from '../AllEventsOfSpecicClubContainer/AllEventsOfSpecicClubContainer';

const Index = (props) => {
	const author = props.userLogin.isAuthenticated;

	const Authorization = localStorage.getItem('Authorization');
	const AfterDecoded = decode(Authorization);
	const Payload = AfterDecoded ? AfterDecoded.payload : '';
	const UserType = Payload.userType;
	console.log('UserType : ', UserType);

	// kiểm tra admin club
	const [authAdminClub, setauthAdminClub] = useState(
		UserType === 'adminClub' ? true : false,
	);

	// kiểm tra admin
	const [authAdmin, setauthAdmin] = useState(
		UserType === 'admin' ? true : false,
	);

	// kiểm tra student
	const [authStudent, setauthStudent] = useState(
		UserType === 'user' ? true : false,
	);

	// kiểm tra staff
	const [authStaff, setauthStaff] = useState(
		UserType === 'staff' ? true : false,
	);

	useEffect(() => {
		setauthAdmin(author && UserType === 'admin' ? true : false);
		setauthStaff(author && UserType === 'staff' ? true : false);
		setauthStudent(author && UserType === 'user' ? true : false);
		setauthAdminClub(author && UserType === 'adminClub' ? true : false);
	}, [author]);

	useEffect(() => {
		setauthAdmin(Authorization ? true : false);
		setauthStaff(Authorization ? true : false);
		setauthStudent(Authorization ? true : false);
		setauthAdminClub(Authorization ? true : false);
	}, []);

	return (
		<Fragment>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<PrivateRoute
					path='/adminsystem'
					component={AdminSystem}
					auth={authAdmin}
				/>
				<PrivateRoute
					path='/staff/'
					component={StaffPage}
					auth={authStaff || authAdmin}
				/>
				<PrivateRoute
					path='/adminClub/'
					component={AdminClubPage}
					auth={authAdminClub || authAdmin}
				/>
				<PrivateRoute
					path='/user/:id'
					component={Profile}
					auth={authStudent || authAdmin || authStaff || authAdminClub}
				/>
				<Route path='/club-detail/:id' component={ClubDetail} />
				<Route path='/event-detail/:id' component={EventDetail} />
				<Route path='/introduce' component={Introduce}></Route>
				{/* show tất cả câu lạc bộ của trường || khoa || đoàn hội  */}
				<Route path='/clubs/:id' component={ViewAllClubsSortBy}></Route>
				<Route path='/events/:id' component={ViewAllEventsSortByClub}></Route>
				<Route path='/events' component={ViewAllEvents}></Route>

				<Route path='' component={NotFoundPage}></Route>
			</Switch>
		</Fragment>
	);
};
const PrivateRoute = ({auth, component: Component, ...rest}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				auth ? <Component {...props} /> : <Redirect to={{pathname: '/'}} />
			}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		userLogin: state.userLogin,
	};
};

const mapDispatchToProps = (dispatch) => ({
	// fnBlaBla: () => dispatch(action.name()),
});

// phong

export default connect(mapStateToProps, mapDispatchToProps)(Index);
