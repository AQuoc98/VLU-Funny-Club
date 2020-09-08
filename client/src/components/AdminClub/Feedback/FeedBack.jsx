import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Input } from "antd";
import axios from "axios";
import dateFormat from "dateformat";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

export const FeedBack = () => {
  const count = useSelector((state) => state.getClubsById.ClubById._id);

  const override = css`
    position: relative;
    top: 175px;
    margin: auto;
    z-index: 1;
  `;

  let [data, setData] = useState([]);
  let [search, setSearch] = useState("");
  let [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    axios
      .get("https://team11-api.azurewebsites.net/api/club/getAllFeedback/" + count)
      .then((res) => {
        // setData([...res.data]);
        setData([...res.data]);

        console.log("res", res);
      });
  }, [count]);
  const columns = [
    {
      title: "Thời gian",
      width: "15%",
      dataIndex: "registerDate",
      key: "registerDate",
      render: (text) => {
        return <p>{dateFormat(text, "h:MM TT dd-mm-yyyy")}</p>;
      },
    },
    {
      title: "Tên sinh viên",
      dataIndex: "studentId",
      width: "20%",
      key: "studentId",
      render: (text) => {
        return <p>{text.info.fullName}</p>;
      },
    },
    {
      title: "Phản hồi",
      dataIndex: "feedBack",
      key: "feedBack",
    },
    {
      title: "Rating",
      dataIndex: "rate",
      key: "rate",
      width: "8%",
    },
  ];

  let handleSearch = () => {
    setIsloading(true);
    axios
      .post(`https://team11-api.azurewebsites.net/api/club/searchFeedBack/${count}`, {
        searchFeedBack: search,
      })
      .then(function (response) {
        if (response.data.length < 1) {
          setIsloading(false);
          return setData([]);
        }

        setData([...response.data]);
        setIsloading(false);
      })
      .catch(function (error) {
        setIsloading(false);
        console.log(error);
      });
  };

  let className = "table_event";
  if (isLoading === true) {
    className += " blur_back";
  }
  return (
    <Fragment>
      <h1>Danh sách FeedBack</h1>
      {/* <Input.Search
        className="search_event"
        placeholder="Nhập nội dung tìm kiếm"
        onChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
        size="large"
        enterButton
      /> */}
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
