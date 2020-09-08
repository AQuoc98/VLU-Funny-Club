import {connect} from 'react-redux';
import {Fragment} from 'react';
import React, {Component} from 'react';
import axios from 'axios';
import {Button, Table, Space, Input, Popconfirm} from 'antd';
import {SearchOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {GoTrashcan} from 'react-icons/go';
import {Link} from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import {Container, Row} from 'react-bootstrap';
import {FcAddImage} from 'react-icons/fc';

const getClubParams = (params) => {
	return {
		results: params.pagination.pageSize,
		page: params.pagination.current,
		...params,
	};
};

class WebBannerManage extends Component {
	state = {
		data: [],
		pagination: {
			current: 1,
			pageSize: 10,
		},
		loading: false,
		searchText: '',
		searchedColumn: '',
	};

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{padding: 8}}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={'Search'}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						this.handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{width: 188, marginBottom: 8, display: 'block'}}
				></Input>
				<Space>
					<Button
						type='primary'
						onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{width: 90}}
					>
						Search
					</Button>
					<Button
						onClick={() => this.handleReset(clearFilters)}
						size='small'
						style={{width: 90}}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{color: filtered ? '#1890ff' : ''}} />
		),
		onFilter: (value, record) => {
			if (!record[dataIndex]) {
				return '';
			} else {
				return record[dataIndex]
					.toString()
					.toLowerCase()
					.includes(value.toLowerCase());
			}
		},
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({searchText: ''});
	};

	componentDidMount() {
		const {pagination} = this.state;
		this.fetch({pagination});
	}

	handleTableChange = (pagination) => {
		this.fetch({
			pagination,
		});
	};

	fetch = (params = {}) => {
		this.setState({loading: true});
		const Authorization = localStorage.getItem('Authorization');
		Axios({
			method: 'GET',
			url: `https://team11-api.azurewebsites.net/api/banner/getAllBanner`,
			headers: {
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((data) => {
				// setSchedules(res.data.schedule.reverse());
				this.setState({
					loading: false,
					data: data.data,
					pagination: {
						...params.pagination,
						total: data.totalCount,
					},
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	onConfirmDeleteClub = (e, id) => {
		console.log(id);
		const Authorization = localStorage.getItem('Authorization');
		this.setState({
			loading: true,
		});
		Axios({
			method: 'PUT',
			url: `https://team11-api.azurewebsites.net/api/banner/delete/${id}`,
			headers: {
				Accept: 'application/json',
				Authorization: `${Authorization}`,
			},
		})
			.then((res) => {
				console.log(res.data);
				if (res.data) {
					this.setState({
						loading: false,
					});
					const Authorization = localStorage.getItem('Authorization');
					Axios({
						method: 'GET',
						url: `https://team11-api.azurewebsites.net/api/banner/getAllBanner`,
						headers: {
							Accept: 'application/json',
							Authorization: `${Authorization}`,
						},
					})
						.then((res) => {
							// setSchedules(res.data.schedule.reverse());
							cogoToast.success('Xoá thành công!');
							this.setState({
								clubAfterDeleted: res.data,
							});
						})
						.catch((err) => {
							console.log(err);
						});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		var dateformat = require('dateformat');
		var registerDate = new Date();
		dateformat(registerDate, 'YYYY/MM/DD');
		const {data, pagination, loading} = this.state;

		const columns = [
			{
				title: 'Banner',
				dataIndex: 'bannerImage',
				key: 'bannerImage',
				render: (text, record) => {
					return <img src={record.bannerImage} style={{height: 150}} />;
				},
			},
			{
				title: 'Tình trạng banner',
				dataIndex: 'isActive',
				key: 'isActive',
				render: (text, record) => {
					return <p>{record.isActive === true ? 'Đang hoạt động' : 'Ẩn'}</p>;
				},
			},
			{
				title: 'Ngày được tạo',
				dataIndex: 'bannerRegisterDate',
				key: 'bannerRegisterDate',
				...this.getColumnSearchProps('bannerRegisterDate'),
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				width: '2000',
				render: (text, record) => {
					return (
						<Space size='middle'>
							<Popconfirm
								title='Bạn có chắc muốn xoá?'
								icon={<QuestionCircleOutlined style={{color: 'red'}} />}
								onConfirm={(e) => {
									this.onConfirmDeleteClub(e, record._id);
								}}
							>
								<Button type='primary' shape='round' size='medium' danger>
									<GoTrashcan /> &nbsp; Xoá
								</Button>
							</Popconfirm>
						</Space>
					);
				},
			},
		];
		return (
			<Container>
				
				<h2 className="title-dashboard">CẬP NHẬT BANNER TRANG WEB</h2>
				
				<Row>
					<Link to={`/adminsystem/CreateBanner`}>
						<Button
							type='primary'
							size='large'
							style={{marginLeft: 15, marginBottom: 10}}
						>
							<FcAddImage size={28} />
						</Button>
					</Link>
				</Row>
				<Table
					columns={columns}
					dataSource={
						this.state.clubAfterDeleted ? this.state.clubAfterDeleted : data
					}
					pagination={pagination}
					loading={loading}
					onChange={this.handleTableChange}
				/>
			</Container>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(WebBannerManage);
