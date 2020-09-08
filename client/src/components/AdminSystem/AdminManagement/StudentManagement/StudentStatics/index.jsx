import StudentStatics from './StudentStatics';
import React from 'react';
import {connect} from 'react-redux';
import {Fragment} from 'react';

function StudentStaticsContainer(props) {
	const {} = props;

	return (
		<Fragment>
			<StudentStatics />
		</Fragment>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(StudentStaticsContainer);
