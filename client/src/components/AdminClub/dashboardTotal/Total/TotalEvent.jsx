import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { TiTicket } from "react-icons/ti";

export const TotalEvent = (props) => {
  let totalS;
  if (props.data) {
    totalS = props.data.length;
  } else {
    totalS = 0;
  }
  let Render = () => {
    return (
      <div className="total_student_dash">
        <Row>
          <Col lg="3">
            <div className="icon_number" style={{ backgroundColor: "#4CAF50" }}>
              <TiTicket></TiTicket>
            </div>
          </Col>
          <Col lg="6">
            <p className="header_of_dashboar" style={{ color: "#4CAF50" }}>
              Tổng Sự Kiện
            </p>
            <p className="numnber_of_dashboard">{totalS}</p>
          </Col>
          <Col lg="3">
            <div className="icon_number_default" style={{ color: "#4CAF50" }}>
              <AiOutlineRise></AiOutlineRise>
            </div>
          </Col>
        </Row>
      </div>
    );
  };
  return <Render></Render>;
};
