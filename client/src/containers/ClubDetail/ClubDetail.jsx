import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Clubsdetail from '../../components/Club/ClubsDetail/ClubsDetail';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {Spin} from 'antd';
const ClubDetail = (props) => {
	const {match, history} = props;
	return (
		<Fragment>
			<Header />
			<Clubsdetail match={match} history={history} />
			<Footer />
		</Fragment>
	);
};
const mapStateToProps = (state) => ({
	// blabla: state.blabla,
});

const mapDispatchToProps = (dispatch) => ({
	// fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClubDetail);
