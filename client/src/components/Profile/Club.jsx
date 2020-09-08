import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./club.css";
import { Table, Button, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Club = ({ clubs, userclubs }) => {
  return (
    <div className="profile-clubjoined">
      <Col sm="12">
        <div className=" table-wrapper-scroll-y-profileform my-custom-scrollbar-profileform">
          <Table responsive bordered hover>
            {clubs.length > 0 ? (
              <Fragment>
                <thead>
                  <tr>
                    <th className="profile-title-table-club">STT</th>
                    <th className="profile-title-table-club">Logo lạc bộ</th>
                    <th className="profile-title-table-club">Tên câu lạc bộ</th>
                    {/* <th className="profile-title-table-club">Hành động</th> */}
                  </tr>
                </thead>
                <tbody>
                  {clubs.map((club, index) => {
                    return (
                      <tr key={index}>
                        <td className="profile-body-table-club">{index + 1}</td>
                        <td className="profile-body-table-club">
                          {userclubs
                            .filter((item) => {
                              return (
                                item._id === club.clubId._id &&
                                club.isConfirmJoin === true
                              );
                            })
                            .map((logo, index) => {
                              return (
                                <Link to={`/club-detail/${logo._id}`}>
                                  <img
                                    key={index}
                                    src={logo.clubLogo}
                                    alt=""
                                    className="profile-title-table-club-logo "
                                  />
                                </Link>
                              );
                            })}
                        </td>
                        <td className="profile-body-table-club">
                          {userclubs
                            .filter((item) => {
                              return item._id === club.clubId._id;
                            })
                            .map((name, index) => {
                              return (
                                <Link to={`/club-detail/${name._id}`}>
                                  <p
                                    className="profile-body-table-club-name"
                                    key={index}
                                  >
                                    {name.clubName}
                                  </p>
                                </Link>
                              );
                            })}
                        </td>
                        {/* <td className="profile-body-table-club">
                          <Button 
                            variant="danger"
                            onClick={() => {
                              alert("Bạn chắc chắn muốn rời ?");
                            }}
                          >
                            Rời câu lạc bộ
                          </Button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Fragment>
            ) : (
              <h1 style={{ color: "orange" }}>
                Bạn chưa tham gia câu lạc bộ nào !
              </h1>
            )}
          </Table>
        </div>
      </Col>
    </div>
  );
};

export default Club;
