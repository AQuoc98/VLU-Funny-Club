import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {MdPhotoCamera} from 'react-icons/md';
import {useState, useEffect} from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import BarLoader from 'react-spinners/BarLoader';
import {css} from '@emotion/core';
import {withRouter} from 'react-router';
import "./UpdateClubWithLogo.styles.css"

const UpdateClubWithLogo = (props) => {
	const {id, history, onlyShow} = props;
	const override = css`
		position: relative;
		top: 175px;
		margin: auto;
		z-index: 1;
	`;
	const [isShow, setIsShow] = useState(false);
	const [imageLogo, setImageLogo] = useState({preview: '', raw: ''});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setImageLogo({preview: props.data, raw: props.data});
	}, [props.data]);

	let sectionStyle = {
		backgroundImage: `url(${imageLogo.preview})`,
	};

	const handleUpdateLogo = (e) => {
		e.preventDefault();
		setIsLoading(true);
		const Authorization = localStorage.getItem('Authorization');
		axios({
			method: 'PUT',
			url: `https://team11-api.azurewebsites.net/api/club/updateFileLogo/ImageClub/${id}`,
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
			},
			data: formData,
		})
			.then((res) => {
				setIsShow(false);
				setIsLoading(false);
				cogoToast.success('Cập nhật logo thành công');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// FomrData
	let formData = new FormData();
	formData.append('imageClub', imageLogo.raw);

	// Set file
	const handleChangeImg = (e) => {
		if (e.target.files.length) {
			setImageLogo({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
			setIsShow(true);
		}
	};
	const handleCancelLogo = (e) => {
		e.preventDefault();
		setIsShow(false);
		setImageLogo({preview: props.data, raw: props.data});
	};

	let classImg = 'img_logo_club adminsytem-update-logo';
	if (isLoading === true) {
		classImg += ' blur_back';
	}
	return (
		<div className={classImg} style={sectionStyle}>
			{onlyShow ? (
				<Fragment></Fragment>
			) : (
				<BarLoader
					css={override}
					height={4}
					width={150}
					color={'#1890ff'}
					loading={isLoading}
				></BarLoader>
			)}
			{onlyShow ? (
				<MdPhotoCamera style={{fontSize: '1.5em'}}></MdPhotoCamera>
			) : (
				<label
					for='upload_photo_logo'
					className='edit_background_header edit_logo'
				>
					<MdPhotoCamera style={{fontSize: '1.5em'}}></MdPhotoCamera>
				</label>
			)}

			{onlyShow ? (
				<Fragment></Fragment>
			) : (
				<input
					type='file'
					name='photo_logo'
					id='upload_photo_logo'
					style={{display: 'none'}}
					onChange={handleChangeImg}
				/>
			)}

			{isShow ? (
				<div className='edit_log'>
					<a href='' className='save_log' onClick={handleUpdateLogo}>
						Lưu
					</a>
					<a href='' className='cancel_log' onClick={handleCancelLogo}>
						Thoát
					</a>
				</div>
			) : (
				<Fragment></Fragment>
			)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	// blabla: state.blabla,
});

const mapDispatchToProps = (dispatch) => ({
	// fnBlaBla: () => dispatch(action.name()),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UpdateClubWithLogo),
);
