import React, {Component, Fragment} from 'react';
import './index.css';
import Profile from './Profile';
import Club from './Club';
import {Container, Row, Col} from 'reactstrap';
import {Tabs} from 'antd';
import '../Banner/banner';
import Banner from '../Banner/banner';
const {TabPane} = Tabs;

function callback(key) {
	console.log(key);
}
const Index = (props) => {
	const {
		match,
		history,
		getUserInfoById,
		userclubs,
		updateAvatar,
		newAvatar,
	} = props;
	return (
		<div>
			<Banner />
			<Container>
				<Col sm='12'>
					<div className='profile-page'>
						<Tabs defaultActiveKey='1' onChange={callback} size='large'>
							<TabPane tab='Thông tin cá nhân' key='1'>
								<Profile
									match={match}
									history={history}
									getUserInfoById={getUserInfoById}
									updateAvatar={updateAvatar}
									newAvatar={newAvatar}
									userType={getUserInfoById.userType}
								/>
							</TabPane>
							{getUserInfoById.userType === 'admin' ? (
								<TabPane key='2'></TabPane>
							) : (
								<TabPane tab='Câu lạc bộ đã tham gia' key='2'>
									<Club clubs={getUserInfoById.club} userclubs={userclubs} />
								</TabPane>
							)}
						</Tabs>
					</div>
				</Col>
			</Container>
		</div>
	);
};
export default Index;
