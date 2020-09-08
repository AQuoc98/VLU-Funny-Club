import WebBannerManage from './WebBannerManage';
import React from 'react';
import {connect} from 'react-redux';
import {Fragment} from 'react';
import {Container} from 'react-bootstrap';

function Index(props) {
	const {} = props;

	return (
		<Container>
			<WebBannerManage />
		</Container>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
