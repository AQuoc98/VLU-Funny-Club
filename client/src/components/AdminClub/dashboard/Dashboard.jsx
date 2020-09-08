import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LeftCircleFilled } from "@ant-design/icons";
import { AiFillStar } from "react-icons/ai";
import { MdPhotoCamera } from "react-icons/md";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import cogoToast from "cogo-toast";
import { UploadLogo } from "./UploadLogo";
import { UpdateString } from "./UpdateString";
import { Rate } from "antd";

export const DashboardInfo = () => {
  const override = css`
    position: relative;
    top: 175px;
    margin: auto;
    z-index: 1;
  `;

  const dataInfo = useSelector((state) => state.getClubsById.ClubById);
  console.log("dataInfo", dataInfo);

  const clubImageDefault = useSelector(
    (state) => state.getClubsById.ClubById.clubImage
  );

  const [clubImage, setClubImage] = useState({ preview: "", raw: "" });
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setClubImage({ preview: clubImageDefault, raw: clubImageDefault });
  }, [clubImageDefault]);

  let title_club = {
    margin: "auto",
    textAlign: "center",
    marginBottom: "25px",
    marginTop: " 20px",
  };
  let sectionStyleHeader = {
    backgroundImage: `url(${clubImage.preview})`,
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    borderRadius: "5px",
  };

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
  formData.append("imageClub", clubImage.raw);

  const handleSubmitChangeImageBanner = (e) => {
    setIsloading(true);
    const Authorization = localStorage.getItem("Authorization");
    axios({
      method: "put",
      url: `https://team11-api.azurewebsites.net/api/club/updateFileImageBanner/ImageClub/${dataInfo._id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
      data: formData,
    })
      .then((res) => {
        setIsloading(false);
        setIsShow(false);
        cogoToast.info("Cập nhật ảnh bìa thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setClubImage({ preview: clubImageDefault, raw: clubImageDefault });
    setIsShow(false);
  };
  let className = "background_layout_header";
  if (isLoading === true) {
    className += " blur_back";
  }

  const RateMember = () => {
    return <Rate disabled defaultValue={dataInfo.memberRate} />;
  };
  return (
    <Fragment>
      <Row>
        <BarLoader
          css={override}
          height={4}
          width={150}
          color={"#1890ff"}
          loading={isLoading}
        ></BarLoader>
        <div className={className} style={sectionStyleHeader}>
          {" "}
          <label for="upload-photo" className="edit_background_header">
            <MdPhotoCamera style={{ fontSize: "1.5em" }}></MdPhotoCamera> Chỉnh
            sửa hình ảnh
          </label>
          {isShow ? (
            <Fragment>
              <label
                className="edit_background_header update"
                onClick={handleSubmitChangeImageBanner}
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
          <input
            type="file"
            name="photo"
            id="upload-photo"
            style={{ display: "none" }}
            onChange={handleChangeImg}
          />
        </div>
      </Row>
      <Row className="content_header_info">
        <Col lg="3" className="logo_club_info">
          {<UploadLogo data={dataInfo.clubLogo} id={dataInfo._id}></UploadLogo>}
          <div className="body_content_info_club">
            <p>{dataInfo.clubName || <Skeleton />}</p>
          
            <RateMember></RateMember>
          </div>
        </Col>
        <Col lg="8" className="Detail_inFo">
          <UpdateString data={dataInfo}></UpdateString>
        </Col>
      </Row>
    </Fragment>
  );
};
