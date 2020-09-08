import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import TotalStudent from "./studentTotal";
import StudentChart from "./studentChart";

function StudentStatics(props) {
  return (
    <Fragment>
      <Container>
        <Row>
        <h2 className="title-dashboard">BIỂU ĐỒ THỐNG KÊ SINH VIÊN</h2>
        </Row>
        <Row>
          <TotalStudent />
        </Row>
        
        <StudentChart />
      </Container>
    </Fragment>
  );
}

export default StudentStatics;
