import React from 'react';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import {Container, Row, Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
	getChartStudent,
	actGetAllStudentRequest,
} from '../../../../../Redux/actions/student.action';
import Axios from 'axios';
import {useState} from 'react';

function StudentChart(props) {
	const {} = props;
	const [chartData, setChartData] = useState([]);
	useEffect(() => {
		const Authorization = localStorage.getItem('Authorization');
		console.log(Authorization);
		if (Authorization) {
			Axios({
				method: 'GET',
				url: `https://team11-api.azurewebsites.net/api/student/fillterStudent`,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `${Authorization}`,
				},
			})
				.then((res) => {
					setChartData(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);
	return (
		<Row style={{marginTop: 5}}>
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
							label: 'Tổng số sinh viên',
							backgroundColor: '#03a9f4',
							borderColor: '#01628e',
							data: chartData,
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
}

export default StudentChart;
