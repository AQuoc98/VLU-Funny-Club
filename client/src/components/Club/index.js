import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Event from "../Event/index";
import ClubsInHomeLayout from "./ClubsInHome";
import { Container } from "react-bootstrap";
import { Button } from "antd";
import "./club.css";

export default class Clubs extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    //lấy giá trị được truyền từ UserPage
    const { clubs } = this.props;

    var clubTruongs,
      clubKhoas,
      clubDHs = [];

    var clubTruongType,
      clubKhoaType,
      clubDhType = [];

    clubTruongType = clubs
      .filter((club) => {
        return club.clubGroupType === "truong";
      })
      .slice(0, 1);

    clubDhType = clubs
      .filter((club) => {
        return club.clubGroupType === "doanhoi";
      })
      .slice(0, 1);

    clubKhoaType = clubs
      .filter((club) => {
        return club.clubGroupType === "khoa";
      })
      .slice(0, 1);

    clubTruongs = clubs.filter((club) => {
      return club.clubGroupType === "truong";
    });

    clubKhoas = clubs.filter((club) => {
      return club.clubGroupType === "khoa";
    });

    clubDHs = clubs.filter((club) => {
      return club.clubGroupType === "doanhoi";
    });

    return (
      <Fragment>
        <Container>
          {/* đừng đụng vô nha  */}
          <ClubsInHomeLayout clubs={clubDHs} type={clubDhType} />
          {/* đừng đụng vô nha  */}
          {clubDHs.length > 0 ? (
            <div id="chooseArea">
              <div hidden></div>

              <Container>
                <div className="button-more-homepage">
                  <Link to="/clubs/doanhoi">
                    <Button
                      type="link"
                      className="mr-right-top-2em button-more"
                    >
                      Xem thêm
                    </Button>
                  </Link>
                </div>
              </Container>
            </div>
          ) : (
            ""
          )}
        </Container>
        <Container>
          <ClubsInHomeLayout clubs={clubTruongs} type={clubTruongType} />
          {clubTruongs.length > 0 ? (
            <div id="chooseArea">
              <div hidden></div>
			  <Container>
              <div className="button-more-homepage">
                <Link to="/clubs/truong">
                  <Button type="link" className="mr-right-top-2em button-more">
                    Xem thêm
                  </Button>
                </Link>
              </div>
			  </Container>
            </div>
          ) : (
            ""
          )}
        </Container>

        <Container>
          <ClubsInHomeLayout clubs={clubKhoas} type={clubKhoaType} />
          {clubKhoas.length > 0 ? (
            <div id="chooseArea">
              <div hidden></div>
			  <Container>
              <div className="button-more-homepage">
                <Link to="/clubs/khoa">
                  <Button type="link" className="mr-right-top-2em button-more">
                    Xem thêm
                  </Button>
                </Link>
              </div>
			  </Container>
            </div>
          ) : (
            ""
          )}
        </Container>
      </Fragment>
    );
  }
}
