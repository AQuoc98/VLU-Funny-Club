import React, {useEffect, useState, Fragment} from 'react';
import Axios from 'axios';
import {useForm, useWatch} from 'react-hook-form';
import {connect} from 'react-redux';
import {Table, Button, Container} from 'react-bootstrap';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import {Button as ButtonAnt} from 'antd';
import swal from 'sweetalert';
import {Link, withRouter} from 'react-router-dom';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import cogoToast from 'cogo-toast';
import {FcUndo} from 'react-icons/fc';
import './StudentDecent.styles.css';
import Pagination from '../../../../Pagination/Pagination';

const StudentDecent = (props) => {
	const {id, data, clubs, history, getUserInfoById} = props;
	const {register, handleSubmit, watch, errors, control} = useForm();
	const [isChoosen, setIsChoosen] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [clubsPerPage, setClubsPerPage] = useState(6);

	const indexOfLastClub = currentPage * clubsPerPage;
	const indexOfFirstClub = indexOfLastClub - clubsPerPage;
	const currentClubs = clubs
		.filter((item) => {
			return (
				item.isActive !== false &&
				item.students.filter((item) => {
					return item.studentId._id === id && item.isAdmin === true;
				}).length === 0
			);
		})
		.slice(indexOfFirstClub, indexOfLastClub);
	const paginate = (number) => {
		setCurrentPage(number);
	};
	const IsolateReRender = ({control}) => {
		var firstName = useWatch({
			control,
			name: 'clubGroupType', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
			defaultValue: `${data.userType}`, // default value before the render
		});
		if (firstName === 'user') {
			return (
				<Fragment>
					<Table bordered hover responsive>
						<thead>
							<tr>
								<th>ID</th>
								<th>Tên Câu lạc bộ</th>
								<th>Mô tả câu lạc bộ</th>
								<th>chọn làm admin</th>
							</tr>
						</thead>
						{currentClubs.map((club, index) => {
							console.log(
								club.students.filter((item) => {
									return item.studentId._id === id && item.isAdmin === true;
								}).length,
							);
							return (
								<tbody key={index}>
									<tr>
										<td>
											{isChoosen === club._id ? (
												<ButtonAnt
													type='primary'
													icon={<CheckOutlined />}
													size={'large'}
												/>
											) : (
												club._id
											)}
										</td>
										<td>{club.clubName}</td>
										<td>{club.clubDesc}</td>
										<td>
											{isChoosen === club._id ? (
												<Button
													value={club._id}
													onClick={(e) => {
														setIsChoosen('');
													}}
													className='btn_update_info'
												>
													Xoá Chọn
												</Button>
											) : (
												<Button
													value={club._id}
													onClick={(e) => onChooseClub(e)}
													className='btn_update_info'
													style={{width: 127}}
												>
													Chọn
												</Button>
											)}
										</td>
									</tr>
								</tbody>
							);
						})}
					</Table>
					<Pagination
						currentPage={currentPage}
						itemsPerPage={clubsPerPage}
						totalitems={
							clubs.filter((item) => {
								return (
									item.isActive !== false &&
									item.students.filter((item) => {
										return item.studentId._id === id && item.isAdmin === true;
									}).length === 0
								);
							}).length
						}
						paginate={paginate}
					/>
				</Fragment>
			);
		} else {
			return <Fragment></Fragment>;
		}
	};
	const onChooseClub = (e) => {
		e.preventDefault();
		const idChoosen = e.target.value;
		setIsChoosen(idChoosen);
	};
	const onSubmit = async (data) => {
		if (data.userType === 'adminClub') {
			const Authorization = localStorage.getItem('Authorization');
			if (Authorization) {
				const ClubtoDeleteAdminClub = await clubs
					.filter((item) => {
						return (
							item.isActive !== false &&
							item.students.filter((item) => {
								return item.studentId._id === id && item.isAdmin === true;
							}).length > 0
						);
					})
					.map((club) => {
						return club._id;
					});
				const clubToDelete = `${ClubtoDeleteAdminClub}`;
				Axios({
					method: 'PUT',
					url: `https://team11-api.azurewebsites.net/api/adminClub/removeAdminClub/${id}/${clubToDelete}`,
					headers: {
						Accept: 'application/json',
						Authorization: `${Authorization}`,
					},
				})
					.then((res) => {
						if (res.data) {
							history.push('/adminsystem/StudentSearch');
							cogoToast.success('Xoa admin club thanh cong!');
						}
					})
					.catch((error) => {
						console.log(error);
						cogoToast.error(`${error ? error : ''}`);
					});
			}
		} else {
			if (isChoosen === '') {
				cogoToast.error('Chưa chọn câu lạc bộ!');
			} else {
				setIsLoading(true);
				const Authorization = localStorage.getItem('Authorization');
				if (Authorization) {
					Axios({
						method: 'POST',
						url: `https://team11-api.azurewebsites.net/api/adminClub/accessAdminForClub/${id}/${isChoosen}`,
						headers: {
							Accept: 'application/json',
							Authorization: `${Authorization}`,
						},
					})
						.then((res) => {
							console.log(res.data);
							if (res.data) {
								history.push('/adminsystem/StudentSearch');
								setIsLoading(false);
								cogoToast.success('Cập nhât quyền thành công!');
							}
						})
						.catch((error) => {
							console.log(error);
							setIsChoosen('');
							setIsLoading(false);
							cogoToast.error(`${error ? error.response.data.msg : ''}`);
						});
				}
			}
		}
	};
	const Select = () => {
		return (
			<select
				className='input_update'
				name='clubGroupType'
				defaultValue={data.userType}
				ref={register({required: true})}
				style={{width: '100%'}}
			>
				{/* khi có nhìu option hơn thì chỉnh value ở phía dưới thành đúng với giá trị kế bên  */}
				<option value='user'>adminClub</option>
			</select>
		);
	};

	const ElementForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)} className='form-authorization'>
				<h2 className='title-dashboard'>PHÂN QUYỀN TÀI KHOẢN</h2>
				<h5 className='h5_update_info foradmin_sys'>
					{data.userType === 'staff' ? 'Tên tài khoản' : 'Họ và tên'}
				</h5>

				<input
					className='input_update'
					name='userName'
					value={data.userType === 'staff' ? data.userName : data.info.fullName}
					ref={register}
					disabled
				/>

				{data.userType === 'staff' ? (
					''
				) : (
					<Fragment>
						{' '}
						<h5 className='h5_update_info foradmin_sys'>Mã số sinh viên</h5>
						<input
							className='input_update'
							name='mssv'
							value={data.mssv}
							ref={register}
							disabled
						/>
					</Fragment>
				)}

				<h5 className='h5_update_info foradmin_sys'>Chức vụ hiện tại</h5>
				<input
					className='input_update'
					name='userType'
					value={data.userType}
					ref={register}
					disabled
				/>
				{data.userType === 'user' ? (
					<Fragment>
						<h5 className='h5_update_info foradmin_sys'>Chọn chức năng mới</h5>
						<Select />
					</Fragment>
				) : (
					''
				)}

				<br />
				<br />
				<IsolateReRender control={control} />

				<div style={{display: 'flex'}}>
					<Container>
						{data.userType === 'staff' ? (
							''
						) : (
							<input
								type='submit'
								className='btn_update_info'
								// style={{margin: 10}}
								value={
									data.userType === 'adminClub' ? 'Trở thành user' : 'Cấp quyền'
								}
							/>
						)}
						&nbsp;
						<Link to='/adminsystem/StudentSearch'>
							<ButtonAnt type='primary' size={'large'}>
								<FcUndo /> &nbsp; Trở về
							</ButtonAnt>
						</Link>
					</Container>
				</div>
			</form>
		);
	};

	const antIcon = <LoadingOutlined style={{fontSize: 100}} spin />;
	return (
		<Fragment>
			{isLoading ? <Spin indicator={antIcon} /> : <ElementForm />}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	getUserInfoById: state.getUserInfoById,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(StudentDecent),
);
