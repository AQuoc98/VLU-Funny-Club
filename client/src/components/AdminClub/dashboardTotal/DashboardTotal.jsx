import React, { Fragment } from "react";
import { TotalStudent } from "./Total/TotalStudent";
import { Row, Col } from "react-bootstrap";
import { TotalEvent } from "./Total/TotalEvent";
import { TotalSchedule } from "./Total/TotalSchedule";
import { FcHome } from "react-icons/fc";
import { useSelector } from "react-redux";

export const DashboardTotal = () => {
  const dataNumberStudent = useSelector(
    (state) => state.getClubsById.ClubById.students
  );
  const dataNumberEvent = useSelector(
    (state) => state.getClubsById.ClubById.event
  );
  const dataNumberSchedule = useSelector(
    (state) => state.getClubsById.ClubById.schedule
  );
  return (
    <Fragment>
      <div className="bang_dieu_khien">
        <FcHome></FcHome> / Bảng điều khiển
      </div>
      <Row>
        <Col lg="4">
          <TotalStudent data={dataNumberStudent}></TotalStudent>
        </Col>
        <Col lg="4">
          <TotalEvent data={dataNumberEvent}></TotalEvent>
        </Col>
        <Col lg="4">
          <TotalSchedule data={dataNumberSchedule}></TotalSchedule>
        </Col>
      </Row>
    </Fragment>
  );
};
