import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import { AiOutlineAreaChart } from "react-icons/ai";
import { actGetAllEventRequest } from "../../../../Redux/actions/user-events.action";

function EventTotal({ userEvents, getAllEvents }) {
  useEffect(() => {
    getAllEvents();
  }, []);
  console.log(userEvents);
  return (
    <div className="thong-ke">
      <Container>
        <Row>
          <Col lg="8">
            <p className="p-thong-ke-green">Tổng số sự kiện</p>
            <h5 className="statistic-totalclub">{userEvents.length}</h5>
          </Col>
          <Col lg="4" className="m-auto">
            <AiOutlineAreaChart></AiOutlineAreaChart>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userEvents: state.userEvents,
});

const mapDispatchToProps = (dispatch) => ({
  getAllEvents: () => dispatch(actGetAllEventRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventTotal);
