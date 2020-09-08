import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ children, ...rest }) {
  console.log("vao day");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        this.props.auth.adminReducer.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
