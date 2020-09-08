import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Row} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const ClubChart = (props) => {
	const chartClub = useSelector((state) => state.adminSystem.chartClub);
	return (
		<Row className='chart_club'>
			<Bar
				data={{
					labels: [
						'Tháng 1',
						'Tháng 2',
						'Tháng 3',
						'Tháng 4',
						'Tháng 5',
						'Tháng 6',
						'Tháng 7',
						'Tháng 8',
						'Tháng 9',
						'Tháng 10',
						'Tháng 11',
						'Tháng 12',
					],
					datasets: [
						{
							label: 'Tổng số câu lạc bộ',
							backgroundColor: '#03a9f4',
							borderColor: '#01628e',
							data: chartClub,
						},
					],
				}}
				options={{
					legend: {display: false},
					layout: {
						padding: {
							left: 20,
							right: 0,
							top: 50,
							bottom: 0,
						},
					},
				}}
			/>
		</Row>
	);
};
export default ClubChart;
