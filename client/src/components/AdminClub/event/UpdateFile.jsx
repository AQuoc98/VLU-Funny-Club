import React, { Fragment, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { MdPhotoCamera } from "react-icons/md";
import axios from "axios";
import cogoToast from "cogo-toast";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

export const UpdateFile = (props) => {
  const override = css`
    position: relative;
    top: 175px;
    margin: auto;
    z-index: 1;
  `;
  const { linkImg, id } = props.data;
  const [clubImage, setClubImage] = useState({ preview: "", raw: "" });
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setClubImage({ preview: linkImg, raw: linkImg });
  }, [linkImg]);

  const handleSubmitChangeStruc = () => {
    setIsloading(true);
    setIsShow(true);
    const Authorization = localStorage.getItem("Authorization");
    axios({
      method: "put",
      url: `https://team11-api.azurewebsites.net/api/event/updateFile/ImageEvent/${id}`,
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
    setClubImage({ preview: linkImg, raw: linkImg });
    setIsShow(false);
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
  formData.append("imageEvent", clubImage.raw);

  let className = "update_event_background";
  if (isLoading === true) {
    className += " blur_back";
  }
  return (
    <Fragment>
      <BarLoader
        css={override}
        height={4}
        width={150}
        color={"#1890ff"}
        loading={isLoading}
      ></BarLoader>
      <div
        className={className}
        style={{
          backgroundImage: `url(${clubImage.preview})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: " 300px",
        }}
      >
        <label for="upload_logo_event" className="edit_background_header">
          <MdPhotoCamera style={{ fontSize: "1.5em" }}></MdPhotoCamera>
          {/* Chọn hình ảnh */}
        </label>
        <input
          type="file"
          name="photo_logo"
          id="upload_logo_event"
          style={{ display: "none" }}
          onChange={handleChangeImg}
        />
        {isShow ? (
          <Fragment>
            <label
              className="edit_background_header update updateFile_event"
              onClick={handleSubmitChangeStruc}
            >
              Lưu
            </label>
            <label
              className="edit_background_header cancel updateFile_event"
              onClick={handleCancel}
            >
              Thoát
            </label>
          </Fragment>
        ) : (
          false
        )}
      </div>
    </Fragment>
  );
};
