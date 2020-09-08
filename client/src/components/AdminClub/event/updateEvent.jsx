import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { UpdateText } from "./UpdateText";
import { UpdateFile } from "./UpdateFile";
import axios from "axios";
import { useState } from "react";

const UpdateEvent = (props) => {
  console.log("asdsadasd", props.location.state.data);
  // let [data, setData] = useState(null);
  // const clubId = useSelector((state) => state.getClubsById.ClubById._id);
  // useEffect(() => {
  //   const Authorization = localStorage.getItem("Authorization");
  //   axios({
  //     method: "get",
  //     url: `https://team11-api.azurewebsites.net/api/event/getIdById/${props.match.params.id}`,
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `${Authorization}`,
  //     },
  //   })
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       // cogoToast.error("Lỗi hệ thống...");
  //     });
  // }, []);
  const data = {
    linkImg: `${props.location.state.data.imageEvent}`,
    id: `${props.location.state.data.eventId}`,
  };

  const FormUpdate = () => {
    return (
      <Container>
        <Row>
          <Col lg="4 update_file_event">
            <UpdateFile data={data}></UpdateFile>
          </Col>
          <Col lg="8 update_text_event">
            <UpdateText data={props.location.state.data}></UpdateText>
          </Col>
        </Row>
      </Container>
    );
  };
  return <FormUpdate></FormUpdate>;
};
export default UpdateEvent;
