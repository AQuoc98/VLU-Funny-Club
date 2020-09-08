import React, { useEffect, useState, Fragment } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cogoToast from "cogo-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { initial } from "lodash";
import { getClubById } from "../../../Redux/actions/user-clubs.action";
import { useDispatch, useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";
import Skeleton from "react-loading-skeleton";

var _ = require("lodash");

export const FormUpdate = (props) => {
  const override = css`
    position: relative;
    top: 175px;
    margin: auto;
    z-index: 1;
  `;
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  let [isLoading, setIsLoading] = useState(false);
  let [blur, setBlur] = useState(false);
  let [errName, setErrName] = useState("");
  let [errDesc, setErrDesc] = useState("");
  let [errEmail, setErrEmail] = useState("");
  let [errFace, setErrFace] = useState("");
  let [errFunc, setErrFunc] = useState("");
  let [errHis, setErrHis] = useState("");
  let [errPhone, setErrPhone] = useState("");
  let [errPur, setErrPur] = useState("");

  let {
    clubName,
    clubDesc,
    clubEmail,
    clubFace,
    clubFunction,
    clubHistory,
    clubPhone,
    clubPurpose,
    clubGroupType,
    _id,
  } = props.data.data;
  const onSubmit = (data) => {
    console.log("data", data);
    let err;
    if (data.clubName == "") {
      err = false;
      setErrName("Vui lòng nhập tên câu lạc bộ");
    }
    if (data.clubDesc == "") {
      err = false;
      setErrDesc("Vui lòng mô tả câu lạc bộ");
    }
    if (data.clubEmail.toString() == "") {
      err = false;
      setErrEmail("Vui lòng nhập email câu lạc bộ");
    }
    if (data.clubFace == "") {
      err = false;
      setErrFace("Vui lòng nhập facebook câu lạc bộ");
    }
    if (data.clubFunction == "") {
      err = false;
      setErrFunc("Vui lòng nhập chức năng câu lạc bộ");
    }
    if (data.clubHistory == "") {
      err = false;
      setErrHis("Vui lòng nhập lịch sử câu lạc bộ");
    }
    if (data.clubPhone == "") {
      err = false;
      setErrPhone("Vui lòng nhập số điện thoại câu lạc bộ");
    }
    if (data.clubPurpose == "") {
      err = false;
      setErrPur("Vui lòng nhập mục đích câu lạc bộ");
    }
    if (err === false) {
      return false;
    }
    setIsLoading(true);
    setBlur(true);
    const Authorization = localStorage.getItem("Authorization");
    axios
      .put(`https://team11-api.azurewebsites.net/api/club/updateInfoText/${_id}`, {
        clubDesc: data.clubDesc,
        clubEmail: data.clubEmail,
        clubFace: data.clubFace,
        clubFunction: data.clubFunction,
        clubHistory: data.clubHistory,
        clubName: data.clubName,
        clubPhone: data.clubPhone,
        clubPurpose: data.clubPurpose,
        clubGroupType: "khoa",
      })
      .then((res) => {
        setIsLoading(false);
        setBlur(false);
        dispatch(getClubById(_id));
        setErrName("");
        setErrDesc("");
        setErrEmail("");
        setErrFace("");
        setErrFunc("");
        setErrHis("");
        setErrPhone("");
        setErrPur("");
        cogoToast.info("Cập nhật thông tin thành công");
      })
      .catch((err) => {
        setIsLoading(false);
        setBlur(false);
        cogoToast.error(err.response.data.clubName);
        console.log("err", err.response);
      });
  };

  const intialValues = {
    clubName,
    clubDesc,
    clubEmail,
    clubFace,
    clubFunction,
    clubHistory,
    clubPhone,
    clubPurpose,
    clubGroupType,
  };

  let classImg = " ";
  if (blur === true) {
    classImg += " blur_back";
  }

  const FormUpdate = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%" }}
        className={classImg}
      >
        <div className="effec_update_text">
          {isLoading ? (
            <PropagateLoader size={15} color={"#4164e3"}></PropagateLoader>
          ) : (
            false
          )}
        </div>
        <h5 className="h5_update_info">Tên câu lạc bộ</h5>
        {!errName ? (
          <input
            className="input_update"
            defaultValue={intialValues.clubName}
            name="clubName"
            placeholder="Nhập tên câu lạc bộ"
            ref={register}
          />
        ) : (
          <Fragment>
            <input
              name="clubName"
              placeholder="Nhập tên câu lạc bộ"
              ref={register}
              className="error_input_lable"
            />
            <p className="error_input_p">{errName}</p>
          </Fragment>
        )}

        <h5 className="h5_update_info">Mô tả câu lạc bộ</h5>

        {errDesc ? (
          <Fragment>
            <input
              className="error_input_lable"
              name="clubDesc"
              placeholder="Nhập mô tả câu lạc bộ"
              ref={register}
            />
            <p className="error_input_p">{errDesc}</p>
          </Fragment>
        ) : (
          <input
            className="input_update"
            defaultValue={intialValues.clubDesc}
            name="clubDesc"
            placeholder="Nhập mô tả câu lạc bộ"
            ref={register}
          />
        )}

        <h5 className="h5_update_info">Lịch sử câu lạc bộ</h5>
        {errHis ? (
          <Fragment>
            <input
              className="error_input_lable"
              name="clubHistory"
              placeholder="Nhập lịch sử câu lạc bộ"
              ref={register}
            />
            <p className="error_input_p">{errHis}</p>
          </Fragment>
        ) : (
          <input
            className="input_update"
            defaultValue={intialValues.clubHistory}
            name="clubHistory"
            placeholder="Nhập lịch sử câu lạc bộ"
            ref={register}
          />
        )}

        <h5 className="h5_update_info">Câu lạc bộ cấp</h5>
        <input
          className="input_update"
          defaultValue={intialValues.clubGroupType}
          name="clubGroupType"
          ref={register}
          disabled
        />

        <h5 className="h5_update_info">Số điện thoại câu lạc bộ</h5>
        {errPhone ? (
          <Fragment>
            <input
              className="error_input_lable"
              name="clubPhone"
              placeholder="Nhập số điện thoại câu lạc bộ"
              ref={register}
            />
            <p className="error_input_p">{errPhone}</p>
          </Fragment>
        ) : (
          <input
            className="input_update"
            defaultValue={intialValues.clubPhone}
            name="clubPhone"
            placeholder="Nhập mô tả câu lạc bộ"
            ref={register}
          />
        )}

        <h5 className="h5_update_info">Email câu lạc bộ</h5>

        {errEmail ? (
          <Fragment>
            <input
              className="error_input_lable"
              name="clubEmail"
              placeholder="Nhập mô tả câu lạc bộ"
              ref={register}
            />
            <p className="error_input_p">{errPhone}</p>
          </Fragment>
        ) : (
          <input
            className="input_update"
            defaultValue={intialValues.clubEmail}
            name="clubEmail"
            placeholder="Nhập mô tả câu lạc bộ"
            ref={register}
          />
        )}

        <h5 className="h5_update_info">Face câu lạc bộ</h5>
        {errFace ? (
          <Fragment>
            <input
              className="error_input_lable"
              name="clubFace"
              placeholder="Nhập mô tả câu lạc bộ"
              ref={register}
            />
            <p className="error_input_p">{errFace}</p>
          </Fragment>
        ) : (
          <input
            className="input_update"
            defaultValue={intialValues.clubFace}
            name="clubFace"
            placeholder="Nhập mô tả câu lạc bộ"
            ref={register}
          />
        )}

        <h5 className="h5_update_info">Mục đích câu lạc bộ</h5>

        {errPur ? (
          <Fragment>
            <textarea
              className="error_input_lable"
              name="clubPurpose"
              placeholder="Nhập mục đích câu lạc bộ"
              ref={register}
            />
            <p className="error_input_p">{errPhone}</p>
          </Fragment>
        ) : (
          <textarea
            className="input_update"
            defaultValue={intialValues.clubPurpose}
            name="clubPurpose"
            placeholder="Nhập mô tả câu lạc bộ"
            ref={register}
          />
        )}

        <h5 className="h5_update_info">Chức năng câu lạc bộ</h5>

        {errFunc ? (
          <Fragment>
            <textarea
              className="error_input_lable"
              name="clubFunction"
              placeholder="Nhập chức năng câu lạc bộ"
              ref={register}
            />{" "}
            <p className="error_input_p">{errFunc}</p>
          </Fragment>
        ) : (
          <textarea
            className="input_update"
            defaultValue={intialValues.clubFunction}
            name="clubFunction"
            placeholder="Nhập mô tả câu lạc bộ"
            ref={register}
          />
        )}

        <input type="submit" value="Cập nhật" className="adminclub_btn_update_info" />
      </form>
    );
  };
  return <FormUpdate></FormUpdate>;
};
