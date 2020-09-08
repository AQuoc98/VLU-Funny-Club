import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import "./Notification.styles.css"

const Notification = (props) => {
	const {userLogin, userRegist} = props;
	console.log(userLogin);

	const element =
		userLogin.isAuthenticated === true ? (
			<div className='notification-success'>
				<h2>Đăng nhập thành công!</h2>
				<p>
					Đăng ký để theo dõi có thể tham gia , đăng ký các event xịn sò từ
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
		) : userRegist.isRegisted === true ? (
			<div className='notification-success'>
				<h2>Đăng ký thành công!</h2>
				<p>
					Đăng nhập để theo dõi có thể tham gia , đăng ký các event xịn sò từ
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
			''
		);
	return <Fragment>{element}</Fragment>;
};

const mapStateToProps = (state) => ({
	// blabla: state.blabla,
});

const mapDispatchToProps = (dispatch) => ({
	// fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
