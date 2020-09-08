import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import './Pagination.css';
import {Container, Row, Col} from 'react-bootstrap';

const Pagination = ({itemsPerPage, totalitems, paginate, currentPage}) => {
	const pageNumbers = [];
	console.log('totalitems', totalitems);

	for (let i = 1; i <= Math.ceil(totalitems / itemsPerPage); i++) {
		let active = currentPage === i ? 'active' : '';
		if (i >= currentPage - 1 && i <= currentPage + 1) {
			pageNumbers.push(
				<li
					className={`page-item ${active}`}
					key={i}
					onClick={() => paginate(i)}
				>
					<a className='page-link'>{i}</a>
				</li>,
			);
		}
	}
	return (
		<Container>
			<Row>
				<Col>
					<nav aria-label='Page navigation example'>
						<ul className='pagination'>
							{/* nut previous */}
							{currentPage > 1 ? (
								<li
									className={`page-item`}
									onClick={() => paginate(currentPage - 1)}
								>
									<a className='page-link'>Prev</a>
								</li>
							) : (
								''
							)}
							{/* so traang hien tai */}
							{pageNumbers}
							{/* nut next */}
							{currentPage < Math.ceil(totalitems / itemsPerPage) ? (
								<li
									className={`page-item`}
									onClick={() => paginate(currentPage + 1)}
								>
									<a className='page-link'>Next</a>
								</li>
							) : (
								''
							)}
						</ul>
					</nav>
				</Col>
			</Row>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	// blabla: state.blabla,
});

const mapDispatchToProps = (dispatch) => ({
	// fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
