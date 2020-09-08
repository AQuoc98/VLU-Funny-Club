import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Input } from "antd";
import { Link } from "react-router-dom";
import { Tooltip, Button } from "antd";
import {
  actGetAllClubRequest,
  getClubById,
} from "../../../Redux/actions/user-clubs.action";

import "./ViewAllEvents.styles.css";

const text = <span>prompt text</span>;

const buttonWidth = 70;

const { Meta } = Card;

const ViewAllEvents = (props) => {
  const {
    events,
    getAllclbs,
    userclubs,
    disabledPagination,
    itemsToDisplay,
    filterText,
    currentEventsAS,
  } = props;
  useEffect(() => {
    getAllclbs();
  }, []);

  return (
    <Container>
      <Row>
        {filterText.length > 0 && currentEventsAS.length > 0
          ? currentEventsAS.map((event, index) => {
              disabledPagination(true);
              return (
                <Tooltip
                  placement="top"
                  key={index}
                  title={userclubs
                    .filter((item) => {
                      return item._id === event.Club;
                    })
                    .map((club, index) => {
                      return (
                        <p key={index}>
                          Thuộc câu lạc bộ &nbsp;
                          <span style={{ color: "#36C8CF" }}>
                            {club.clubName.toUpperCase()}
                          </span>
                        </p>
                      );
                    })}
                >
                  <Col
                    xs={12}
                    sm={12}
                    lg={6}
                    xl={4}
                    style={{ marginTop: "5em" }}
                    key={index}
                  >
                    <Link to={`/event-detail/${event._id}`}>
                      <div className="allevent-card ">
                        <div className="cover-img">
                          <img
                            className="br-left-right allevent-card-img"
                            alt=""
                            src={event.eventImage}
                          />
                        </div>

                        <p className="allevent-card-title">
                          {event.eventTitle}
                        </p>
                        <p className="allevent-card-description">
                          {event.eventDesc}
                        </p>
                      </div>
                    </Link>
                  </Col>
                </Tooltip>
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
          : events
              .filter((item) => {
                return item.isActive === true;
              })
              .map((event, index) => {
                disabledPagination(true);
                return (
                  <Tooltip
                    placement="top"
                    key={index}
                    title={userclubs
                      .filter((item) => {
                        return item._id === event.Club;
                      })
                      .map((club, index) => {
                        return (
                          <p key={index}>
                            Thuộc câu lạc bộ &nbsp;
                            <span style={{ color: "#36C8CF" }}>
                              {club.clubName.toUpperCase()}
                            </span>
                          </p>
                        );
                      })}
                  >
                    <Col
                      xs={12} sm={12} lg={6} xl={4}
                      style={{ marginTop: "5em" }}
                      key={index}
                    >
                      <Link to={`/event-detail/${event._id}`}>
                        <div className="allevent-card ">
                          <div className="cover-img">
                            <img
                              className="br-left-right allevent-card-img"
                              alt=""
                              src={event.eventImage}
                            />
                          </div>

                          <p className="allevent-card-title">
                            {event.eventTitle}
                          </p>
                          <p className="allevent-card-description">
                            {event.eventDesc}
                          </p>
                        </div>
                      </Link>
                    </Col>
                  </Tooltip>
                );
              })}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    getClubsByIdFromReducer: state.getClubsById,
    userclubs: state.userClubs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClubById: (id) => {
      dispatch(getClubById(id));
    },
    getAllclbs: () => dispatch(actGetAllClubRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllEvents);
