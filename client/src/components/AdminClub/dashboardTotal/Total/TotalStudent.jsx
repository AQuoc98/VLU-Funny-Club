import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";

export const TotalStudent = (props) => {
  console.log("props", props);
  let totalS = 0;
  if (props.data) {
    props.data.forEach((element) => {
      if (element.isConfirmJoin) {
        totalS++;
      }
    });
  } else {
    totalS = 0;
  }
  let Render = () => {
    return (
      <div className="total_student_dash">
        <Row>
          <Col lg="3">
            <div className="icon_number">
              <FaUsers></FaUsers>
            </div>
          </Col>
          <Col lg="6">
            <p className="header_of_dashboar">Tổng Sinh Viên</p>
            <p className="numnber_of_dashboard">{totalS}</p>
          </Col>
          <Col lg="3">
            <div className="icon_number_default">
              <AiOutlineRise></AiOutlineRise>
            </div>
          </Col>
        </Row>
      </div>
    );
  };
  return <Render></Render>;
};
