import React, { Fragment, useState } from "react";
import { Modal, Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { WarningOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import cogoToast from "cogo-toast";
import axios from "axios";
import { getClubById } from "../../../Redux/actions/user-clubs.action";
import { ItemStudent } from "./ItemStudent";
import { Col, Row } from "react-bootstrap";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";
import { RiBarcodeBoxLine } from "react-icons/ri";
import { Tooltip, Divider } from "antd";

export const ConfirmStudent = (props) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.getClubsById.ClubById.students);
  const idClub = useSelector((state) => state.getClubsById.ClubById._id);
  const [noData, setNoData] = useState(false);

  const confirm = (idClub, idStudent) => {
    Modal.confirm({
      title: "Xác nhận thành viên tham gia",
      content: "Bạn có chắc chắn cho thành viên tham gia club",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios
          .post(
            `https://team11-api.azurewebsites.net/api/adminClub/accessForStudent/${idStudent}/${idClub}`
          )
          .then((res) => {
            dispatch(getClubById(idClub));
            cogoToast.success("Thêm thành viên thành công");
          })
          .catch((err) => cogoToast.warn("Lỗi hệ thốngsgf"));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
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
            dispatch(getClubById(idClub));
            cogoToast.success("Huỷ thành viên thành công");
          })
          .catch((err) => cogoToast.warn("Lỗi hệ thốngsgf"));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const data = [];

  if (count) {
    for (let index = 0; index < count.length; index++) {
      const element = count[index];
      if (element.isConfirmJoin === false) {
        data.push({
          key: index,
          avataUser: element.studentId.info.avataUser,
          fullName: element.studentId.info.fullName,
          major: element.studentId.info.major,
          mssv: element.studentId.mssv,
          idStudent: element.studentId._id,
          classMajor: element.studentId.info.classMajor,
          requestConfirm: element.requestConfirm,
        });
      }
    }
  }
  console.log("data", data);
  // const ViewAllTable = () => {
  //   return data.map((item, key) => (
  //     <ItemStudent
  //       key={key}
  //       data={item}
  //       removeStudent={() => removeStudent(idClub, item.idStudent)}
  //       confirm={() => confirm(idClub, item.idStudent)}
  //     />
  //   ));
  // };

  // let RenderNodata = () => {
  //   if (data.length < 1) {
  //     return (
  //       <img
  //         src="/images/not-found.jpg"
  //         alt="no data"
  //         className="no_data"
  //       ></img>
  //     );
  //   } else {
  //     return false;
  //   }
  // };
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
      title: "Mã số sinh viên",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "Lớp",
      dataIndex: "classMajor",
      key: "classMajor",
    },
    {
      title: "Lý do",
      dataIndex: "requestConfirm",
      key: "requestConfirm",
    },
    {
      title: "Xác nhận tham gia",
      key: "action",
      render: (text, record) => {
        console.log("record", record);
        console.log("text", text);
        return (
          <div className="confirm_icon_div">
            <Tooltip title="Xác nhận" color="#2ecc71" key="#2ecc71">
              <AiFillCheckSquare
                className="confirm_icon access"
                onClick={() => confirm(idClub, text.idStudent)}
              ></AiFillCheckSquare>
            </Tooltip>
            <Tooltip title="Xoá" color="#e74c3c" key="#e74c3c">
              <AiFillCloseSquare
                className="confirm_icon remove"
                onClick={() => removeStudent(idClub, text.idStudent)}
              ></AiFillCloseSquare>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <Fragment>
      <h2 className="h2_confirm_student">
        Danh sách xác nhận thành viên tham gia club
      </h2>
      <Table columns={columns} dataSource={data} className="phong" />
      {/* <Table columns={columns} dataSource={data} /> */}
      {/* <Row className="row_content_confirm_header">
        <Col lg="3">Tên</Col>
        <Col lg="1">MSSV</Col>
        <Col lg="2">Khoa</Col>
        <Col lg="1">Lớp</Col>
        <Col lg="3">Lý do</Col>
        <Col lg="1">Tác vụ</Col>
      </Row>
      <ViewAllTable></ViewAllTable>
      <RenderNodata></RenderNodata> */}
    </Fragment>
  );
};
