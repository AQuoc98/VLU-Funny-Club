import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';

import './header.css';
import {
	loginStudent,
	logOut,
	getProfileFetch,
	setCurrentUser,
} from '../../Redux/actions/student.action';
import {Link} from 'react-router-dom';
import MyVerticallyCenteredModal from '../Modal/Modal';
import {decode} from 'jsonwebtoken';
import JwtDecode from 'jwt-decode';
import {BsFillCaretDownFill} from 'react-icons/bs';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			modalShow: false,
		};
	}

	handleChange = (event) => {
		var target = event.target;
		var username = target.name;
		var password = target.value;
		this.setState({
			[username]: password,
		});
	};
	setModalShow = (value) => {
		this.setState({
			modalShow: value,
		});
	};

	handleSubmit = (event, isAuthenticated) => {
		event.preventDefault();
		this.validateLogin();
		const {username, password} = this.state;
		this.props.loginStudent(username, password);
	};

	validateLogin = (isAuthenticated) => {
		if (isAuthenticated === true) {
			setTimeout(() => {
				this.setModalShow(false);
			}, 100);
		}
	};

	componentDidMount = () => {
		//goi set current user
		const Authorization = localStorage.getItem('Authorization');
		if (!Authorization) return;
		const decoded = JwtDecode(Authorization);
		this.props.getProfileFetch(decoded.payload.id);
		this.props.setCurrentUser(decoded);
	};

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
		const {userLogin} = nextProps;
		// console.log(userLogin.profile.id);
		if (userLogin && userLogin.isAuthenticated) {
			this.validateLogin(userLogin.isAuthenticated);
		}
	}

	LogOut = () => {
		window.location.reload(true);
		this.props.logOut();
	};

	onClearForm = () => {
		this.setState({
			username: '',
			password: '',
		});
	};

	render() {
		const {
			userLogin,
			userRegist,
			getUserInfoById,
			errorsreducer,
			bugfromlogin,
			bugfromregist,
			getProfileFetch,
		} = this.props;
		const buglogin = bugfromlogin.bug;
		const bugregist = bugfromregist.bug;
		const Authorization = localStorage.getItem('Authorization');
		const AfterDecoded = decode(Authorization);
		const Payload = AfterDecoded ? AfterDecoded.payload : '';
		const UserType = Payload.userType;
		const AdminClick =
			UserType === 'admin' ? (
				<Link to={`/adminsystem`} className='dropdown-submenu'>
					TRUY CẬP VÀO ADMIN SYSTEM
				</Link>
			) : (
				''
			);

		const AdminClubClick =
			UserType === 'adminClub' ? (
				<Link to={`/adminClub`} className='dropdown-submenu'>
					TRUY CẬP VÀO ADMIN CLUB
				</Link>
			) : (
				''
			);

		const StaffClick =
			UserType === 'staff' ? (
				<Link to={`/staff`} className='dropdown-submenu'>
					TRUY CẬP VÀO STAFF
				</Link>
			) : (
				''
			);

		// khi nào sẽ xuất hiẹn nút đăng nhập khi nào hiện thông tin người dùng
		var userArea = Authorization ? (
			<Nav className='navbar-header'>
				<div className='dropdown'>
					<Link to='/' className='dropdown-nav-link hvr-underline-from-center'>
						<span>
							{UserType
								? UserType === 'admin'
									? 'Hello Admin !'
									: UserType === 'staff'
									? `Hello Staff`
									: Payload
									? `${Payload.mssv} - ${Payload.fullName}`
									: ''
								: 'Hết hạn sử dụng vui lòng đăng nhập lại!'}
						</span>
					</Link>

					<div className='dropdown-content-right'>
						{UserType ? (
							UserType === 'staff' ? (
								''
							) : (
								<Link to={`/user/${Payload.id}`} className='dropdown-submenu'>
									THÔNG TIN CÁ NHÂN
								</Link>
							)
						) : (
							''
						)}

						{AdminClick}
						{AdminClubClick}
						{StaffClick}
						<Link to='/' onClick={this.LogOut} className='dropdown-submenu'>
							ĐĂNG XUẤT
						</Link>
					</div>
				</div>
			</Nav>
		) : (
			<Nav onClick={() => this.setModalShow(true)} className='navbar-header'>
				<Link className='dropdown-nav-link hvr-underline-from-center'>
					ĐĂNG NHẬP
				</Link>
			</Nav>
		);

		return (
			<div>
				<Navbar expand='lg'>
					<Navbar.Brand>
						<Link to='/'>
							<img
								src='/images/logvlu2.png'
								alt='Văn Lang University'
								className='header-logo'
							/>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mr-auto'>
							<Nav className='navbar-header'>
								<Link
									to='/'
									className='dropdown-nav-link hvr-underline-from-center'
								>
									TRANG CHỦ
								</Link>
							</Nav>

							<Nav className='navbar-header'>
								<Link
									to='/introduce'
									className='dropdown-nav-link hvr-underline-from-center '
								>
									GIỚI THIỆU
								</Link>
							</Nav>

							<Nav className='navbar-header'>
								<div className='dropdown'>
									<Link className='dropdown-nav-link hvr-underline-from-center'>
										CÂU LẠC BỘ{' '}
									</Link>
									<div className='dropdown-content-left'>
										<Link to='/clubs/truong' className='dropdown-submenu '>
											TRƯỜNG
										</Link>
										<Link to='/clubs/doanhoi' className='dropdown-submenu '>
											ĐOÀN HỘI
										</Link>
										<Link to='/clubs/khoa' className='dropdown-submenu '>
											KHOA
										</Link>
									</div>
								</div>
							</Nav>
							<Nav className='navbar-header'>
								<Link
									to='/events'
									className='dropdown-nav-link hvr-underline-from-center'
								>
									SỰ KIỆN
								</Link>
							</Nav>
						</Nav>

						<Nav>{userArea}</Nav>
						{/* formdangnhap */}
						<div>
							<MyVerticallyCenteredModal
								userLogin={userLogin}
								show={this.state.modalShow}
								onHide={() => this.setModalShow(false)}
								handleChange={this.handleChange}
								username={this.state.username}
								password={this.state.password}
								handleSubmit={this.handleSubmit}
								modalShow={this.state.modalShow}
								buglogin={buglogin}
								bugregist={bugregist}
								onClearForm={this.onClearForm}
							/>
						</div>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorsreducer: state.errorsReducer,
		userLogin: state.userLogin,
		userRegist: state.userRegist,
		getUserInfoById: state.getUserInfoById,
		bugfromlogin: state.BugFromLogin,
		bugfromregist: state.BugFromRegist,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginStudent: (userName, passWord) =>
			dispatch(loginStudent(userName, passWord)),
		logOut: () => {
			dispatch(logOut());
		},
		setCurrentUser: (decoded) => {
			dispatch(setCurrentUser(decoded));
		},
		getProfileFetch: (id) => {
			dispatch(getProfileFetch(id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
