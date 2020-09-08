import { connect } from "react-redux";
import React, { Fragment, useState, useEffect } from "react";
import { MdPhotoCamera } from "react-icons/md";
import axios from "axios";
import cogoToast from "cogo-toast";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import { Container } from "react-bootstrap";
import Axios from "axios";
import { withRouter } from "react-router";
import { Empty } from "antd";
import "./BannerAction.styles.css";
const BannerAction = (props) => {
  const { data, id, history } = props;

  const override = css`
    position: relative;
    top: 175px;
    margin: auto;
    z-index: 1;
  `;
  const [clubImage, setClubImage] = useState({ preview: "", raw: "" });
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  // Set file
  const handleChangeImg = (e) => {
    if (e.target.files.length) {
      setClubImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setIsShow(true);
    }
  };
  // FomrData
  let formData = new FormData();
  formData.append("imageBanner", clubImage.raw);

  const handleSubmitChangeStruc = () => {
    setIsloading(true);
    setIsShow(true);
    const Authorization = localStorage.getItem("Authorization");
    axios({
      method: "POST",
      url: `https://team11-api.azurewebsites.net/api/banner/create/imageBanner`,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
      data: formData,
    })
      .then((res) => {
        if (res.data) {
          setIsloading(false);
          setIsShow(false);
          cogoToast.info("Thêm banner thành công");
          history.push(`/adminsystem/BannerManage`);
        } else {
          cogoToast.fail("Thêm banner thất bại!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    const Authorization = localStorage.getItem("Authorization");
    Axios({
      method: "GET",
      url: `https://team11-api.azurewebsites.net/api/club/getClubById/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
    })
      .then((res) => {
        setClubImage({
          preview: res.data.clubStructureImage,
          raw: res.data.clubStructureImage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsShow(false);
  };
  let className = "img_struc";
  if (isLoading === true) {
    className += " blur_back";
  }

  return (
    <Container>
      <BarLoader
        css={override}
        height={4}
        width={150}
        color={"#1890ff"}
        loading={isLoading}
      ></BarLoader>

      <label for="upload-struc" className="edit_background_header">
        <MdPhotoCamera></MdPhotoCamera>Thêm banner
      </label>

      {isShow ? (
        <Fragment>
          <label
            className="edit_background_header update"
            onClick={handleSubmitChangeStruc}
          >
            Lưu
          </label>
          <label
            className="edit_background_header cancel"
            onClick={handleCancel}
          >
            Thoát
          </label>
        </Fragment>
      ) : (
        false
      )}
      {!clubImage.preview ? (
        <Fragment>
          <input
            type="file"
            name="photo"
            id="upload-struc"
            style={{ display: "none" }}
            onChange={handleChangeImg}
          />
          <Empty />
        </Fragment>
      ) : (
        <img
          name="imageBanner"
          src={clubImage.preview}
          className={className}
          style={{ height: 350 }}
        ></img>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BannerAction)
);
