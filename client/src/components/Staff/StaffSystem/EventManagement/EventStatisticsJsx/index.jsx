import EventStatisticsJsx from './EventStatisticsJsx';
import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {actGetAllEventRequest} from '../../../../../Redux/actions/user-events.action';

function Index(props) {
	return (
		<Fragment>
			<EventStatisticsJsx />
		</Fragment>
	);
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
