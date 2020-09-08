import React, { Component, useState, Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  InputNumber,
  Tooltip,
} from "antd";
import axios from "axios";
import FormB4 from "react-bootstrap/Form";
import "./clubManagement.css";
import cogoToast from "cogo-toast";
import { Spin } from "antd";
import { withRouter } from "react-router";
import { RollbackOutlined } from "@ant-design/icons";
import { Button as ButtonAnt } from "antd";
import { Link } from "react-router-dom";
import { FcPlus, FcUndo } from "react-icons/fc";
import { Container } from "react-bootstrap";

const { TextArea } = Input;

const AddClub = (props) => {
  const success = useSelector((state) => state.adminSystem.success);
  const errors = useSelector((state) => state.adminSystem.errors);
  const isFetching = useSelector((state) => state.adminSystem.isFetching);
  const dispatch = useDispatch();
  //add
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [clubHistory, setClubHistory] = useState("");
  const [clubGroupType, setClubGroupType] = useState("");
  const [clubPhone, setClubPhone] = useState("");
  const [clubEmail, setClubEmail] = useState("");
  const [clubFace, setClubFace] = useState("");
  const [clubPurpose, setClubPurpose] = useState("");
  const [clubFunction, setClubFunction] = useState("");
  const [err, setErr] = useState("");
  const [clubStructureImage, setClubStructureImage] = useState({
    preview: "",
    raw: "",
  });
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [clubLogo, setClubLogo] = useState({ preview: "", raw: "" });
  const [isLoading, setIsloading] = useState(false);

  let formData = new FormData();
  formData.append("clubDesc", clubDesc);
  formData.append("clubHistory", clubHistory);
  formData.append("clubGroupType", clubGroupType);
  formData.append("clubPhone", clubPhone);
  formData.append("clubEmail", clubEmail);
  formData.append("clubFace", clubFace);
  formData.append("clubName", clubName);
  formData.append("clubFunction", clubFunction);
  formData.append("clubPurpose", clubPurpose);
  formData.append("imageClub", image.raw);
  formData.append("clubLogo", clubLogo.raw);
  formData.append("clubStructureImage", clubStructureImage.raw);

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const offSetLayout = {
    wrapperCol: { offset: 2, span: 20 },
  };

  function handleSelectChange(value) {
    setClubGroupType(value);
  }
  const handleChangeImg = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const handleChangeLogo = (e) => {
    console.log("e.target.files", e.target.files);
    if (e.target.files.length) {
      setClubLogo({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const handleChangeStructure = (e) => {
    if (e.target.files.length) {
      setClubStructureImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const validateMessages = {
    required: "${label} không được để trống!",
    types: {
      email: "${label} không phải email!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const handleSubmit = (formData) => {
    const Authorization = localStorage.getItem("Authorization");
    if (
      formData.get("clubDesc") &&
      formData.get("clubHistory") &&
      formData.get("clubGroupType") &&
      formData.get("clubPhone") &&
      formData.get("clubEmail") &&
      formData.get("clubFace") &&
      formData.get("clubName") &&
      formData.get("imageClub") &&
      formData.get("clubLogo") &&
      formData.get("clubStructureImage") &&
      formData.get("clubPurpose") &&
      formData.get("clubFunction")
    ) {
      setIsloading(true);
      axios({
        method: "post",
        url: "https://team11-api.azurewebsites.net/api/club/create/ImageClub",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `${Authorization}`,
        },
        data: formData,
      })
        .then((res) => {
          setIsloading(false);
          setClubName("");
          if (res.data) {
            cogoToast.success("Tạo câu lạc bộ thành công");
            props.history.push("/adminSystem");
          }
        })
        .catch((err) => {
          cogoToast.error("Lỗi hệ thống...");
        });
    }
  };
  console.log(clubName);

  return (
    <div>
    <h2 className="title-dashboard">THÊM MỚI CÂU LẠC BỘ</h2>
    <Fragment>
      <Spin tip="Đang tạo câu lạc bộ..." spinning={isLoading} size="large">
        <Form
          {...layout}
          className="form_add_club"
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Tên câu lạc bộ"
            name="clubName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="Nhập tên câu lạc bộ"
              type="text"
              name="clubName"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả câu lạc bộ"
            name="clubDesc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={clubDesc}
              onChange={(e) => setClubDesc(e.target.value)}
              placeholder="Nhập mô tả câu lạc bộ"
              type="text"
              name="clubDesc"
            />
          </Form.Item>
          <Form.Item
            label="Mục đích câu lạc bộ"
            name="clubPurpose"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              value={clubPurpose}
              onChange={(e) => setClubPurpose(e.target.value)}
              placeholder="Nhập mục đích câu lạc bộ"
              type="text"
              name="clubPurpose"
            />
          </Form.Item>
          <Form.Item
            label="Chức năng câu lạc bộ"
            name="clubFunction"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              value={clubFunction}
              onChange={(e) => setClubFunction(e.target.value)}
              placeholder="Nhập chức năng câu lạc bộ"
              type="text"
              name="clubFunction"
            />
          </Form.Item>
          <Form.Item
            label="Lịch sử câu lạc bộ"
            name="clubHistory"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              value={clubHistory}
              onChange={(e) => setClubHistory(e.target.value)}
              placeholder="Nhập lịch sử câu lạc bộ"
              type="text"
              name="clubHistory"
            />
          </Form.Item>
          <Form.Item
            label="Câu lạc bộ cấp"
            name="clubGroupType"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue="Chọn cấp của câu lạc bộ"
              value={clubGroupType}
              onChange={handleSelectChange}
              name="clubGroupType"
            >
              <Select.Option value="khoa">Khoa</Select.Option>
              <Select.Option value="truong">Trường</Select.Option>
              <Select.Option value="doanhoi">Đoàn Hội</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="input_Phone"
            label="Số điện thoại câu lạc bộ"
            name="clubPhone"
            rules={[
              {
                required: true,
              },
            ]}
            min={10}
            max={10}
          >
            <Input
              value={clubPhone}
              onChange={(e) => setClubPhone(e.target.value)}
              placeholder="Nhập số điện thoại câu lạc bộ"
              type="text"
              name="clubPhone"
            />
          </Form.Item>
          <Form.Item
            label="Email câu lạc bộ"
            name="clubEmail"
            rules={[
              {
                required: true,
              },
              {
                type: "email",
              },
            ]}
          >
            <Input
              value={clubEmail}
              onChange={(e) => setClubEmail(e.target.value)}
              placeholder="Nhập email câu lạc bộ cấp"
              type="text"
              name="clubEmail"
            />
          </Form.Item>
          <Form.Item
            label="Facebook câu lạc bộ"
            name="clubFace"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={clubFace}
              onChange={(e) => setClubFace(e.target.value)}
              placeholder="Nhập link Facebook Club câu lạc bộ cấp"
              type="text"
              name="clubFace"
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh câu lạc bộ"
            name="imageClub"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <FormB4.File id="custom-file" onChange={handleChangeImg} />
          </Form.Item>

          <Form.Item
            label="Logo câu lạc bộ"
            name="clubLogo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <FormB4.File id="custom-file" onChange={handleChangeLogo} />
          </Form.Item>

          <Form.Item
            label="Cơ cấu câu lạc bộ"
            name="clubStructureImage"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <FormB4.File id="custom-file" onChange={handleChangeStructure} />
          </Form.Item>
          <Form.Item {...offSetLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleSubmit(formData)}
              // className='btn_add_club'
            >
              <FcPlus size={20} /> &nbsp; Tạo câu lạc bộ
            </Button>{" "}
            &nbsp;
            <Link to="/adminsystem">
              <ButtonAnt type="primary">
                <FcUndo size={20} /> &nbsp; Trở về
              </ButtonAnt>
            </Link>
          </Form.Item>
        </Form>
      </Spin>
    </Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  // createClubAll: () => dispatch(createClub(clubName)),
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddClub)
);
