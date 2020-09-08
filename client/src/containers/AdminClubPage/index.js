import React, { Component, Fragment } from "react";
import AdminClub from "../../components/AdminClub/AdminClub.js";
import CreateEvent from "../../components/AdminClub/event/createEvent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const index = ({ match }) => {
  console.log("match", match);
  return (
    <Fragment>
      <AdminClub matchSend={match} />
      {/* <Route path="/adminClub" component={AdminClub} exact /> */}
      {/* <Route path={`${match.url}/create-event`} component={CreateEvent} exact /> */}
    </Fragment>
  );
};

export default index;
