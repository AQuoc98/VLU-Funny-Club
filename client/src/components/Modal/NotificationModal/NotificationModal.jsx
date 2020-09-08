import React from 'react';
import {connect} from 'react-redux';

const NotificationModal = (props) => {
	const {userLogin} = props;
	console.log(userLogin.isAuthenticated);
	const xhtml = userLogin.isAuthenticated ? (
		<div className='notification-success'>
			<h2>Đăng nhập thành công</h2>
			<p>
				Giờ bạn đã có thể theo dõi có thể tham gia , đăng ký các event xịn sò từ
				những câu lạc bộ.
			</p>
			<div>
				<img
					src='https://frontend.tikicdn.com/_desktop-next/static/img/graphic-map.png'
					alt=''
					className='image-next-to-form'
				/>
			</div>
		</div>
	) : (
		<div className='notification-fail'>
			<h2>Bạn chưa đăng nhập</h2>
			<p>
				Hãy đăng nhạp để theo dõi có thể tham gia , đăng ký các event xịn sò từ
				những câu lạc bộ.
			</p>
			<div>
				<img
					src='https://frontend.tikicdn.com/_desktop-next/static/img/graphic-map.png'
					alt=''
					className='image-next-to-form'
				/>
			</div>
		</div>
	);
	return {xhtml};
};

const mapStateToProps = (state) => ({
	userLogin: state.userLogin,
});

const mapDispatchToProps = (dispatch) => ({
	// fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationModal);
