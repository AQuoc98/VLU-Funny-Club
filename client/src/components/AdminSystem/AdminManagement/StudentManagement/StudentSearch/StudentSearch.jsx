import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Button, Table, Space, Input} from 'antd';
import {SearchOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';

const getClubParams = (params) => {
	return {
		results: params.pagination.pageSize,
		page: params.pagination.current,
		...params,
	};
};

class StudentSearch extends Component {
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
		if (Authorization) {
			axios({
				method: 'GET',
				url: `https://team11-api.azurewebsites.net/api/student/getAllUser`,
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: 'application/json',
					Authorization: `${Authorization}`,
				},
			}).then((data) => {
				this.setState({
					loading: false,
					data: data.data,
					pagination: {
						...params.pagination,
						total: data.totalCount,
					},
				});
			});
		}
	};

	render() {
		var dateformat = require('dateformat');
		var registerDate = new Date();
		dateformat(registerDate, 'YYYY/MM/DD');
		const {data, pagination, loading} = this.state;

		const columns = [
			{
				title: 'Tên người dùng',
				dataIndex: 'userName',
				key: 'userName',
				...this.getColumnSearchProps('userName'),
			},
			{
				title: 'Ngày đăng ký',
				dataIndex: 'registerDate',
				key: 'registerDate',
			},
			{
				title: 'Loại người dùng',
				dataIndex: 'userType',
				key: 'userType',
				render: (text, record) => {
					console.log(record);
					if (
						record.club.filter((item) => {
							return item.isAdmin && item.isConfirmJoin === true;
						}).length > 0
					) {
						return <p>adminClub</p>;
					} else {
						return <p>{record.userType}</p>;
					}
				},
			},
			{
				title: 'Mã số sinh viên',
				dataIndex: 'mssv',
				key: 'mssv',
				...this.getColumnSearchProps('mssv'),
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				width: '2000',
				render: (text, record) => {
					if (record.userType !== 'admin') {
						return (
							<Space size='middle'>
								<Link
									to={{
										pathname: `/adminsystem/set-permission/user/${record._id}`,
										state: {data: record},
									}}
								>
									<Button
										type='primary'
										shape='round'
										size='medium'
										icon={<EditOutlined />}
									>
										Cập nhật quyền của người dùng
									</Button>
								</Link>
							</Space>
						);
					} else {
						return '';
					}
				},
			},
		];
		return (
			<div>
				<h2 className="title-dashboard">TÌM KIẾM SINH VIÊN</h2>
			<Table
				columns={columns}
				dataSource={data.reverse()}
				pagination={pagination}
				loading={loading}
				onChange={this.handleTableChange}
			></Table>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(StudentSearch);
