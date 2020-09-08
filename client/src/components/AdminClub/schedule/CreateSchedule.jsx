import React, { Fragment, useState } from "react";
import moment from "moment";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, DatePicker } from "antd";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdClass, MdContentPaste } from "react-icons/md";
import { GrDocumentNotes } from "react-icons/gr";
import { getClubById } from "../../../Redux/actions/user-clubs.action";

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

const CreateSchedule = (props) => {
  const dispatch = useDispatch();
  const idClub = useSelector((state) => state.getClubsById.ClubById._id);
  // useState
  const [room, setRoom] = useState("");
  const [content, setContent] = useState("");
  const [note, setNote] = useState("");
  const [timePick, setTimePick] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [renderView, setRenderView] = useState(false);

  // Post axios
  const onFinish = (values) => {
    setIsloading(true);
    const Authorization = localStorage.getItem("Authorization");
    axios({
      method: "post",
      url: "https://team11-api.azurewebsites.net/api/club/addSchedule/" + idClub,
      headers: {
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
      data: {
        date: timePick,
        room,
        content,
        note,
      },
    })
      .then((res) => {
        dispatch(getClubById(idClub));
        setIsloading(false);
        setRenderView(true);
        cogoToast.success("Tạo lịch trình thành công");
      })
      .catch((err) => {
        setIsloading(false);
        cogoToast.error("Lỗi hệ thống...");
      });
  };

  // Set time
  const onChange = (value, dateString) => {
    setTimePick(dateString);
  };
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }
  if (renderView === true) {
    return <Redirect to="/adminClub/view-schedule" />;
  }
  return (
    <Fragment>
      <h2>Thêm mới lịch trình</h2>
      <Spin
        tip="Đang tạo lịch trình câu lạc bộ..."
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
          <Form.Item label="Thời gian" name="date" rules={[{ required: true }]}>
            <DatePicker
              format="DD-MM-YYYY HH:mm"
              showTime={true}
              disabledDate={disabledDate}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item label="Phòng" name="room" rules={[{ required: true }]}>
            <Input
              onChange={(e) => setRoom(e.target.value)}
              suffix={<MdClass></MdClass>}
            />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true }]}
          >
            <Input
              onChange={(e) => setContent(e.target.value)}
              suffix={<MdContentPaste></MdContentPaste>}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note" rules={[{ required: true }]}>
            <Input
              onChange={(e) => setNote(e.target.value)}
              suffix={<GrDocumentNotes></GrDocumentNotes>}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="btn_create_event"
            >
              Tạo lịch trình
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Fragment>
  );
};

export default CreateSchedule;
