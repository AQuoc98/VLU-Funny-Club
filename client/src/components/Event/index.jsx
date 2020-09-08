import React, { Component } from "react";
import * as Constance from "../../constants/types.action";
import { connect } from "react-redux";
import EventElements from "./EventElements";
import { actGetAllEventRequest } from "../../Redux/actions/user-events.action";
import { Spin } from "antd";
import "./event.css";

class IndexInHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.GetAllEvent();
  }

  render() {
    const { events } = this.props;
    // console.log(events);

    return (
      <div>
        <h1 className="home-body-title">{Constance.UPCOMMING_EVENTS}</h1>
        <div className="title-line">
          <div className="tl-1"></div>
          <div className="tl-2"></div>
          <div className="tl-3"></div>
        </div>
        <p className="homesubtitle">Đến và tham gia các hoạt động!</p>
        {events.length > 0 ? (
          <EventElements events={events} />
        ) : (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.userEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllEvent: () => {
      dispatch(actGetAllEventRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexInHomePage);
