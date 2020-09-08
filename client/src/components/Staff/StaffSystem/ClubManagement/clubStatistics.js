import React, { useState, useEffect, setState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineAreaChart } from "react-icons/ai";
import { connect } from "react-redux";
import ClubChart from "./clubChart";
import ClubTotal from "./clubTotal";
import { useSelector } from "react-redux";
import "./clubManagement.css";

const ClubStatistics = () => {
  const totalClub = useSelector((state) => state.userClubs);
  return (
    <Container>
      <Row>
      <h2 className="title-dashboard">BIỂU ĐỒ THỐNG KÊ CÂU LẠC BỘ</h2>
      </Row>
      <Row>
        <ClubTotal totalClub={totalClub}></ClubTotal>
      </Row>

      <Row>
        <Col>
          <ClubChart></ClubChart>
        </Col>
      </Row>
    </Container>
  );
};

export default ClubStatistics;
