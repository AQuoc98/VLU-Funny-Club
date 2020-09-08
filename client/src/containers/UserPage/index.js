import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/banner";
import Event from "../../components/Event/index";
import Clubs from "../../components/Club";
import { actGetAllClubRequest } from "../../Redux/actions/user-clubs.action";
import { setCurrentUser } from "../../Redux/actions/student.action";
import jwtDecode from "jwt-decode";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { decode } from "jsonwebtoken";
import { Spin } from "antd";

import "./homepageindex.css";

const HomePage = (props) => {
  const { userclubs } = props;
  const Authorization = localStorage.getItem("Authorization");
  const decoded = decode(Authorization);

  useEffect(() => {
    props.getAllclbs();
    if (!Authorization) return;
    props.setCurrentUser(decoded);
    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <Fragment>
      {/* header */}
      <Header />
      {/* banner */}
      <Banner />
      {/* events */}

      <Container>
        <Event />
        <div id="chooseArea">
          <div hidden></div>

          <Container>
            <div className="button-more-homepage">
              <Link to="/events">
                <Button type="link" className="mr-right-top-2em button-more ">
                  Xem thêm
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </Container>
      {/* clubs */}
      {userclubs.length > 0 ? (
        <Clubs clubs={userclubs} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      )}

      {/* footer */}
      <Footer />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    userclubs: state.userClubs,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllclbs: () => dispatch(actGetAllClubRequest()),
    setCurrentUser: (decoded) => {
      dispatch(setCurrentUser(decoded));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
