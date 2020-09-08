import StudentSearch from './StudentSearch';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';

function StudentSearchContainer(props) {
	const {} = props;

	return (
		<Fragment>
			<StudentSearch />
		</Fragment>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(StudentSearchContainer);
