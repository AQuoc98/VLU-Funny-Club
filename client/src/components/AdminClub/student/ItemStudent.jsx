import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";
import { RiBarcodeBoxLine } from "react-icons/ri";
import { Tooltip, Button, Divider } from "antd";

export const ItemStudent = (props) => {
  return (
    <Row className="item_student">
      <Col lg="3" className="fullname_confirm">
        <img src={props.data.avataUser} className="avatar_confirm"></img>
        <span>{props.data.fullName}</span>
      </Col>
      <Col lg="1"> {props.data.mssv}</Col>
      <Col lg="2">{props.data.major}</Col>
      <Col lg="1">{props.data.classMajor}</Col>
      <Col lg="3">{props.data.requestConfirm}</Col>
      <Col lg="1" className="confirm_icon_div">
        <Tooltip title="Xác nhận" color="#2ecc71" key="#2ecc71">
          <AiFillCheckSquare
            className="confirm_icon access"
            onClick={() => props.confirm()}
          ></AiFillCheckSquare>
        </Tooltip>
        <Tooltip title="Xoá" color="#e74c3c" key="#e74c3c">
          <AiFillCloseSquare
            className="confirm_icon remove"
            onClick={() => props.removeStudent()}
          ></AiFillCloseSquare>
        </Tooltip>
      </Col>
    </Row>
  );
};
