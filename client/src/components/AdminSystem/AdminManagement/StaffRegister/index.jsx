import StaffRegister from './StaffRegister';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Container} from 'react-bootstrap';

const Index = (props) => {
	const {history} = props;

	return (
		<Container>
			<StaffRegister history={history} />
		</Container>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
