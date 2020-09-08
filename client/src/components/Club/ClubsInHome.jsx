import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import "./clubinhome.css";

const { Meta } = Card;

class ClubsInHomeLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    //lấy giá trị được truyền từ UserPage
    const { clubs, type } = this.props;
    const Type = type.map((item, index) => {
      return item.clubGroupType.toUpperCase();
    });
    const title = `CÂU LẠC BỘ CẤP ${Type}`;
    // các phẩn tử của câu lạc bộ được render ở đây
    const elements = clubs
      .filter((club) => {
        return club.isActive === true;
      })
      .slice(0, 3)
      .map((club, index) => {
        return (
          <Col
            xs={12}
            sm={12}
            lg={4}
            md={12}
            style={{ marginTop: "5em" }}
            key={index}
          >
            <Fade left>
              <Link to={`/club-detail/${club._id}`}>
                <div className="club-card ">
                  <div className="cover-img">
                    <img
                      className="br-left-right club-card-img"
                      alt=""
                      src={club.clubImage}
                    />
                  </div>

                  <p className="club-card-title">{club.clubName}</p>
                  <p className="club-card-description">{club.clubDesc}</p>
                </div>
              </Link>
            </Fade>
          </Col>
        );
      });
    return (
      <div>
        <Container>
          {/* title */}
          {/* Trường Đoàn hội Khoa */}
          <h1 className="home-body-title home-body-title-club">
            {title === "CÂU LẠC BỘ CẤP DOANHOI"
              ? " CÂU LẠC BỘ CẤP ĐOÀN HỘI"
              : title === "CÂU LẠC BỘ CẤP TRUONG"
              ? "CÂU LẠC BỘ CẤP TRƯỜNG"
              : title
              ? title
              : "...Loading"}
          </h1>

          <div className="title-line">
            <div className="tl-1"></div>
            <div className="tl-2"></div>
            <div className="tl-3"></div>
          </div>
          <p className="homesubtitle">
            {clubs.length > 0
              ? `Tìm hiểu và tham gia các câu lạc bộ!`
              : `Hiện tại không có câu lạc bộ nào!`}
          </p>
          <Row>
            {/* filter => map ra club */}
            {elements}
          </Row>
        </Container>
      </div>
    );
  }
}

export default ClubsInHomeLayout;
