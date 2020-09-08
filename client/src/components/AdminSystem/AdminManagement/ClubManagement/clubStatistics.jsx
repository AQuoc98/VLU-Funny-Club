import React, { useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import ClubChart from "./clubChart";
import ClubTotal from "./clubTotal";
import "./clubManagement.css";
import {
  actGetAllClubRequest,
  getChartClub,
} from "../../../../Redux/actions/user-clubs.action";

const ClubStatistics = ({ userClubs, getAllClub, getChartClub }) => {
  const totalClub = userClubs;
  useEffect(() => {
    getAllClub();
    getChartClub();
  }, []);
  return (
    <Fragment>
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userClubs: state.userClubs,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClub: () => dispatch(actGetAllClubRequest()),
  getChartClub: () => dispatch(getChartClub()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClubStatistics);
