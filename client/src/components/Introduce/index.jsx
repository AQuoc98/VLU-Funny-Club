import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd";
import {
  AiFillPlayCircle,
  AiOutlineFileSearch,
  AiOutlineTeam,
  AiOutlineCalendar,
} from "react-icons/ai";
import "./introduce.css";

export default function index() {
  return (
    <Container>
      <Row className="introduce-row1">
        <Col xs={12} md={5} lg={6} xl={5} className="row1-col1-title">
          <p>CHÀO MỪNG BẠN ĐẾN VỚI VLU FUNNY CLUB</p>
        </Col>
        <Col xs={12} md={7} lg={6} xl={7} className="row1-col2-title">
          <p>
            VLU FUNNY CLUB là website tương tác và hoạt động chính của các câu
            lạc bộ trường đại học Văn Lang. Tại website VLU FUNNY CLUB, bạn có
            thể tìm hiểu và tham gia các hoạt động, sự kiện của các câu lạc bộ
            các cấp trường đại học Văn Lang.
          </p>
        </Col>
      </Row>

      <Row>
        <Col xs={12} lg={12} md={12}>
          <div class="album-square">
            <div class="overlay">
              <a
                href="https://www.youtube.com/watch?time_continue=1&v=mveofh0MZDQ"
                target="_blank"
              >
                {" "}
                <AiFillPlayCircle />
              </a>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="introduce-row-3">
        <Col xs={12} lg={12} md={12} className="row3-col1">
          <p>CÁC TÍNH NĂNG NỔI BẬT</p>
        </Col>

        <Col xs={12} lg={4} md={4}>
          <div className="introduce-card ">
            <div className="introduce-icon">
              <span>
                <AiOutlineFileSearch />
              </span>
            </div>

            <p className="introduce-card-title">
              Tìm kiếm câu lạc bộ và sự kiện nổi bật
            </p>
            <p className="introduce-card-description">
              {" "}
              Bạn có thể tìm kiếm tất cả các câu lạc bộ và sự kiện của trường
              đại học Văn Lang
            </p>
          </div>
        </Col>

        <Col xs={12} lg={4} md={4}>
          <div className="introduce-card ">
            <div className="introduce-icon">
              <span>
                <AiOutlineTeam />
              </span>
            </div>

            <p className="introduce-card-title">Tham gia các câu lạc bộ</p>
            <p className="introduce-card-description">
              {" "}
              Tham gia các câu lạc bộ mà bạn thích và tham gia các hoạt động
              thường niên, sự kiện của câu lạc bộ
            </p>
          </div>
        </Col>

        <Col xs={12} lg={4} md={4}>
          <div className="introduce-card ">
            <div className="introduce-icon">
              <span>
                <AiOutlineCalendar />
              </span>
            </div>

            <p className="introduce-card-title">
              Theo dõi lịch sinh hoạt của câu lạc bộ
            </p>
            <p className="introduce-card-description">
              {" "}
              Cập nhập lịch biểu hoạt động của câu lạc bộ mà bạn tham gia để nắm
              bắt được những hoạt động mới nhất
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
