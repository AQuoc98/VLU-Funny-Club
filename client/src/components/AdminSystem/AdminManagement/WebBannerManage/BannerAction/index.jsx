import BannerAction from "./BannerAction";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button as ButtonAnt } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";

function Index(props) {
  const {} = props;

  return (
    <Fragment>
      <BannerAction />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
