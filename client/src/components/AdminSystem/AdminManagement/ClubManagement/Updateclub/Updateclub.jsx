import React, {useEffect, Fragment} from 'react';
import Axios from 'axios';
import {useState} from 'react';
import {Container, Row} from 'reactstrap';
import {useForm, Controller} from 'react-hook-form';
import {Input as AntdInput} from 'antd';
import cogoToast from 'cogo-toast';
import {withRouter, Link} from 'react-router-dom';
import UpdateClubWithLogo from './UpdateClubWithLogo/UpdateClubWithLogo';
import UpdateClubWithBannerContainer from './UpdateClubWithBanner';
import UpdateClubWithStructureContainer from './UpdateClubWithStructureImage/index';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import {Button as ButtonAnt} from 'antd';
import {AiOutlinePartition} from 'react-icons/ai';
import {AiOutlineRollback} from 'react-icons/ai';
import './updateclub.css';
const Updateclub = (props) => {
	const {id, history} = props;
	const [clubToUpDate, setClubToUpDate] = useState('');
	useEffect(() => {
		const Authorization = localStorage.getItem('Authorization');
		Axios({
			method: 'GET',
			url: `https://team11-api.azurewebsites.net/api/club/getClubById/${id}`,
			headers: {
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((res) => {
				// console.log(res.data);
				setClubToUpDate(res.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, [id]);
	//form-react-hook:
	const {register, handleSubmit, watch, errors, control} = useForm();
	const onSubmit = (data) => {
		console.log(data);
		const Authorization = localStorage.getItem('Authorization');
		if (Authorization) {
			Axios({
				method: 'PUT',
				url: `https://team11-api.azurewebsites.net/api/club/updateInfoText/${id}`,
				headers: {
					Accept: 'application/json',
					Authorization: `${Authorization}`,
				},
				data,
			})
				.then((res) => {
					history.push('/adminsystem/ClubSearch');
					cogoToast.success('Cập nhật thành công');
				})
				.catch((error) => {
					cogoToast.error(
						`${
							error.response.data.clubPhone
								? 'Vui lòng nhập đúng số điện thoại!'
								: ''
						}`,
					);
				});
		}
	};

	let Select = () => {
		return (
			<select
				className='input_update'
				defaultValue={`${clubToUpDate.clubGroupType}`}
				name='clubGroupType'
				ref={register({required: true})}
				style={{width: '100%'}}
			>
				<option value='khoa'>Khoa</option>
				<option value='doanhoi'>Đoàn hội</option>
				<option value='truong'>Trường</option>
			</select>
		);
	};
	return (
		<Container>
			<div className='club-banner-updateclub'>
				<UpdateClubWithBannerContainer
					id={id}
					data={clubToUpDate.clubImage}
					history={history}
				/>

				<UpdateClubWithLogo
					id={id}
					data={clubToUpDate.clubLogo}
					history={history}
				/>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* title */}
				<h5 className='h5_update_info foradmin_sys'>Tên câu lạc bộ</h5>
				<input
					className='input_update'
					name='clubName'
					defaultValue={clubToUpDate.clubName}
					ref={register({required: true})}
				/>
				{/* errors will return when field validation fails  */}
				{errors.clubName && (
					<span style={{color: 'red'}}> vui lòng nhập tên câu lạc bộ!</span>
				)}

				<h5 className='h5_update_info foradmin_sys'>Mô tả câu lạc bộ</h5>
				<textarea
					className='input_update'
					name='clubDesc'
					defaultValue={clubToUpDate.clubDesc}
					ref={register({required: true})}
				/>
				{/* errors will return when field validation fails  */}
				{errors.clubDesc && (
					<span style={{color: 'red'}}>Vui lòng nhập mô tả câu lạc bộ!</span>
				)}

				<h5 className='h5_update_info foradmin_sys'>Mục tiêu câu lạc bộ</h5>
				<textarea
					className='input_update'
					name='clubPurpose'
					defaultValue={clubToUpDate.clubPurpose}
					ref={register({required: true})}
				/>
				{/* errors will return when field validation fails  */}
				{errors.clubPurpose && (
					<span style={{color: 'red'}}>
						Vui lòng nhập mục tiêu của câu lạc bộ
					</span>
				)}

				<h5 className='h5_update_info foradmin_sys'>Chức năng câu lạc bộ</h5>
				<textarea
					className='input_update'
					name='clubFunction'
					defaultValue={clubToUpDate.clubFunction}
					ref={register({required: true})}
				/>
				{/* errors will return when field validation fails  */}
				{errors.clubFunction && (
					<span style={{color: 'red'}}>Vui lòng nhập chức năng câu lạc bộ</span>
				)}

				<h5 className='h5_update_info foradmin_sys'>Lịch sử câu lạc bộ</h5>
				<textarea
					className='input_update'
					name='clubHistory'
					defaultValue={clubToUpDate.clubHistory}
					ref={register({required: true})}
				/>
				{/* errors will return when field validation fails  */}
				{errors.clubHistory && (
					<span style={{color: 'red'}}>
						Vui lòng nhập lịch sử của câu lạc bộ
					</span>
				)}

				<h5 className='h5_update_info foradmin_sys'>
					Cấp của câu lạc bộ hiện tại
				</h5>
				<Select></Select>

				{/* errors will return when field validation fails  */}
				{errors.clubGroupType && (
					<span style={{color: 'red'}}>This field is required</span>
				)}

				<h5 className='h5_update_info foradmin_sys'>
					Số điện thoại câu lạc bộ
				</h5>
				<input
					type='number'
					className='input_update'
					name='clubPhone'
					defaultValue={clubToUpDate.clubPhone}
					ref={register({required: true})}
				/>
				{/* errors will return when field validation fails  */}
				{errors.clubPhone && (
					<span style={{color: 'red'}}>
						Vui lòng nhập số điện thoại câu lạc bộ
					</span>
				)}

				<h5 className='h5_update_info foradmin_sys'>Email câu lạc bộ</h5>
				<input
					type='email'
					className='input_update'
					name='clubEmail'
					defaultValue={clubToUpDate.clubEmail}
					ref={register({required: true})}
				/>
				{/* errors will return when field validation fails  */}
				{errors.clubEmail && (
					<span style={{color: 'red'}}>Vui lòng nhập email câu lạc bộ</span>
				)}

				<h5 className='h5_update_info foradmin_sys'>Facebook câu lạc bộ</h5>
				<input
					className='input_update'
					name='clubFace'
					defaultValue={clubToUpDate.clubFace}
					ref={register({required: true})}
				/>
				{/* errors will return when field validation fails  */}
				{errors.clubFace && (
					<span style={{color: 'red'}}>Vui lòng nhập facebook câu lạc bộ</span>
				)}

				{/* errors will return when field validation fails  */}
				{errors.exampleRequired && (
					<span style={{color: 'red'}}>This field is required</span>
				)}
				<div className='updateclub-btn'>
					<Link to={`/adminsystem/updateStructureImage/Club/${id}`}>
						<ButtonAnt type='primary' size={'large'}>
							<AiOutlinePartition /> &nbsp; Cập nhật cơ cấu câu lạc bộ
						</ButtonAnt>
					</Link>

					<input type='submit' className='btn_update_info' value='Cập nhật' />
				</div>
			</form>
		</Container>
	);
};

export default withRouter(Updateclub);
