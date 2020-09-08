import React, {useState, useEffect} from 'react';
import {Container, Col, Row} from 'reactstrap';
import {Modal} from 'react-bootstrap';
import './Modal.styles.css';
import {Tabs, Form, Input, message, Button} from 'antd';
import Picture from './Picture';
import {connect} from 'react-redux';
import {RegistStudents, loginStudent} from '../../Redux/actions/student.action';
import NotificationModal from './NotificationModal/NotificationModal';
import Notification from './Notification/Notification';
import Axios from 'axios';
import swal from 'sweetalert';
import ButtonRST from 'reactstrap/lib/Button';

const layout = {
	labelCol: {span: 7},
	wrapperCol: {span: 18},
};
const tailLayout = {
	wrapperCol: {offset: 7, span: 18},
};
const layoutSignUp = {
	labelCol: {span: 7},
	wrapperCol: {span: 17},
};

const {TabPane} = Tabs;

// MyVerticallyCenteredModal

const MyVerticallyCenteredModal = (props) => {
	const {
		modalShow,
		userRegist,
		userLogin,
		onHide,
		errorsreducer,
		buglogin,
		bugregist,
		onClearForm,
	} = props;
	// console.log(buglogin);
	const [bugFromRigisting, setBugFromRigisting] = useState('');
	const [bugFromLogin, setBugFromLogin] = useState('');

	useEffect(() => {
		// console.log(userRegist);
		setBugFromLogin('');
		if (buglogin) {
			setBugFromLogin(buglogin);
		}
		setTimeout(() => {
			setBugFromLogin('');
		}, 3000);
	}, [userLogin]);
	const [picture, setPicture] = useState(modalShow ? true : false);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [resData, setResData] = useState('');

	const [image, setImage] = useState({preview: '', raw: ''});

	const [user, setUser] = useState({
		userName: '',
		passWord: '',
		passWord2: '',
		classMajor: '',
		fullName: '',
		mssv: '',
		major: '',
	});
	const {
		userName,
		passWord,
		passWord2,
		classMajor,
		fullName,
		mssv,
		major,
	} = user;

	const handleChange = (e) => {
		if (e.target.files.length) {
			setImage({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
		}
	};

	const updateField = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (formData, check) => {
		swal('Đang đăng ký...');
		Axios({
			method: 'POST',
			url: 'https://team11-api.azurewebsites.net/api/student/registerUser/ImageAvatar',
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
			},
			data: formData,
		})
			.then((res) => {
				if (res.data) {
					swal(
						'Đăng ký thành công',
						'Đăng nhập để tham gia các câu lạc bộ và sự kiện nào',
						'success',
					);
					document.querySelector('#rc-tabs-0-tab-1').click();
					setUser({
						userName: '',
						passWord: '',
						passWord2: '',
						classMajor: '',
						fullName: '',
						mssv: '',
						major: '',
					});
					setImage({preview: '', raw: ''});
				}
			})
			.catch((error) => {
				console.log(error);
				if (error) {
					if (error.response.data !== undefined) {
						swal(
							'Lỗi tạo tài khoản',
							`${
								error.response.data.userName ||
								error.response.data.mssv ||
								error.response.data.passWord2 ||
								error.response.data.fullName ||
								error.response.data.major ||
								error.response.data.classMajor
							}`,
							'error',
						);
					}
				}
			});
	};

	const onFinish = (e) => {
		console.log(e);
		e.preventDefault();
		let formData = new FormData();
		formData.append('userName', userName);
		formData.append('passWord', passWord);
		formData.append('passWord2', passWord2);
		// formData.append("imageClub", imageClub);
		formData.append('classMajor', classMajor);
		formData.append('mssv', mssv);
		formData.append('major', major);
		formData.append('fullName', fullName);
		formData.append('avataUser', image.raw);
		handleSubmit(formData, '');

		// console.log(
		//  userName +
		//    ' - ' +
		//    passWord +
		//    ' - ' +
		//    passWord2 +
		//    ' - ' +
		//    classMajor +
		//    ' - ' +
		//    fullName +
		//    ' - ' +
		//    mssv +
		//    ' - ' +
		//    major,
		// );
	};

	const onChangePicture = (value) => {
		setPicture(value);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	const onFocusOut = () => {
		onClearForm();
		setUser({
			...user,
			userName: '',
			passWord: '',
			passWord2: '',
			classMajor: '',
			fullName: '',
			mssv: '',
			major: '',
		});
	};

	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
			onExited={onFocusOut}
		>
			{' '}
			<Container>
				<Row>
					<Col sm={12} xs={12} xl={7}>
						<Picture picture={picture} userLogin={userLogin} />
					</Col>

					<Col sm={12} xs={12} xl={5}>
						<Tabs defaultActiveKey='1' onChange={onChangePicture}>
							<TabPane tab='ĐĂNG NHẬP' key='1'>
								{/* Form */}
								<form
									className='text-center'
									action='#!'
									name='basic'
									initialValues={{remember: true}}
									onFinish={(event) => props.handleSubmit(event)}
									onFinishFailed={onFinishFailed}
								>
									{bugFromLogin ? (
										<p style={{color: 'red'}}>
											{bugFromLogin === 'UserName is not exist'
												? 'Tên đăng nhập không tồn tại!'
												: bugFromLogin === 'Password incorrect'
												? 'Sai mật khẩu!'
												: bugFromLogin}
										</p>
									) : (
										''
									)}
									{/* Tên tài khoản */}
									<div className='md-form'>
										<input
											type='text'
											id='materialLoginFormEmail'
											className='form-control'
											name='username'
											value={props.username}
											onChange={props.handleChange}
											required
										/>

										<label htmlFor='materialLoginFormEmail'>
											Tên tài khoản
										</label>
									</div>
									{/* Password */}
									<div className='md-form'>
										<input
											type='password'
											id='materialLoginFormPassword'
											className='form-control'
											name='password'
											value={props.password}
											onChange={props.handleChange}
											required
										/>
										<label htmlFor='materialLoginFormPassword'>Mật khẩu</label>
									</div>
									<div className='d-flex justify-content-around'>
										<div></div>
									</div>
									{/* Sign in button */}
									<button
										className='btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0'
										type='submit'
										onClick={
											props.password && props.username
												? props.handleSubmit
												: false
										}
									>
										Đăng nhập
									</button>
								</form>
								{/* Form */}
							</TabPane>

							{/* Đăng ký */}
							<TabPane tab='ĐĂNG KÝ' key='2'>
								{/* Form */}
								<form
									className='text-center'
									style={{color: '#757575'}}
									name='basic'
									onSubmit={(event) => onFinish(event)}
								>
									{/* Tên tài khoản  */}
									<div className='md-form mt-3'>
										<input
											type='text'
											id='materialContactFormName'
											className='form-control'
											value={user.userName}
											onChange={updateField}
											name='userName'
										/>
										<label htmlFor='materialContactFormName'>
											Tên tài khoản
										</label>
									</div>

									{/* Mật khẩu  */}
									<div className='md-form mt-3'>
										<input
											type='password'
											id='materialContactFormPass'
											className='form-control'
											value={user.passWord}
											onChange={updateField}
											name='passWord'
											minLength={6}
										/>
										<label htmlFor='materialContactFormPass'>Mật khẩu</label>
									</div>

									{/* Nhập lại mật khẩu  */}
									<div className='md-form mt-3'>
										<input
											type='password'
											id='materialContactFormPass2'
											className='form-control'
											value={user.passWord2}
											onChange={updateField}
											name='passWord2'
											minLength={6}
										/>
										<label htmlFor='materialContactFormPass2'>
											Nhập lại mật khẩu
										</label>
									</div>

									{/* Họ tên  */}
									<div className='md-form mt-3'>
										<input
											type='text'
											id='materialContactFormFullName'
											className='form-control'
											value={user.fullName}
											onChange={updateField}
											name='fullName'
										/>
										<label htmlFor='materialContactFormFullName'>Họ tên</label>
									</div>

									{/* Mã số sinh viên  */}
									<div className='md-form mt-3'>
										<input
											type='text'
											id='materialContactFormMssv'
											className='form-control'
											value={user.mssv}
											onChange={updateField}
											name='mssv'
										/>
										<label htmlFor='materialContactFormMssv'>
											Mã số sinh viên
										</label>
									</div>

									{/* Chuyên ngành  */}
									<div className='md-form mt-3'>
										<input
											type='text'
											id='materialContactFormMajor'
											className='form-control'
											value={user.major}
											onChange={updateField}
											name='major'
										/>
										<label htmlFor='materialContactFormMajor'>
											Chuyên ngành
										</label>
									</div>

									{/* Lớp  */}
									<div className='md-form mt-3'>
										<input
											type='text'
											id='materialContactFormClass'
											className='form-control'
											value={user.classMajor}
											onChange={updateField}
											name='classMajor'
										/>
										<label htmlFor='materialContactFormClass'>Lớp</label>
									</div>

									{/* Avatar  */}

									<div className='avatar-upload mt-4'>
										<label
											className='label-avatar-upload'
											htmlFor='upload-button'
										>
											Avatar
										</label>
										<input
											required
											name='avataUser'
											type='file'
											id='upload-button'
											onChange={handleChange}
										/>
									</div>

									{/* Button */}

									<ButtonRST
										style={{width: '100%'}}
										color='primary'
										type='submit'
										className='btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect '
									>
										Đăng Ký
									</ButtonRST>
								</form>
								{/* Form */}

								{/* Form */}
							</TabPane>
						</Tabs>
					</Col>
				</Row>
			</Container>
		</Modal>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		RegistStudents: (
			userName,
			passWord,
			passWord2,
			classMajor,
			fullName,
			mssv,
			major,
		) => {
			dispatch(
				RegistStudents(
					userName,
					passWord,
					passWord2,
					classMajor,
					fullName,
					mssv,
					major,
				),
			);
		},
		loginStudent: (userName, passWord) =>
			dispatch(loginStudent(userName, passWord)),
	};
};
const mapStateToProps = (state) => {
	return {
		userRegist: state.userRegist,
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MyVerticallyCenteredModal);
