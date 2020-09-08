import React, {useEffect, Fragment, useState} from 'react';
import ViewAllClubs from './ViewAllClubs';
import {connect} from 'react-redux';
import {Container, Col} from 'react-bootstrap';
import {actGetAllClubRequest} from '../../../Redux/actions/user-clubs.action';
import Header from '../../Header/Header';
import Banner from '../../Banner/banner';
import {Spin, Input, Tooltip} from 'antd';
import Footer from '../../Footer/Footer';
import Pagination from '../../Pagination/Pagination';
import {CloseOutlined} from '@ant-design/icons';
import "./viewallclub.css"

const ViewAllClubsSortBy = ({userClubs, match, getAllclbs}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [clubsPerPage, setClubsPerPage] = useState(9);
	const [togglePagination, setTogglePagination] = useState(true);
	const [filterText, setFilterText] = useState('');

	useEffect(() => {
		getAllclbs();
		setCurrentPage(1);
	}, [match.params.id]);
	const nameClub = match.params.id;
	// console.log(nameClub);
	//title
	const title = `CÂU LẠC BỘ CẤP ${
		nameClub.toUpperCase() === 'DOANHOI'
			? 'ĐOÀN HỘI'
			: nameClub.toUpperCase() === 'TRUONG'
			? 'TRƯỜNG'
			: nameClub.toUpperCase()
	}`;
	//phan trang
	var Clubs = [];

	Clubs = userClubs.filter((item) => {
		return item.clubGroupType === `${nameClub}` && item.isActive === true;
	});

	const indexOfLastClub = currentPage * clubsPerPage;
	const indexOfFirstClub = indexOfLastClub - clubsPerPage;
	const currentClubs = Clubs.slice(indexOfFirstClub, indexOfLastClub);
	//search
	const filteredItems = Clubs.filter(
		(item) =>
			item.isActive === true &&
			(item.clubDesc.toLocaleLowerCase().includes(filterText) ||
				item.clubName.toLocaleLowerCase().includes(filterText)),
	);

	const disabledPagination = (value) => {
		setTogglePagination(value);
	};

	const itemsToDisplay = filterText ? filteredItems : Clubs;

	//pagination after search
	const itemsToDisplay2 =
		filterText && itemsToDisplay !== Clubs ? filteredItems : [];
	const [currentPageAS, setCurrentPageAS] = useState(1);
	const [clubsPerPageAS, setClubsPerPageAS] = useState(9);

	const indexOfLastclubAS = currentPageAS * clubsPerPageAS;
	const indexOfFirstclubAS = indexOfLastclubAS - clubsPerPageAS;
	const currentclubsAS = itemsToDisplay2
		.filter((item) => {
			return item.isActive === true;
		})
		.slice(indexOfFirstclubAS, indexOfLastclubAS);
	//
	const paginate = (number) => {
		if (filterText.length > 0 && currentclubsAS.length > 0) {
			setCurrentPageAS(number);
		} else {
			setCurrentPage(number);
		}
	};

	return (
		<Fragment>
			<Header />
			<Banner />
			<Container>
				<h1 className='home-body-title-allclub'>{title}</h1>
				<br />
				<br />
				<Input
					placeholder='Tìm kiếm câu lạc bộ'
					value={filterText}
					onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
					suffix={
						<Tooltip title='Xoá tìm kiếm'>
							<CloseOutlined
								style={{color: 'rgba(0,0,0,.45)'}}
								onClick={(e) => setFilterText('')}
							/>
						</Tooltip>
					}
				/>
			</Container>
			{Clubs.length > 0 ? (
				<ViewAllClubs
					clubs={currentClubs}
					type={nameClub}
					disabledPagination={disabledPagination}
					itemsToDisplay={itemsToDisplay}
					filterText={filterText}
					currentclubsAS={currentclubsAS}
				/>
			) : (
				<div style={{textAlign: 'center'}}>
					<h3>hiện tại chưa có câu lạc bộ nào!</h3>
				</div>
			)}
			{togglePagination ? (
				<Pagination
					currentPage={
						filterText.length > 0 && currentclubsAS.length > 0
							? currentPageAS
							: currentPage
					}
					itemsPerPage={9}
					totalitems={
						filterText.length > 0 && currentclubsAS.length > 0
							? itemsToDisplay2.length
							: Clubs.length
					}
					paginate={paginate}
				/>
			) : (
				''
			)}

			<Footer></Footer>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		userClubs: state.userClubs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllclbs: () => dispatch(actGetAllClubRequest()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllClubsSortBy);
