import React, { Fragment, useState } from "react";
import { Form, Input, Button, DatePicker, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Spin } from "antd";
import { MdEventNote, MdDescription, MdPlace } from "react-icons/md";
import { UploadOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { getClubById } from "../../../Redux/actions/user-clubs.action";
import { Container } from "react-bootstrap";

const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const validateMessage = {
  required: "${label} không được để trống!",
};

const CreateEvent = (props) => {
  const dispatch = useDispatch();
  const clubId = useSelector((state) => state.getClubsById.ClubById._id);
  // useState
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [timePick, setTimePick] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [imageEvent, setImageEvent] = useState({
    preview: "",
    raw: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({
    eventAddress: "",
    eventDesc: "",
    setEventTitle: "",
    path: "",
    time: "",
  });

  // Post axios
  const onFinish = (values) => {
    setIsloading(true);
    console.log("timePick", timePick);
    if (timePick.toString() == ["", ""]) {
      setIsloading(false);
      return cogoToast.error("Chưa nhập thời gian sự kiện");
    }
    const Authorization = localStorage.getItem("Authorization");
    axios({
      method: "post",
      url: "https://team11-api.azurewebsites.net/api/event/create/ImageEvent/",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
      data: formData,
    })
      .then((res) => {
        console.log("res", res);
        if (res.data.errors) {
          setIsloading(false);
          let {
            eventDesc,
            eventTitle,
            eventAddress,
            path,
            time,
          } = res.data.errors;
          if (eventTitle) {
            cogoToast.error(eventTitle);
          }
          if (eventDesc) {
            cogoToast.error(eventDesc);
          }
          if (eventAddress) {
            cogoToast.error(eventAddress);
          }
          if (path) {
            cogoToast.error(path);
          }
          if (time) {
            cogoToast.error(time);
          }
          // if ((eventAddress, eventDesc, eventTitle, path, time)) {
          //   if ((eventAddress, eventDesc, eventTitle, path, time)) {
          //     setErrors({
          //       eventAddress,
          //       eventDesc,
          //       eventTitle,
          //       path,
          //       time,
          //     });
          //   }
          //   setIsloading(false);
          //   return cogoToast.error(
          //     "Vui lòng kiểm tra lại các trường thông tin"
          //   );
          // }
        } else {
          setIsloading(false);
          setRedirect(true);
          dispatch(getClubById(clubId));
          cogoToast.success("Tạo sự kiện thành công");
        }
      })
      .catch((err) => {
        console.log("err", err);
        setIsloading(false);
        cogoToast.error("Lỗi hệ thống...");
      });
  };

  // Set time
  const onChange = (value, dateString) => {
    setTimePick(dateString);
  };
  // Set file
  const handleChangeImg = (e) => {
    if (e.target.files.length) {
      setImageEvent({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  // FomrData
  let formData = new FormData();
  formData.append("eventTitle", eventTitle);
  formData.append("eventDesc", eventDesc);
  formData.append("eventAddress", eventAddress);
  formData.append("time", timePick);
  formData.append("imageEvent", imageEvent.raw);
  console.log("formData", formData);
  if (redirect) {
    return <Redirect to="/adminClub/view-all-event" />;
  }
  const Icon1 = () => {
    return <MdEventNote></MdEventNote>;
  };
  return (
    <Fragment>
    
      <h2>Thêm sự kiện mới</h2>
      <Spin
        tip="Đang tạo event câu lạc bộ..."
        spinning={isLoading}
        size="large"
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          validateMessages={validateMessage}
        >
          <Form.Item
            label={
              <div>
                <span className="bat-buoc">*</span>
                <span>Tên sự kiện</span>
              </div>
            }
            name="eventTitle"
            className="title_form"
          >
            {!errors.eventTitle ? (
              <Input
                onChange={(e) => setEventTitle(e.target.value)}
                suffix={<MdEventNote></MdEventNote>}
              />
            ) : (
              <Fragment>
                <Input
                  onChange={(e) => setEventTitle(e.target.value)}
                  suffix={<MdEventNote></MdEventNote>}
                  className="error_input_lable"
                />
                <p className="error_input_p">{errors.eventTitle}</p>
              </Fragment>
            )}
          </Form.Item>

          <Form.Item
            label={
              <div>
                <span className="bat-buoc">*</span>
                <span>Mô tả sự kiện</span>
              </div>
            }
            name="eventDesc"
          >
            {!errors.eventDesc ? (
              <Input
                onChange={(e) => setEventDesc(e.target.value)}
                suffix={<MdDescription></MdDescription>}
              />
            ) : (
              <Fragment>
                <Input
                  onChange={(e) => setEventDesc(e.target.value)}
                  suffix={<MdDescription></MdDescription>}
                  className="error_input_lable"
                />
                <p className="error_input_p">{errors.eventDesc}</p>
              </Fragment>
            )}
          </Form.Item>
          <Form.Item
            label={
              <div>
                <span className="bat-buoc">*</span>
                <span>Địa điểm diễn ra</span>
              </div>
            }
            name="eventAddress"
          >
            {!errors.eventAddress ? (
              <Input
                onChange={(e) => setEventAddress(e.target.value)}
                suffix={<MdPlace></MdPlace>}
              />
            ) : (
              <Fragment>
                <Input
                  onChange={(e) => setEventAddress(e.target.value)}
                  suffix={<MdPlace></MdPlace>}
                  className="error_input_lable"
                />
                <p className="error_input_p">{errors.eventAddress}</p>
              </Fragment>
            )}
          </Form.Item>
          <Form.Item
            label={
              <div>
                <span className="bat-buoc">*</span>
                <span>Thời gian diễn ra</span>
              </div>
            }
            name="time"
          >
            {!errors.time ? (
              <RangePicker
                className="datePick"
                showTime={{ format: "HH:mm" }}
                format="DD-MM-YYYY HH:mm"
                onChange={onChange}
              />
            ) : (
              <Fragment>
                <RangePicker
                  className="datePick error_input_lable"
                  showTime={{ format: "HH:mm" }}
                  format="DD-MM-YYYY HH:mm"
                  onChange={onChange}
                />
                <p className="error_input_p">{errors.time}</p>
              </Fragment>
            )}
          </Form.Item>

          <Form.Item
            label={
              <div>
                <span className="bat-buoc">*</span>
                <span>Hình ảnh sự kiện</span>
              </div>
            }
            name="imageEvent"
          >
            <input
              type="file"
              onChange={handleChangeImg}
              name="file"
              id="file"
              class="inputfile"
            />
            {!errors.path ? (
              <label for="file" className="lable_input_file">
                <UploadOutlined></UploadOutlined>
                Chọn tệp
              </label>
            ) : (
              <Fragment>
                <label
                  for="file"
                  className="lable_input_file error_input_lable"
                >
                  <UploadOutlined></UploadOutlined>
                  Chọn tệp
                </label>
                <p className="error_input_p">Tệp không được để trống!</p>
              </Fragment>
            )}
            <img className="img_preview" src={imageEvent.preview} />
            {/* <FormB4.File id="custom-file" /> */}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="btn_create_event"
            >
              Tạo sự kiện
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Fragment>
  );
};

export default CreateEvent;
