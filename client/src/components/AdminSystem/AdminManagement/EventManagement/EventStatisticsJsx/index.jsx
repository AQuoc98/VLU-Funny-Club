import EventStatisticsJsx from './EventStatisticsJsx';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';

function Index(props) {
	const {} = props;

	return (
		<Fragment>
			<EventStatisticsJsx />
		</Fragment>
	);
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
