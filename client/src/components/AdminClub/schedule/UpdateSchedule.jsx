import React, { Fragment, useState, useEffect } from "react";
import { Spin, Form, Button, DatePicker } from "antd";
import moment from "moment";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import cogoToast from "cogo-toast";
import { getClubById } from "../../../Redux/actions/user-clubs.action";
import { useDispatch, useSelector } from "react-redux";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};
const style = { margin: "0px 0px" };

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const UpdateSchedule = (props) => {
  const dispatch = useDispatch();
  const { content, date, note, room, id } = props.location.state.data;
  const idClub = useSelector((state) => state.getClubsById.ClubById._id);

  const [isLoading, setIsloading] = useState(false);
  const [datePickChange, setDatePick] = useState([...date, date]);

  const [roomChange, setRoom] = useState([...room, room]);
  const [contentChange, setContent] = useState([...content, content]);
  const [noteChange, setNote] = useState([...note, note]);
  const [isShown, setIsShown] = useState(false);
  let [renderBack, setRenderBack] = useState(false);
  let [renderSuccess, setRenderSuccess] = useState(false);

  // useEffect(() => {
  //   setDatePick(date);
  //   setRoom(room);
  //   setContent(content);
  //   setNote(note);
  // }, []);
  const onFinish = (data) => {
    console.log("datePickChange", datePickChange[datePickChange.length - 1]);
    console.log("data", data);
    let contentSave, dateSave, roomSave, noteSave;

    if (data.room) {
      roomSave = data.room;
    } else {
      roomSave = roomChange[roomChange.length - 1];
    }

    dateSave = datePickChange[datePickChange.length - 1];

    if (data.content) {
      contentSave = data.content;
    } else {
      contentSave = contentChange[contentChange.length - 1];
    }
    if (data.note) {
      noteSave = data.note;
    } else {
      noteSave = noteChange[noteChange.length - 1];
    }
    console.log("noteSave", noteSave);
    console.log("roomSave", roomSave);
    console.log("dateSave", dateSave);
    console.log("contentSave", contentSave);

    axios
      .put(`https://team11-api.azurewebsites.net/api/club/updateSchedule/${id}`, {
        room: roomSave,
        content: contentSave,
        note: noteSave,
        date: dateSave,
      })
      .then((res) => {
        console.log("res", res);
        setRenderSuccess(true);
        cogoToast.info("Cập nhật thành công");
      })
      .catch((e) => {
        const { content, date, note, room } = e.response.data;

        if (content) {
          cogoToast.error(content);
        }

        if (date) {
          cogoToast.error(date);
        }

        if (note) {
          cogoToast.error(note);
        }

        if (room) {
          cogoToast.error(room);
        }
      });
  };

  if (renderSuccess === true) {
    dispatch(getClubById(idClub));
    return <Redirect to="/adminClub/view-schedule" />;
  }
  const onBack = () => {
    setRenderBack(true);
  };
  if (renderBack === true) {
    return <Redirect to="/adminClub/view-schedule" />;
  }
  // Set time
  const onChangePick = (value, dateString) => {
    setDatePick([...dateString, dateString]);
  };

  return (
    <Fragment>
      <h2>Cập nhật lịch trình</h2>
      <Spin
        tip="Đang cập nhật event câu lạc bộ..."
        spinning={isLoading}
        size="large"
      >
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item label="Thời gian" name="date">
            <DatePicker
              format="DD-MM-YYYY HH:mm"
              showTime={true}
              defaultValue={moment(`${date}`, "DD-MM-YYYY HH:mm")}
              onChange={onChangePick}
              // defaultValue={date}
            />
          </Form.Item>
          <Form.Item label="Phòng" name="room">
            <input
              className="input_update"
              type="text"
              defaultValue={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <input
              className="input_update"
              type="text"
              defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <input
              className="input_update"
              type="text"
              defaultValue={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            {" "}
            <Button
              type="primary"
              htmlType="submit"
              className="btn_create_event"
              style={style}
            >
              Cập nhật lịch trình
            </Button>
          </Form.Item>{" "}
        </Form>
      </Spin>
    </Fragment>
  );
};

export default UpdateSchedule;
