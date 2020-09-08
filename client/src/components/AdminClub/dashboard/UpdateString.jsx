import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Row, Col, Container } from "react-bootstrap";
import { FormUpdate } from "./FormUpdate";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import { UpdateStruc } from "./UpdateStruc";

export const UpdateString = (props) => {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Thông tin chi tiết">
        <Container>
          <Row>
            <FormUpdate data={props}></FormUpdate>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="profile" title="Cập nhật cấu trúc câu lạc bộ">
        <Row>
          <Col>
            <UpdateStruc
              data={props.data.clubStructureImage}
              id={props.data._id}
            ></UpdateStruc>
          </Col>
        </Row>
      </Tab>
    </Tabs>
  );
};
