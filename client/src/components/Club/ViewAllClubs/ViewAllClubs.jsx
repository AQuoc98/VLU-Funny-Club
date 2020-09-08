import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./viewallclub.css";

const { Meta } = Card;

const Clubs = ({
  clubs,
  disabledPagination,
  itemsToDisplay,
  filterText,
  currentclubsAS,
}) => {
  const elements = clubs.map((item, index) => {
    disabledPagination(true);
    return (
      <Col xs={12} sm={12} lg={6} xl={4} style={{ marginTop: "5em" }} key={index}>
        <Link to={`/club-detail/${item._id}`}>
          <div className="allclub-card ">
            <div className="cover-img">
              <img
                className="br-left-right allclub-card-img"
                alt=""
                src={item.clubImage}
              />
            </div>

            <p className="allclub-card-title">{item.clubName}</p>
            <p className="allclub-card-description">{item.clubDesc}</p>
          </div>
        </Link>
      </Col>
    );
  });

  return (
    <Fragment>
      {/* title */}
      {/* Trường Đoàn hội Khoa */}
      <Container>
        <Row className="itemclub-inallclub">
          {/* filter => map ra club */}
          {filterText.length > 0 && currentclubsAS.length > 0
            ? currentclubsAS.map((clb, index) => {
                disabledPagination(true);
                return (
                  <Col xs={12} sm={12} lg={6} xl={4} style={{ marginTop: "5em" }} key={index}>
                    <Link to={`/club-detail/${clb._id}`}>
                      <div className="allclub-card ">
                        <div className="cover-img">
                          <img
                            className="br-left-right allclub-card-img"
                            alt=""
                            src={clb.clubImage}
                          />
                        </div>

                        <p className="allclub-card-title">{clb.clubName}</p>
                        <p className="allclub-card-description">{clb.clubDesc}</p>
                      </div>
                    </Link>
                  </Col>
                );
              })
            : filterText.length > 0 && itemsToDisplay.length === 0
            ? (disabledPagination(false),
              (
                <Container>
                  <Row>
                    <Col></Col>
                    <Col xs={6}>
                      <div className="nosearch-result">
                        <img
                          src="/images/cartoon.png"
                          className="nosearch-result-img"
                        />
                        <h3 className="nosearch-result-h3">
                          Xin lỗi! Không tìm thấy kết quả tìm kiếm
                        </h3>
                        <h5 className="nosearch-result-h5">
                          Vui lòng sửa đổi từ khoá tìm kiếm
                        </h5>
                      </div>
                    </Col>
                    <Col></Col>
                  </Row>
                </Container>
              ))
            : elements}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Clubs;
