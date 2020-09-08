import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Table, Space, Input } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import confirm from "antd/lib/modal/confirm";
var dateformat = require("dateformat");

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
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={"Search"}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        ></Input>
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : "" }} />
    ),
    onFilter: (value, record) => {
      if (!record[dataIndex]) {
        return "";
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
    this.setState({ searchText: "" });
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination) => {
    this.fetch({
      pagination,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    const Authorization = localStorage.getItem("Authorization");
    if (Authorization) {
      axios({
        method: "GET",
        url: `https://team11-api.azurewebsites.net/api/student/getAllUser`,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
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
    var dateformat = require("dateformat");
    var registerDate = new Date();
    dateformat(registerDate, "YYYY/MM/DD");
    const { data, pagination, loading } = this.state;

    const columns = [
      {
        title: "Tên sinh viên",
        dataIndex: "userName",
        key: "userName",
        ...this.getColumnSearchProps("userName"),
      },
      {
        title: "Ngày tham gia",
        dataIndex: "registerDate",
        key: "registerDate",
        render: (text, record) => {
          return <p>{dateformat(record.registerDate, "h:MM TT dd-mm-yyyy")}</p>;
        },
      },
      {
        title: "Loại sinh viên",
        dataIndex: "userType",
        key: "userType",
        ...this.getColumnSearchProps("userType"),
      },
      {
        title: "Mã số sinh viên",
        dataIndex: "mssv",
        key: "mssv",
        ...this.getColumnSearchProps("mssv"),
      },
      // {
      // 	title: 'TÁC VỤ',
      // 	key: 'action',
      // 	render: (text) => (
      // 		<Space>
      // 			<Button style={{borderColor: 'green'}}>Xuất báo cáo</Button>
      // 		</Space>
      // 	),
      // },
    ];
    return (
      <div>
        <h2 className="title-dashboard">TÌM KIẾM SINH VIÊN </h2>
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
