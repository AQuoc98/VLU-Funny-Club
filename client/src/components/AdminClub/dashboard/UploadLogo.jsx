import React from "react";
import { MdPhotoCamera } from "react-icons/md";
import { Fragment, useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import cogoToast from "cogo-toast";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

export const UploadLogo = (props) => {
  const override = css`
    position: relative;
    top: 175px;
    margin: auto;
    z-index: 1;
  `;
  const [isShow, setIsShow] = useState(false);
  const [imageLogo, setImageLogo] = useState({ preview: "", raw: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setImageLogo({ preview: props.data, raw: props.data });
  }, [props.data]);

  let sectionStyle = {
    backgroundImage: `url(${imageLogo.preview})`,
  };

  const handleUpdateLogo = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const Authorization = localStorage.getItem("Authorization");
    axios({
      method: "put",
      url: `https://team11-api.azurewebsites.net/api/club/updateFileLogo/ImageClub/${props.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
      data: formData,
    })
      .then((res) => {
        setIsShow(false);
        setIsLoading(false);
        cogoToast.info("Cập nhật logo thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // FomrData
  let formData = new FormData();
  formData.append("imageClub", imageLogo.raw);

  // Set file
  const handleChangeImg = (e) => {
    if (e.target.files.length) {
      setImageLogo({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setIsShow(true);
    }
  };
  const handleCancelLogo = (e) => {
    e.preventDefault();
    setImageLogo({ preview: props.data, raw: props.data });
    setIsShow(false);
  };

  let classImg = "img_logo_club";
  if (isLoading === true) {
    classImg += " blur_back";
  }

  return (
    <div className={classImg} style={sectionStyle}>
      <BarLoader
        css={override}
        height={4}
        width={150}
        color={"#1890ff"}
        loading={isLoading}
      ></BarLoader>
      <label
        for="upload_photo_logo"
        className="edit_background_header edit_logo"
      >
        <MdPhotoCamera style={{ fontSize: "1.5em" }}></MdPhotoCamera>
      </label>
      <input
        type="file"
        name="photo_logo"
        id="upload_photo_logo"
        style={{ display: "none" }}
        onChange={handleChangeImg}
      />
      {isShow ? (
        <div className="edit_log">
          <a href="" className="save_log" onClick={handleUpdateLogo}>
            Lưu
          </a>
          <a href="" className="cancel_log" onClick={handleCancelLogo}>
            Thoát
          </a>
        </div>
      ) : (
        false
      )}
    </div>
  );
};
