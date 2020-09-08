import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import { AiOutlineAreaChart } from "react-icons/ai";
import { actGetAllStudentRequest } from "../../../../../Redux/actions/student.action";

function StudentTotal(props) {
  const { userEvents, getAllStudent } = props;
  useEffect(() => {
    getAllStudent();
  }, []);
  return (
    <div className="thong-ke">
      <Container>
        <Row>
          <Col lg="8">
            <p className="p-thong-ke-green">Tổng số sinh viên</p>
            <h5>{userEvents.length}</h5>
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
  getAllStudent: () => dispatch(actGetAllStudentRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentTotal);
