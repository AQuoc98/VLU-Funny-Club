import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './detailEvent.css';
import Carousel from 'react-bootstrap/Carousel';
import {FiEdit} from 'react-icons/fi';
import {RiMapPinTimeLine} from 'react-icons/ri';

import {Container, Row, Col, Form} from 'react-bootstrap';
import {Rate, Button, Tooltip} from 'antd';
import {Link} from 'react-router-dom';

import {CalendarOutlined} from '@ant-design/icons';
import Axios from 'axios';

const DetailEvent = ({event}) => {
	const [allEvent, setAllEvent] = useState([]);
	const [club, setClub] = useState('');
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	var eventEceptExistEvent = (allEvent || [])
		.filter((item) => {
			return item.eventId._id !== event._id && item.eventId.isActive === true;
		})
		.splice(0, 3);
	useEffect(() => {
		const Authorization = localStorage.getItem('Authorization');
		Axios({
			method: 'GET',
			url: `https://team11-api.azurewebsites.net/api/club/getClubById/${event.Club}`,
			headers: {
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((res) => {
				setClub(res.data);
				setAllEvent(res.data.event);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Fragment>
			<Header />
			{/* Body */}
			{/* Banner : lấy 1 phần css bên clubdetail */}
			{/* <Container>
				<Row>
					<Col sm='12'>
						<div className='club-banner-1'>
							<div className='club-banner-2'>
								<img src={club.clubImage} className='img-banner-detailevent' />
							</div>
							<div className='club-avatar'>
								<img src={club.clubLogo} className='img-avatar' />
								<h2 className='club-name'>{club.clubName}</h2>
								<div>
									<Rate autoFocus={true} value={1} disabled />
								</div>
								<Link to={`/club-detail/${event.Club}`}>
									<Button type='primary' className='introduce-button'>
										ĐẾN CÂU LẠC BỘ
									</Button>
								</Link>
							</div>
						</div>
					</Col>
				</Row>
			</Container> */}

			<Container>
				<Col sm={12} xs={12}>
					<div className='club-banner-1'>
						<div className='club-banner-2'>
							<img src={club.clubImage} className='img-banner-detailclub' />
						</div>

						<div className='club-avatar'>
							<img src={club.clubLogo} className='img-avatar' />
							<h2 className='club-name'>{club.clubName}</h2>
							<div>
								<Rate autoFocus={true} value={club.memberRate} disabled />
							</div>
							<Link to={`/club-detail/${event.Club}`}>
								<Button type='primary' className='introduce-button'>
									ĐẾN CÂU LẠC BỘ
								</Button>
							</Link>
						</div>
					</div>
				</Col>
			</Container>

			{/* Content */}
			<Container className='container-detail-event'>
				{/* Sự kiện mà người dùng xem chi tiết */}

				<Col xl={{span: 8, offset: 2}} xs={12} md={12} className='detail-event'>
					<Row>
						<Col sm={12} xl={12}>
							<div className='detailevent-title'>{event.eventTitle}</div>
						</Col>
					</Row>

					<Row>
						<Col xs={12} xl={6}>
							<Row>
								<Col lg={2} xs={2} xl={2}>
									<div className='detailevent-icondatetime'>
										<RiMapPinTimeLine />
									</div>
								</Col>
								<Col lg={10} xs={10} xl={10}>
									<div className='detailevent-datetime'>
										<h5> THỜI GIAN VÀ ĐỊA ĐIỂM </h5>
										<p>{event.time && event.time.replace(',', ' - ')}</p>
										<p className='detailevent-datetime-address'>
											{event.eventAddress}
										</p>
									</div>
								</Col>
							</Row>

							<Row>
								<Col lg={2} xs={2} xl={2}>
									<div className='detailevent-iconedit'>
										<FiEdit />
									</div>
								</Col>
								<Col lg={10} xs={10} xl={10}>
									<div className='detailevent-description'>
										<h5> Mô Tả </h5>
										<p>{event.eventDesc}</p>
									</div>
								</Col>
							</Row>
						</Col>

						<Col xs={12} xl={6} className='detail-event-img'>
							<img src={event.eventImage} />
						</Col>
					</Row>
				</Col>
			</Container>
			<Container>
				<Row>
					{/* Dùng 1 số phần css bên club detail nhé */}
					{eventEceptExistEvent.map((item, index) => {
						console.log(eventEceptExistEvent.eventId);
						return (
							<Col sm={12} xl={4} key={index}>
								<div className='detailevent-card '>
									<Link to={`/event-detail/${item.eventId._id}`}>
										<div className='cover-img'>
											<img
												className='br-left-right detailevent-card-img'
												alt=''
												src={item.eventId.eventImage}
											/>
										</div>

										<p className='detailevent-card-title'>
											{item.eventId.eventTitle}
										</p>
										<p className='detailevent-card-description'>
											{item.eventId.eventDesc}
										</p>
									</Link>
								</div>
							</Col>
						);
					})}
					<Col sm='12'>
						<div className='club-new-event-link-more'>
							<Link to={`/events/${event.Club}`}>Xem thêm ...</Link>
						</div>
					</Col>
				</Row>
			</Container>
			<Footer />
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	// blabla: state.blabla,
});

const mapDispatchToProps = (dispatch) => ({
	// fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);
