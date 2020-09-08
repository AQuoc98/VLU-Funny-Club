import UpdateClubWithStructureImage from './UpdateClubWithStructureImage';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button as ButtonAnt} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';

const Index = (props) => {
	const {match, history} = props;
	const {id} = match.params;
	console.log(id);
	return (
		<Fragment>
			<UpdateClubWithStructureImage id={id} history={history} />
			<br />
			<br />
			<Link to={`/adminsystem/editClub/${id}`}>
				<ButtonAnt type='primary' icon={<RollbackOutlined />} size={'large'}>
					Trở về
				</ButtonAnt>
			</Link>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
