import React, { Fragment, useEffect, useState } from "react";
import { Table, Tag, Space, Modal, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { WarningOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import cogoToast from "cogo-toast";
import axios from "axios";
import { getClubById } from "../../../Redux/actions/user-clubs.action";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

const override = css`
  position: relative;
  top: 175px;
  margin: auto;
  z-index: 1;
`;

export const ViewAllStudent = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.getClubsById.ClubById.students);
  const checkAdminClub = useSelector(
    (state) => state.getClubsById.ClubById.clubAdmin
  );
  const idClub = useSelector((state) => state.getClubsById.ClubById._id);

  let [search, setSearch] = useState("");
  let [data, setData] = useState([]);
  let [isLoading, setIsloading] = useState(false);
  let dataFake = [];

  useEffect(() => {
    if (count) {
      for (let index = 0; index < count.length; index++) {
        const element = count[index];
        let role;
        let idAdmin;
        if (checkAdminClub.length > 0) {
          idAdmin = checkAdminClub[0].studentId._id;
        }
        console.log("checkAdminClub", checkAdminClub);
        if (element.isConfirmJoin === true) {
          if (element.isAdmin === true && element.studentId._id == idAdmin) {
            role = "Admin Club";
          } else {
            role = "Thành viên";
          }
          dataFake.push({
            key: index,
            avataUser: element.studentId.info.avataUser,
            fullName: element.studentId.info.fullName,
            major: element.studentId.info.major,
            mssv: element.studentId.mssv,
            role: role,
            idStudent: element.studentId._id,
            classMajor: element.studentId.info.classMajor,
            requestConfirm: element.requestConfirm,
          });
          setData([...dataFake]);
        }
      }
    }
  }, [count]);

  const removeStudent = (idClub, idStudent) => {
    Modal.confirm({
      title: "Xác nhận huỷ thành viên tham gia",
      content: "Bạn có chắc chắn huỷ thành viên tham gia club",
      icon: <WarningOutlined />,
      onOk() {
        axios
          .put(
            `https://team11-api.azurewebsites.net/api/adminClub/removeStudent/${idStudent}/${idClub}`
          )
          .then((res) => {
            console.log("res", res);
            dispatch(getClubById(idClub));
            cogoToast.success("Huỷ thành viên thành công");
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
      title: "Avatar",
      dataIndex: "avataUser",
      key: "avataUser",
      render: (text) => <img src={text} className="avatar_User"></img>,
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Tác vụ",
      key: "action",
      render: (text, record) => {
        console.log("record", record);
        console.log("text", text);
        if (record.role == "Admin Club") {
          return false;
        } else {
          return (
            <Button
              danger
              onClick={() => removeStudent(idClub, record.idStudent)}
            >
              Xoá thành viên
            </Button>
          );
        }
      },
    },
  ];

  let handleSearch = () => {
    setIsloading(true);
    console.log("search", search);
    axios
      .post(`https://team11-api.azurewebsites.net/api/club/searchStudent/${idClub}`, {
        searchStudent: search,
      })
      .then(function (response) {
        if (response.data.length < 1) {
          setIsloading(false);
          return setData([]);
        }

        let dataFakeSearch = [];
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          let idAdmin;
          if (checkAdminClub.length > 0) {
            idAdmin = checkAdminClub[0].studentId._id;
          }
          console.log("element", element);
          let role;
          if (element.isAdmin === true && element.studentId._id == idAdmin) {
            role = "Admin Club";
          } else {
            role = "Thành viên";
          }
          dataFakeSearch.push({
            key: index,
            avataUser: element.studentId.info.avataUser,
            fullName: element.studentId.info.fullName,
            major: element.studentId.info.major,
            mssv: element.studentId.mssv,
            role: role,
            idStudent: element.studentId._id,
            classMajor: element.studentId.info.classMajor,
            requestConfirm: element.requestConfirm,
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
      <h1>Danh sách thành viên</h1>
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
