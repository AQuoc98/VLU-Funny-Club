import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import './AllEventsOfSpecicClubContainer.styles.css';
import AllEventsOfSpecicClub from '../../components/Event/AllEventOfSpecificClub/AllEventOfSpecificClub';
import {Fragment} from 'react';
import {actGetAllClubRequest} from '../../Redux/actions/user-clubs.action';
import {actGetAllEventRequest} from '../../Redux/actions/user-events.action';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/Pagination';
import {Col, Row, Container} from 'react-bootstrap';
import {Input, Button, Rate} from 'antd';
import {Link} from 'react-router-dom';
const AllEventsOfSpecicClubMain = ({
	match,
	history,
	getAllclbs,
	userclubs,
	getAllEvent,
	userEvents,
}) => {
	useEffect(() => {
		getAllclbs();
		getAllEvent();
	}, []);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [eventsPerPage, setEventsPerPage] = useState(9);
	const [togglePagination, setTogglePagination] = useState(true);

	const EventActive = userEvents.filter(
		(item) => item.Club === match.params.id && item.isActive === true,
	);

	const indexOfLastEvent = currentPage * eventsPerPage;
	const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
	const currentEvents = EventActive.slice(indexOfFirstEvent, indexOfLastEvent);

	const disabledPagination = (value) => {
		setTogglePagination(value);
	};
	//search
	const [filterText, setFilterText] = useState('');
	const filteredItems = EventActive.filter(
		(item) =>
			item.eventTitle.toLocaleLowerCase().includes(filterText) ||
			item.eventDesc.toLocaleLowerCase().includes(filterText),
	);
	const itemsToDisplay = filterText ? filteredItems : EventActive;
	//pagination after search
	const itemsToDisplay2 =
		filterText && itemsToDisplay !== EventActive ? filteredItems : [];

	const [currentPageAS, setCurrentPageAS] = useState(1);
	const [eventsPerPageAS, setEventsPerPageAS] = useState(9);
	const indexOfLastEventAS = currentPageAS * eventsPerPageAS;
	const indexOfFirstEventAS = indexOfLastEventAS - eventsPerPageAS;
	const currentEventsAS = itemsToDisplay2
		.filter((item) => {
			return item.isActive === true;
		})
		.slice(indexOfFirstEventAS, indexOfLastEventAS);
	//
	const paginate = (number) => {
		if (filterText.length > 0 && currentEventsAS.length > 0) {
			setCurrentPageAS(number);
		} else {
			setCurrentPage(number);
		}
	};
	return (
		<Fragment>
			<Header />

			{userclubs
				.filter((item) => {
					return item._id === match.params.id;
				})
				.map((club, index) => {
					console.log(club);
					return (
						<Fragment>
							{/* <Container>
                <img src={club.clubImage} className="img-banner" />
              </Container> */}

							<Container>
								<Col sm={12} xs={12}>
									<div className='club-banner-1'>
										<div className='club-banner-2'>
											<img
												src={club.clubImage}
												className='img-banner-detailclub'
											/>
										</div>

										<div className='club-avatar'>
											<img src={club.clubLogo} className='img-avatar' />
											<h2 className='club-name'>{club.clubName}</h2>
											<div>
												<Rate
													autoFocus={true}
													value={club.memberRate}
													disabled
												/>
											</div>
											{/* Xử lý lại giúp đoạn này */}
											<Link to={`/club-detail/${club._id}`}>
												<Button type='primary' className='introduce-button'>
													ĐẾN CÂU LẠC BỘ
												</Button>
											</Link>
										</div>
									</div>
								</Col>
							</Container>

							<Container>
								<h1 className='home-body-title'>
									TẤT CẢ SỰ KIỆN CỦA {club.clubName.toUpperCase()}
								</h1>
								<br />
								<br />
								<Input
									placeholder='Tìm kiếm sự kiện'
									value={filterText}
									onChange={(e) =>
										setFilterText(e.target.value.toLocaleLowerCase())
									}
								/>
							</Container>
							{/* <Container>
                <Link to={`/club-detail/${match.params.id}`}>
                  <button>Trở về</button>
                </Link>
              </Container> */}
						</Fragment>
					);
				})}

			<AllEventsOfSpecicClub
				match={match}
				events={currentEvents}
				disabledPagination={disabledPagination}
				itemsToDisplay={itemsToDisplay}
				filterText={filterText}
				currentEventsAS={currentEventsAS}
			/>

			<Col sm='12'>
				<div className='index-event'>
					{togglePagination ? (
						<Pagination
							currentPage={
								filterText.length > 0 && currentEventsAS.length > 0
									? currentPageAS
									: currentPage
							}
							itemsPerPage={9}
							totalitems={
								filterText.length > 0 && currentEventsAS.length > 0
									? itemsToDisplay2.length
									: userEvents.filter((item) => {
											return item.isActive === true;
									  }).length
							}
							paginate={paginate}
						/>
					) : (
						''
					)}
				</div>
			</Col>
			<Footer />
			{/* <Header />
			<Container>
				<Col sm='12'>
					<div className='eventofclub-banner-1'>
						<div className='eventofclub-banner-2'>
							<img
								src={`https://i.pinimg.com/originals/c4/91/ac/c491ac45a64f8ca707335585333b0388.jpg`}
								className='img-banner'
							/>
						</div>
					</div>
					<h1 className='event-home-body-title'>TẤT CẢ SỰ KIỆN CỦA {`mẫn`}</h1>
					<br />
					<br />
					<Input
						placeholder='Tìm kiếm sự kiện'
						value={filterText}
						onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
					/>
					<Row>
						{userclubs
							.filter((item) => {
								return item._id === match.params.id;
							})
							.map((name, index) => {
								return (
									<AllEventsOfSpecicClub
										match={match}
										name={name}
										key={index}
										events={currentEvents}
										disabledPagination={disabledPagination}
										itemsToDisplay={itemsToDisplay}
										filterText={filterText}
									/>
								);
							})}
					</Row>
					<Col sm='12'>
						<div className='index-event'>
							{togglePagination ? (
								<Pagination
									currentPage={currentPage}
									itemsPerPage={eventsPerPage}
									totalitems={
										filterText.length > 0 && itemsToDisplay.length > 0
											? itemsToDisplay.length
											: userEvents.filter((item) => {
													return item.isActive === true;
											  }).length
									}
									paginate={paginate}
								/>
							) : (
								''
							)}
						</div>
					</Col>
				</Col>
			</Container>
			<Footer /> */}
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		userclubs: state.userClubs,
		userEvents: state.userEvents,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllclbs: () => dispatch(actGetAllClubRequest()),
		getAllEvent: () => {
			dispatch(actGetAllEventRequest());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AllEventsOfSpecicClubMain);
