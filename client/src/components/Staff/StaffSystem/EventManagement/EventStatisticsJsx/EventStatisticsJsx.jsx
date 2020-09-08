import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import EventTotal from "../eventTotal";
import EventChart from "../eventChart";
import { actGetAllEventRequest } from "../../../../../Redux/actions/user-events.action";
//import { Test } from './EventStatisticsJsx.styles';

const EventStatisticsJsx = (props) => {
  return (
    <Fragment>
      <Container>
        <Row>
        <h2 className="title-dashboard">BIỂU ĐỒ THỐNG KÊ SỰ KIỆN</h2>
        </Row>
        <Row>
          <EventTotal></EventTotal>
        </Row>

        <EventChart></EventChart>
      </Container>
    </Fragment>
  );
};
export default EventStatisticsJsx;
