import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Table, Space, Input, Popconfirm } from "antd";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Axios from "axios";
import cogoToast from "cogo-toast";
var dateFormat = require("dateformat");

const getClubParams = (params) => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

class ClubIndex extends Component {
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
      url: "https://team11-api.azurewebsites.net/api/club/getAllClub",
      data: getClubParams(params),
    }).then((data) => {
      console.log(data);
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
  onConfirmDeleteClub = (e, id) => {
    console.log(id);
    const Authorization = localStorage.getItem("Authorization");
    this.setState({
      loading: true,
    });
    Axios({
      method: "DELETE",
      url: `https://team11-api.azurewebsites.net/api/club/delete/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          this.setState({
            loading: false,
          });
          Axios({
            method: "GET",
            url: `https://team11-api.azurewebsites.net/api/club/getAllClub`,
            headers: {
              Accept: "application/json",
            },
          })
            .then((res) => {
              // setSchedules(res.data.schedule.reverse());
              cogoToast.success("Xoá thành công!");
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
    var dateformat = require("dateformat");
    var registerDate = new Date();
    dateformat(registerDate, "YYYY/MM/DD");
    const { data, pagination, loading } = this.state;

    const columns = [
      {
        title: "Tên câu lạc bộ",
        dataIndex: "clubName",
        key: "clubName",
        ...this.getColumnSearchProps("clubName"),
      },
      {
        title: "Ngày thành lập",
        dataIndex: "registerDate",
        key: "registerDate",
        render: (text, record) => {
          return <p>{dateFormat(record.registerDate, "h:MM TT dd-mm-yyyy")}</p>;
        },
      },
      {
        title: "Số điện thoại",
        dataIndex: "clubPhone",
        key: "clubPhone",
      },
      {
        title: "Email liên hệ",
        dataIndex: "clubEmail",
        key: "clubEmail",
      },
      {
        title: "Câu lạc bộ cấp",
        dataIndex: "clubGroupType",
        key: "clubGroupType",
        render: (text, record) => {
          return (
            <p>
              {record.clubGroupType === "doanhoi"
                ? "Đoàn hội"
                : record.clubGroupType === "truong"
                ? "Trường"
                : "Khoa"}
            </p>
          );
        },
        ...this.getColumnSearchProps("clubGroupType"),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "2000",
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link
                to={{
                  pathname: `/adminsystem/editClub/${record._id}`,
                  state: { data: record },
                }}
                // params={record}
              >
                <Button className="btn_update_schedule"> Cập nhật </Button>
              </Link>
              <Popconfirm
                title="Bạn có chắc muốn xoá?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={(e) => {
                  this.onConfirmDeleteClub(e, record._id);
                }}
              >
                <Button danger>Xoá</Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];

    return (
      <div>
        <h2 className="title-dashboard">TÌM KIẾM CÁC CÂU LẠC BỘ</h2>
        <Table
          columns={columns}
          dataSource={
            this.state.clubAfterDeleted ? this.state.clubAfterDeleted : data
          }
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

export default connect(mapStateToProps, null)(ClubIndex);
