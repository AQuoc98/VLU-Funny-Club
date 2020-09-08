import React, { useEffect, Fragment } from "react";
import "./Picture.styles.css";
import swal from "sweetalert";

const Picture = (props) => {
  const { picture, userLogin } = props;

  // console.log(picture);
  useEffect(() => {
    if (userLogin.isAuthenticated === true) {
      swal({
        title: "Đăng nhập thành công!",
        text: "Bây giờ bạn đã có thể tham gia những câu lạc bộ xịn sò!",
        icon: "success",
        button: "OK!",
      });
    }
  }, [userLogin.isAuthenticated]);
  const element =
    picture === "2" ? (
      <div className="Picture-area-1"></div>
    ) : (
      <div className="Picture-area"></div>
    );
  return (
    <Fragment>
      {element}
      {/* <NotificationModal /> */}
    </Fragment>
  );
};
export default Picture;
