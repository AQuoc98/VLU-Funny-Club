import React, { useState, useEffect, setState } from "react";
import { AiOutlineAreaChart } from "react-icons/ai";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const clubTotal = (props) => {
  return (
    <div className="thong-ke">
      <Container>
        <Row>
          <Col lg="8">
            <p className="p-thong-ke-green">Tổng số câu lạc bộ</p>
            <h5 className="statistic-totalclub">{props.totalClub.length}</h5>
          </Col>
          <Col lg="4" className="m-auto">
            <AiOutlineAreaChart></AiOutlineAreaChart>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default clubTotal;
