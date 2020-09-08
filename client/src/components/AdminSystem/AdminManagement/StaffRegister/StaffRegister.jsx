import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, withRouter } from "react-router-dom";
import { Button as ButtonAnt } from "antd";
import { AiOutlineRollback } from "react-icons/ai";
import Axios from "axios";
import cogoToast from "cogo-toast";
import { FcUndo } from "react-icons/fc";
import { Container } from "react-bootstrap";
import "./StaffRegister.styles.css";

const StaffRegister = (props) => {
  const { history } = props;
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const Authorization = localStorage.getItem("Authorization");
    Axios({
      method: "POST",
      url: `https://team11-api.azurewebsites.net/api/admin/registerStaff`,
      headers: {
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
      data,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          cogoToast.success("Tạo thành công!");
          history.push("/adminsystem/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <h2 className="title-dashboard">TẠO TÀI KHOẢN CHO STAFF</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <h5 className="h5_update_info foradmin_sys">Tên tài khoản</h5>
        <input
          className="input_update"
          name="userName"
          ref={register({ required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.userName && (
          <span style={{ color: "red" }}>vui lòng nhập tên tài khoản!</span>
        )}

        <h5 className="h5_update_info foradmin_sys">Mật khẩu</h5>
        <input
          className="input_update"
          type="password"
          name="passWord"
          ref={register({ required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.passWord && (
          <span style={{ color: "red" }}>Vui lòng nhập mật khẩu!</span>
        )}

        <h5 className="h5_update_info foradmin_sys">Họ và tên</h5>
        <input
          className="input_update"
          name="fullName"
          ref={register({ required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.fullName && (
          <span style={{ color: "red" }}>Vui lòng nhập họ và tên!</span>
        )}
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <Container>
            <input
              type="submit"
              style={{ width: 100, margin: 0 }}
              className="btn_update_info"
              value="Tạo tài khoản"
            />
          </Container>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StaffRegister)
);
