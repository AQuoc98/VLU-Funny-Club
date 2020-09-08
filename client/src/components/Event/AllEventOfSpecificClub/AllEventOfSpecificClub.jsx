import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import "./AllEventOfSpecificClub.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Input } from "antd";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
const { Meta } = Card;

const AllEventOfSpecificClub = ({
  name,
  events,
  match,
  disabledPagination,
  itemsToDisplay,
  filterText,
  currentEventsAS,
}) => {
  return (
    <Container>
      <Row>
        {filterText.length > 0 && currentEventsAS.length > 0
          ? currentEventsAS.map((event, index) => {
              disabledPagination(true);
              return (
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  style={{ marginTop: "5em" }}
                  key={index}
                >
                  <Link to={`/event-detail/${event._id}`}>
                    <div className="event-card ">
                      <div className="cover-img">
                        <img
                          className="br-left-right event-card-img"
                          alt=""
                          src={event.eventImage}
                        />
                      </div>

                      <p className="event-card-title">{event.eventTitle}</p>
                      <p className="event-card-description">
                        {event.eventDesc}
                      </p>
                    </div>
                  </Link>
                </Col>
              );
            })
          : filterText.length > 0 && itemsToDisplay.length === 0
          ? (disabledPagination(false),
            ( <Container>
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
              </Container>))
          : events
              .filter((item) => {
                return item.isActive === true;
              })
              .map((event, index) => {
                disabledPagination(true);
                return (
                  <Col
                    xs={12}
                    sm={12}
                    lg={4}
                    style={{ marginTop: "5em" }}
                    key={index}
                  >
                    <Link to={`/event-detail/${event._id}`}>
                      <div className="event-card ">
                        <div className="cover-img">
                          <img
                            className="br-left-right event-card-img"
                            alt=""
                            src={event.eventImage}
                          />
                        </div>

                        <p className="event-card-title">{event.eventTitle}</p>
                        <p className="event-card-description">
                          {event.eventDesc}
                        </p>
                      </div>
                    </Link>
                  </Col>
                );
              })}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = (dispatch) => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventOfSpecificClub);
