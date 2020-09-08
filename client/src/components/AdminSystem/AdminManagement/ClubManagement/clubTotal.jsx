import React from "react";
import { AiOutlineAreaChart } from "react-icons/ai";
import { Row, Col , Container} from "react-bootstrap";

const clubTotal = (props) => {
  return (
    <div className="thong-ke">
      <Container>
        <Row>
          <Col lg="8">
  
            <p className="p-thong-ke-green">Tổng số câu lạc bộ</p>
            <h5>{props.totalClub.length}</h5>
          </Col>
          <Col lg="4" className="m-auto">
            <AiOutlineAreaChart></AiOutlineAreaChart>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default clubTotal;
