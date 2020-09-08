import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
// import { DatePicker } from "antd";
import cogoToast from "cogo-toast";
import axios from "axios";
import { UpdateDate } from "./UpdateDate";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { getClubById } from "../../../Redux/actions/user-clubs.action";

var dateFormat = require("dateformat");

// const { RangePicker } = DatePicker;

export const UpdateText = (props) => {
  const dispatch = useDispatch();
  const clubId = useSelector((state) => state.getClubsById.ClubById._id);

  let { eventAddress, eventDesc, eventTitle, eventId, time } = props.data;

  // react hook form
  const { register, handleSubmit } = useForm();

  // useState
  let [data, setData] = useState(null);
  let [blur, setBlur] = useState(false);
  let [title, setTitle] = useState("");
  const [timePick, setTimePick] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [redirect, setRedirect] = useState(false);

  let timeL = "";

  if (time) {
    timeL = time;
  }
  const onChangeDatePick = (timeChange) => {
    timeL = timeChange;
  };

  // useEffect
  useEffect(() => {
    setData(props.data);
    let timeDefault = time.split(",");
    setStartTime(timeDefault[0]);
    setEndTime(timeDefault[1]);
  }, []);

  let classImg = " ";
  if (blur === true) {
    classImg += " blur_back";
  }

  console.log("title", title);
  const onSubmit = (data) => {
    axios
      .put(`https://team11-api.azurewebsites.net/api/event/update/${eventId}`, {
        eventAddress: data.eventAddress,
        eventDesc: data.eventDesc,
        eventTitle: data.eventTitle,
        time: timeL.toString(),
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.errors) {
          if (res.data.errors.eventTitle) {
            cogoToast.error(`${res.data.errors.eventTitle}`);
          } else if (res.data.errors.eventDesc) {
            cogoToast.error(`${res.data.errors.eventDesc}`);
          } else if (res.data.errors.eventAddress) {
            cogoToast.error(`${res.data.errors.eventAddress}`);
          }
        }

        if (!res.data.errors) {
          setRedirect(true);
          dispatch(getClubById(clubId));
          cogoToast.info("Cập nhật thông tin thành công");
        }
      })
      .catch((err) => console.log(err));
  };

  if (redirect) {
    return <Redirect to="/adminClub/view-all-event" />;
  }
  const FormText = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%" }}
        className={classImg}
      >
        <h5 className="h5_update_info">Tên sự kiện</h5>
        <input
          className="input_update"
          defaultValue={eventTitle}
          name="eventTitle"
          placeholder="Nhập tên sự kiện"
          ref={register}
        />
        <h5 className="h5_update_info">Mô tả sự kiện</h5>
        <input
          className="input_update"
          defaultValue={eventDesc}
          name="eventDesc"
          placeholder="Nhập môt tả sự kiện"
          ref={register}
        />
        <h5 className="h5_update_info">Địa chỉ sự kiện</h5>
        <input
          className="input_update"
          defaultValue={eventAddress}
          name="eventAddress"
          placeholder="Nhập địa chỉ sự kiện"
          ref={register}
        />
        <h5 className="h5_update_info">Thời gian sự kiện</h5>

        <UpdateDate
          onChangeDatePick={onChangeDatePick}
          data={{ startTime, endTime }}
        ></UpdateDate>
        <input type="submit" value="Cập nhật" className="adminclub_btn_update_info" />
      </form>
    );
  };
  return <FormText></FormText>;
};
