import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Space, Modal, Input } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { getClubById } from "../../../Redux/actions/user-clubs.action";
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
// 3rd package
var dateFormat = require("dateformat");

const override = css`
  position: relative;
  top: 175px;
  margin: auto;
  z-index: 1;
`;
export const ViewSchedule = (props) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.getClubsById.ClubById.schedule);
  const idClub = useSelector((state) => state.getClubsById.ClubById._id);

  const [search, setSearch] = useState("");
  let [isLoading, setIsloading] = useState(false);
  let [data, setData] = useState([]);
  let dataFake = [];
  const deleteSchedule = (id) => {
    Modal.confirm({
      title: "Xoá lịch trình",
      content: "Bạn có chắc chắn xoá",
      okType: "danger",
      cancelText: "Thoát",
      okText: "Xoá",
      icon: <WarningOutlined />,
      onOk() {
        axios
          .put(`https://team11-api.azurewebsites.net/api/club/deleteSchedule/${id}`)
          .then((res) => {
            dispatch(getClubById(idClub));
            cogoToast.success("Xoá thành công");
          })
          .catch((err) => err);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Phòng",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Tác vụ",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        console.log("record", record);
        console.log("text", text);
        return (
          <Space size="middle">
            <Link
              to={{
                pathname: `/adminClub/update-schedule/${record.id}`,
                state: { data: record },
              }}
            >
              <Button className="btn_update_schedule"> Cập nhật </Button>
            </Link>
            <Button danger onClick={() => deleteSchedule(record.id)}>
              Xoá
            </Button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    if (count) {
      for (let index = 0; index < count.length; index++) {
        const element = count[index];
        dataFake.push({
          key: index,
          date: element.scheduleId.date,
          room: element.scheduleId.room,
          content: element.scheduleId.content,
          note: element.scheduleId.note,
          id: element.scheduleId._id,
        });
        setData([...dataFake]);
      }
    }
  }, [count]);

  let handleSearch = () => {
    setIsloading(true);
    console.log("search", search);
    axios
      .post(`https://team11-api.azurewebsites.net/api/club/searchSchedule/${idClub}`, {
        searchSchedule: search,
      })
      .then(function (response) {
        if (response.data.length < 1) {
          setIsloading(false);
          return setData([]);
        }

        let dataFakeSearch = [];
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          console.log("element", element);
          dataFakeSearch.push({
            key: index,
            date: element.scheduleId.date,
            room: element.scheduleId.room,
            content: element.scheduleId.content,
            note: element.scheduleId.note,
            id: element.scheduleId._id,
          });
        }
        setData([...dataFakeSearch]);
        setIsloading(false);
      })
      .catch(function (error) {
        setIsloading(false);
        console.log(error);
      });
    console.log("search", search);
  };
  let className = "table_event";
  if (isLoading === true) {
    className += " blur_back";
  }
  return (
    <Fragment>
      <h1>Danh sách lịch trình câu lạc bộ</h1>
      <Input.Search
        className="search_event"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Nhập nội dung tìm kiếm"
        onSearch={handleSearch}
        size="large"
        // enterButton
      />
      <Fragment>
        <BarLoader
          css={override}
          height={4}
          width={150}
          color={"#1890ff"}
          loading={isLoading}
          size={50}
        ></BarLoader>
      </Fragment>
      <Table columns={columns} dataSource={data} className={className} />
    </Fragment>
  );
};
