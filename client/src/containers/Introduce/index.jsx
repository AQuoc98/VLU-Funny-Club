import React from 'react';
import {connect} from 'react-redux';
import Introduce from '../../components/Introduce/index';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/banner';
import Footer from '../../components/Footer/Footer';

const HomePage = (props) => {
	return (
		<div>
			{/* header */}
			<Header />

			{/* banner */}
			<Banner />

			{/* intro */}
			<Introduce />

			{/* footer */}
			<Footer />
		</div>
	);
};
// const mapStateToProps = (state) => {
// 	return {
// 		userLogin: state.userLogin,
// 	};
// };
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getAllclbs: () => dispatch(actGetAllClubRequest()),
// 		setCurrentUser: (decoded) => {
// 			dispatch(setCurrentUser(decoded));
// 		},
// 	};
// };

export default connect(null, null)(HomePage);
