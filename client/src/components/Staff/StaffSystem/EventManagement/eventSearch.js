import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Table, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
var dateformat = require("dateformat");

const getEventParams = (params) => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

class eventSearch extends Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 3,
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
    this.setState({
      loading: false,
      data: this.props.todo,
    });
  }

  handleTableChange = (pagination) => {
    this.fetch({
      pagination,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    axios({
      method: "GET",
      url: "https://team11-api.azurewebsites.net/api/event/getAll",
      data: getEventParams(params),
    }).then((data) => {
      console.log(data.data);
      this.setState({
        loading: false,
        data: data.data,
        pagination: {
          ...params.pagination,
          total: data.totalCount,
        },
      });
    });
  };

  render() {
    console.log(this.props.todo);
    var dateformat = require("dateformat");
    var registerDate = new Date();
    dateformat(registerDate, "YYYY/MM/DD");

    const columns = [
      {
        title: "Hình ảnh sự kiện",
        dataIndex: "eventImage",
        key: "eventImage",
        render: (text, record) => {
          return (
            <img
              src={record.eventImage}
              style={{ height: 200, width: 200 }}
            ></img>
          );
        },
      },
      {
        title: "Tên sự kiện",
        dataIndex: "eventTitle",
        key: "eventTitle",
        ...this.getColumnSearchProps("eventTitle"),
      },
      {
        title: "Ngày thành lập",
        dataIndex: "registerDate",
        key: "registerDate",
        render: (text, record) => {
          return <p>{dateformat(record.registerDate, "h:MM TT dd-mm-yyyy")}</p>;
        },
      },
      {
        title: "Thời gian sự kiện",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Nơi tổ chức",
        dataIndex: "eventAddress",
        key: "eventAddress",
        ...this.getColumnSearchProps("eventAddress"),
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

    const { data, pagination, loading } = this.state;
    return (
      <div>
        <h2 className="title-dashboard">TÌM KIẾM CÁC SỰ KIỆN</h2>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        ></Table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  todo: state.userClubs,
});

export default connect(mapStateToProps, null)(eventSearch);
