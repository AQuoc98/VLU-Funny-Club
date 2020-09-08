import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Space, Modal, Button, Input } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import axios from "axios";
import cogoToast from "cogo-toast";
import { getClubById } from "../../../Redux/actions/user-clubs.action";
import { Link } from "react-router-dom";
import UpdateEvent from "./updateEvent";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import "./event.css";

const override = css`
  position: relative;
  top: 175px;
  margin: auto;
  z-index: 1;
`;

const ViewAllEvent = (props) => {
  const count = useSelector((state) => state.getClubsById.ClubById.event);
  const clubId = useSelector((state) => state.getClubsById.ClubById._id);

  // Use State
  let [search, setSearch] = useState("");
  let [data, setData] = useState([]);
  let [isLoading, setIsloading] = useState(false);
  let dataFake = [];
  useEffect(() => {
    console.log("count", count);

    if (count) {
      for (let index = 0; index < count.length; index++) {
        const element = count[index];
        dataFake.push({
          key: index,
          imageEvent: element.eventId.eventImage,
          eventTitle: element.eventId.eventTitle,
          eventDesc: element.eventId.eventDesc,
          time: element.eventId.time,
          eventAddress: element.eventId.eventAddress,
          eventId: element.eventId._id,
          registerDate: element.eventId.registerDate,
        });
        setData([...dataFake]);
      }
    }
  }, [count]);

  //   const data = count;
  const dispatch = useDispatch();

  const confirm = (idEvent) => {
    console.log("idEvent", idEvent);
    Modal.confirm({
      title: "Xoá sự kiện",
      content: "Bạn có chắc chắn xoá",
      okType: "danger",
      cancelText: "Thoát",
      okText: "Xoá",
      icon: <WarningOutlined />,
      onOk() {
        axios
          .put(`https://team11-api.azurewebsites.net/api/event/delete/${idEvent}`)
          .then((res) => {
            dispatch(getClubById(clubId));
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
      title: "Hình ảnh event",
      dataIndex: "imageEvent",
      key: "imageEvent",
      render: (img) => <img className="evemt_table_img" src={img}></img>,
      responsive: ["md"],
    },
    {
      title: "Tên sự kiện",
      dataIndex: "eventTitle",
      key: "eventTitle",
      width: "20%",
    },
    {
      title: "Mô tả sự kiện",
      dataIndex: "eventDesc",
      key: "eventDesc",
      width: "30%",
    },
    {
      title: "Địa điểm",
      dataIndex: "eventAddress",
      key: "eventAddress",
      width: "8%",
    },
    {
      title: "Thời gian sự kiện",
      dataIndex: "time",
      key: "time",
      render: (time) => {
        console.log("time", time);
        if (!time) return false;
        const chars = time.split(",");

        return (
          <Fragment>
            <Tag color="#87d068" className="time_tren">
              {chars[0]}
            </Tag>
            <Tag color="#f50">{chars[1]}</Tag>
          </Fragment>
        );
      },
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
                pathname: `/adminClub/update-event/${record.eventId}`,
                state: { data: record },
              }}
              // params={record}
            >
              <Button className="btn_update_schedule"> Cập nhật </Button>
            </Link>
            <Button danger onClick={() => confirm(record.eventId)}>
              Xoá
            </Button>
          </Space>
        );
      },
    },
  ];

  let handleSearch = () => {
    setIsloading(true);
    console.log("search", search);
    axios
      .post(`https://team11-api.azurewebsites.net/api/event/searchEvent/${clubId}`, {
        searchEvent: search,
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
            imageEvent: element.eventId.eventImage,
            eventTitle: element.eventId.eventTitle,
            eventDesc: element.eventId.eventDesc,
            time: element.eventId.time,
            eventAddress: element.eventId.eventAddress,
            eventId: element.eventId._id,
            registerDate: element.eventId.registerDate,
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
  let RenderTable = () => {
    return <Table columns={columns} dataSource={data} className={className} />;
  };
  return (
    <Fragment>
      {/* <Input onChange={(e) => setSearch(e.target.value)}></Input> */}
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
      {/* <button onClick={handleSearch}>Tìm kiếm</button> */}
      <RenderTable></RenderTable>
    </Fragment>
  );
};
export default ViewAllEvent;
