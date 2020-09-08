import React, { Fragment, useState, useEffect } from "react";
import { MdPhotoCamera } from "react-icons/md";
import axios from "axios";
import cogoToast from "cogo-toast";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

export const UpdateStruc = (props) => {
  const override = css`
    position: relative;
    top: 175px;
    margin: auto;
    z-index: 1;
  `;
  const [clubImage, setClubImage] = useState({ preview: "", raw: "" });
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setClubImage({ preview: props.data, raw: props.data });
  }, [props.data]);

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

  const handleSubmitChangeStruc = () => {
    setIsloading(true);
    setIsShow(true);
    const Authorization = localStorage.getItem("Authorization");
    axios({
      method: "put",
      url: `https://team11-api.azurewebsites.net/api/club/updateFileStruc/ImageClub/${props.id}`,
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
        cogoToast.info("Cập nhật ảnh cơ cấu thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setClubImage({ preview: props.data, raw: props.data });
    setIsShow(false);
  };
  let className = "img_struc";
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
      <label for="upload-struc" className="edit_background_header">
        <MdPhotoCamera style={{ fontSize: "1.5em" }}></MdPhotoCamera> Chỉnh sửa
        hình ảnh
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
      <input
        type="file"
        name="photo"
        id="upload-struc"
        style={{ display: "none" }}
        onChange={handleChangeImg}
      />
      <img src={clubImage.preview} className={className}></img>
    </Fragment>
  );
};
