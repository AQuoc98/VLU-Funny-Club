import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "antd";
import "./event.css";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const { Meta } = Card;

const EventElements = ({ events }) => {
  return (
    <div>
      <Fade left>
        <Container>
          <Row>
            {/* filter => map ra event */}
            {events
              .filter((event) => {
                return event.isActive === true;
              })
              .slice(0, 3)
              .map((event, index) => {
                return (
                  <Col
                    xs={12}
                    sm={12}
                    lg={4}
                    md={12}
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
      </Fade>
    </div>
  );
};

export default EventElements;
