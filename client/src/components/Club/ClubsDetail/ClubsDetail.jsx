import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { actGetAllClubRequest } from "../../../Redux/actions/user-clubs.action";
import "./ClubsDetail.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Empty } from "antd";
import {
  Rate,
  Card,
  Button,
  DatePicker,
  Modal,
  Comment,
  Tooltip,
  Avatar,
  Tabs,
  Input,
} from "antd";
import moment, { now } from "moment";
import {
  CommentOutlined,
  PhoneOutlined,
  FacebookOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { decode } from "jsonwebtoken";
import Axios from "axios";
import { actGetAllEventRequest } from "../../../Redux/actions/user-events.action";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TextArea from "antd/lib/input/TextArea";
import swal from "sweetalert";
import { getProfileFetch } from "../../../Redux/actions/student.action";
import Pagination from "../../Pagination/Pagination";
import { parseInt } from "lodash";

//main component
const ClubsDetail = ({
  userClubs,
  match,
  history,
  getAllclbs,
  userLogin,
  getAllEvents,
  userEvents,
}) => {
  const id = match.params.id;
  const [modal2Visible, setModal2Visible] = useState(false);
  const [request, setRequest] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [visible, setVisible] = useState(false);
  const [requestConfirm, setConfirmRequest] = useState("");
  const [feedBack, setFeedBack] = useState("");
  const [allFeedBack, setAllFeedBack] = useState([]);
  const [allFeedBack2, setAllFeedBack2] = useState([]);
  const [rate, setRate] = useState(0);
  const [isWaitingForAdminAccept, setIsWaitingForAdminAccept] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clubsPerPage, setClubsPerPage] = useState(3);
  const formatDate = (date) => {
    var dateFormat = require("dateformat");
    var date = new Date(`${date}`);
    var options = { year: "numeric", month: "numeric", day: "2-digit" };
    var _resultDate = new Intl.DateTimeFormat("en-GB", options).format(date);
    return _resultDate.replace(/ /g, "-");
  };
  const Authorization = localStorage.getItem("Authorization");
  const AfterDecoded = decode(Authorization);
  const Payload = AfterDecoded ? AfterDecoded.payload : "";
  const UserType = Payload.userType;
  const { TabPane } = Tabs;
  const monthFormat = "YYYY/MM";
  function callback(key) {
    console.log(key);
  }
  var dateFormat = require("dateformat");

  useEffect(() => {
    getAllEvents();
    getAllclbs();
    Axios({
      method: "GET",
      url: `https://team11-api.azurewebsites.net/api/club/getAllScheduleOfClub/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
    })
      .then((res) => {
        setSchedules(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        Axios({
          method: "GET",
          url: `https://team11-api.azurewebsites.net/api/club/getAllFeedback/${id}`,
          headers: {
            Accept: "application/json",
          },
        })
          .then((res) => {
            // setSchedules(res.data.schedule.reverse());
            // console.log(res.data);
            setAllFeedBack2(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [UserType, id]);

  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;

  // allFeedBack : là mảng những feedback sau khi đã thêm 1 fb vào
  // allFeedBack2 : là mảng những feedback được gọi từ api => nó có từ lúc component mới khởi tạo
  const currentClubs = allFeedBack2.slice(indexOfFirstClub, indexOfLastClub);
  const paginate = (number) => {
    setCurrentPage(number);
  };

  // gui request tham gia club
  const onSendReQuest = () => {
    setVisible(true);
    return Axios({
      method: "POST",
      url: `https://team11-api.azurewebsites.net/api/student/joinClub/${id}`,
      data: { requestConfirm },
      headers: {
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //modal handling
  const showModal = () => {
    setVisible(true);
    setTimeout(() => {
      document.querySelector("#inpSendRequest").focus();
    }, 100);
  };

  const handleOk = (e) => {
    console.log(e);
    onSendReQuest();
    setIsWaitingForAdminAccept(true);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  // gui feedback
  const onSendFeedBack = () => {
    console.log("rate", rate);
    Axios({
      method: "POST",
      url: `https://team11-api.azurewebsites.net/api/club/sendFeedBackOfClub/${id}`,
      data: { feedBack, rate },
      headers: {
        Accept: "application/json",
        Authorization: `${Authorization}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          swal(`Bạn chưa tham gia câu lạc bộ!`, "oops", "error");
        } else if (res.data) {
          swal("Cảm ơn bạn đã gửi đánh giá!", "", "success");
          setFeedBack("");
          setRate(0);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        Axios({
          method: "GET",
          url: `https://team11-api.azurewebsites.net/api/club/getAllFeedback/${id}`,
          headers: {
            Accept: "application/json",
          },
        })
          .then((res) => {
            // setSchedules(res.data.schedule.reverse());
            console.log(res.data);
            setAllFeedBack2(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  //search
  const [filterText, setFilterText] = useState("");
  var scheduleActive = schedules.filter((item) => {
    return item.scheduleId.isActive === true;
  });
  const filteredItems = scheduleActive.filter((item) => {
    if (item.scheduleId.date.substring(3, 5).includes("/")) {
      return item.scheduleId.date
        .substring(3, 5)
        .replace("/", "")
        .includes(filterText);
    } else {
      return item.scheduleId.date.substring(3, 5).includes(filterText);
    }
  });
  console.log("filteredItems", filteredItems);

  const onGetDate = (e) => {
    if (!e) {
      setFilterText("");
    } else {
      if (formatDate(e._d).substring(3, 5).includes("/")) {
        setFilterText(formatDate(e._d).substring(3, 5).replace("/", ""));
      } else {
        setFilterText(formatDate(e._d).substring(3, 5));
      }
    }
  };

  const itemsToDisplay = filterText ? filteredItems : schedules;
  return (
    <Fragment>
      {userClubs
        .filter((item) => {
          return item._id === id && item.isActive === true;
        })
        .map((club, index) => {
          return (
            <Fragment key={index}>
              {/* Banner */}
              <Container>
                <Col sm="12" xs="12">
                  <div className="club-banner-1">
                    <div className="club-banner-2">
                      <img
                        src={club.clubImage}
                        className="img-banner-detailclub"
                      />
                    </div>
                    <div className="club-avatar">
                      <img src={club.clubLogo} className="img-avatar" />
                      <h2 className="club-name">{club.clubName}</h2>
                      <div>
                        {parseInt(club.memberRate) === 0 ? (
                          <Rate autoFocus={true} value={0} disabled />
                        ) : (
                          <Rate
                            autoFocus={true}
                            defaultValue={parseInt(club.memberRate)}
                            disabled
                          />
                        )}
                      </div>
                      {club.students.filter((item) => {
                        return (
                          item.isConfirmJoin === false &&
                          item.studentId._id === userLogin.profile.id
                        );
                      }).length > 0 || isWaitingForAdminAccept ? (
                        <Button type="primary" className="introduce-button">
                          Chờ AdminClub xác nhận
                        </Button>
                      ) : UserType === "admin" ||
                        (UserType === "adminClub" &&
                          Payload.clubId === club._id) ||
                        club.students.filter((item) => {
                          return (
                            item.studentId._id === userLogin.profile.id &&
                            (item.isConfirmJoin === true ||
                              item.isConfirmJoin === false)
                          );
                        }).length > 0 ? (
                        <Button type="primary" className="introduce-button">
                          ĐÃ THAM GIA
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          className="introduce-button"
                          onClick={userLogin.profile.id ? showModal : false}
                        >
                          THAM GIA
                        </Button>
                      )}
                      <Modal
                        title="Nguyện vọng "
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        className="modal-request"
                      >
                        <Input
                          id="inpSendRequest"
                          placeholder="Nhập yêu cầu của bạn..."
                          value={requestConfirm}
                          onChange={(e) => setConfirmRequest(e.target.value)}
                        />
                      </Modal>
                    </div>
                  </div>
                </Col>
              </Container>

              <Container>
                <Row>
                  <Col xs={12} sm={12} lg={8}>
                    <Col sm="12">
                      <div className="club-information">
                        <Card
                          title="THÔNG TIN CÂU LẠC BỘ"
                          className="card-information"
                          extra={
                            <a
                              onClick={() => setModal2Visible(true)}
                              className="card-information-more"
                            >
                              Xem thêm
                            </a>
                          }
                        >
                          <Col sm="12" xs="12">
                            <p className="card-information-body-text">
                              <span className="card-information span">
                                <CommentOutlined />
                              </span>
                              <strong>Email:</strong> {club.clubEmail}
                            </p>
                          </Col>

                          <Col sm="12">
                            <p className="card-information-body-text">
                              <span className="card-information span">
                                <PhoneOutlined />
                              </span>
                              <strong>Số điện thoại: </strong>
                              {club.clubPhone}
                            </p>
                          </Col>

                          <Col sm="12">
                            <p className="card-information-body-text">
                              <span className="card-information span">
                                <FacebookOutlined />
                              </span>
                              <a href={`${club.clubFace}`} target="blank">
                                {club.clubFace}
                              </a>
                            </p>
                          </Col>

                          <Col sm="12">
                            <p className="card-information-body-text">
                              <span className="card-information span">
                                <UserOutlined />
                              </span>
                              <strong>Thành viên tham gia: </strong>
                              {
                                club.students.filter((item) => {
                                  return item.isConfirmJoin === true;
                                }).length
                              }
                            </p>
                          </Col>
                        </Card>
                      </div>
                    </Col>
                    {UserType === "admin" ||
                    (UserType === "adminClub" && Payload.clubId === club._id) ||
                    UserType === "staff" ||
                    club.students.filter((item) => {
                      return (
                        item.studentId._id === userLogin.profile.id &&
                        item.isConfirmJoin === true
                      );
                    }).length > 0 ? (
                      <Col sm="12">
                        <div className="club-schedule">
                          <Card
                            title="LỊCH SINH HOẠT"
                            className="card-schedule"
                          >
                            <DatePicker
                              id="date-picker"
                              placeholder="nhập tháng của clb mà bạn muốn tìm"
                              format={monthFormat}
                              onChange={(e) => onGetDate(e)}
                              picker="month"
                              className="schedule-date-filter"
                            />
                            <div class="table-wrapper-scroll-y my-custom-scrollbar">
                              <table class="table table-bordered table-striped mb-0 schedule-table">
                                <thead>
                                  <tr>
                                    <th scope="col">Ngày</th>
                                    <th scope="col">Phòng</th>
                                    <th scope="col">Nội Dung</th>
                                    <th scope="col">Note</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {itemsToDisplay.length > 0 &&
                                  filterText.length > 0 ? (
                                    itemsToDisplay.map((schedule, index) => {
                                      return (
                                        <tr key={index}>
                                          <th scope="row">
                                            {schedule.scheduleId.date}
                                          </th>
                                          <td>{schedule.scheduleId.room}</td>
                                          <td>{schedule.scheduleId.content}</td>
                                          <td>{schedule.scheduleId.note}</td>
                                        </tr>
                                      );
                                    })
                                  ) : filterText.length > 0 &&
                                    itemsToDisplay.length === 0 ? (
                                    <tr>
                                      <td colspan="4">
                                        Không có kết quả trùng!
                                      </td>
                                    </tr>
                                  ) : (
                                    schedules
                                      .filter((item) => {
                                        return (
                                          item.scheduleId.isActive === true
                                        );
                                      })
                                      .map((schedule, index) => {
                                        return (
                                          <tr key={index}>
                                            <th scope="row">
                                              {schedule.scheduleId.date}
                                            </th>
                                            <td>{schedule.scheduleId.room}</td>
                                            <td>
                                              {schedule.scheduleId.content}
                                            </td>
                                            <td>{schedule.scheduleId.note}</td>
                                          </tr>
                                        );
                                      })
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </Card>
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}

                    <Col sm="12">
                      <div className="club-rate">
                        <Card title="ĐÁNH GIÁ" className="card-rate">
                          {userLogin.isauthenticated === true ||
                          club.students.filter((item) => {
                            return (
                              item.studentId._id === userLogin.profile.id &&
                              item.isConfirmJoin === true
                            );
                          }).length > 0 ||
                          (UserType === "adminClub" &&
                            Payload.clubId === club._id) ? (
                            <Fragment>
                              <Col sm="12">
                                <p className="rate-name-member">
                                  {" "}
                                  <strong>{Payload.fullName}</strong>
                                </p>
                              </Col>

                              <Col sm="12">
                                <Rate
                                  value={rate}
                                  onChange={(value) => setRate(value)}
                                />
                              </Col>

                              <Form>
                                <Col>
                                  <TextArea
                                    allowClear
                                    placeholder="Nhập đánh giá..."
                                    className="input-feedback-form"
                                    rows="5"
                                    value={feedBack}
                                    className="feedback-input"
                                    onChange={(e) =>
                                      setFeedBack(e.target.value)
                                    }
                                  />
                                </Col>

                                <Col sm="12" className="send-button">
                                  <Button
                                    type="primary"
                                    className="rate-button"
                                    style={{ marginTop: 10, marginBottom: 5 }}
                                    onClick={onSendFeedBack}
                                  >
                                    Gửi
                                  </Button>
                                </Col>
                              </Form>
                            </Fragment>
                          ) : (
                            ""
                          )}
                          <Col sm="12">
                            <div className="view-rate">
                              {currentClubs.length > 0
                                ? currentClubs.map((feedback, index) => {
                                    return (
                                      <Comment
                                        key={index}
                                        author={
                                          <a>
                                            {feedback.studentId.info.fullName}
                                          </a>
                                        }
                                        avatar={
                                          <Avatar
                                            src={
                                              feedback.studentId.info.avataUser
                                            }
                                            alt="Han Solo"
                                          />
                                        }
                                        content={
                                          <p>
                                            <div>
                                              <Rate
                                                disabled
                                                value={parseInt(feedback.rate)}
                                              />
                                            </div>
                                            {feedback.feedBack}
                                          </p>
                                        }
                                        datetime={
                                          <span>
                                            {formatDate(
                                              `${feedback.registerDate}`
                                            )}
                                          </span>
                                        }
                                      />
                                    );
                                  })
                                : "Không có đánh giá!"}
                            </div>
                          </Col>

                          <Col sm="12">
                            <Pagination
                              currentPage={currentPage}
                              itemsPerPage={clubsPerPage}
                              totalitems={
                                allFeedBack.length > 0
                                  ? allFeedBack.length
                                  : allFeedBack2.length
                              }
                              paginate={paginate}
                            />
                          </Col>
                        </Card>
                      </div>
                    </Col>
                  </Col>

                  <Col xs={12} sm={12} lg={4}>
                    <div className="ant-event-head-title">Sự kiện</div>
                    {userEvents
                      .filter((item) => {
                        return item.Club === club._id && item.isActive === true;
                      })
                      .slice(0, 3)
                      .map((event, index) => {
                        // console.log(event);
                        return (
                          <Col sm="12" key={index}>
                            <div className="club-new-event">
                              <a target="_blank">
                                <Link to={`/event-detail/${event._id}`}>
                                  <div className="cover-img">
                                    <img
                                      src={event.eventImage}
                                      className="event-card-img"
                                    />
                                  </div>
                                </Link>
                              </a>

                              <div className="clubinformation-content-event">
                                <Link to={`/event-detail/${event._id}`}>
                                  <h3 className="club-new-event-title">
                                    {event.eventTitle}
                                  </h3>
                                </Link>
                                <p className="club-new-event-date">
                                  <span className="date-event-span">
                                    <CalendarOutlined />
                                  </span>{" "}
                                  {event.time}
                                </p>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    {userEvents.filter((item) => {
                      return item.Club === club._id;
                    }).length > 0 ? (
                      <Col sm="12">
                        <div className="club-new-event-link-more">
                          <Link to={`/events/${club._id}`}>Xem thêm ...</Link>
                        </div>
                      </Col>
                    ) : (
                      <Col sm="12">
                        <div className="club-new-event-link-more">
                          <h3 className="no-event-text">
                            Không có sự kiện nào !
                          </h3>
                        </div>
                      </Col>
                    )}
                  </Col>
                </Row>
              </Container>

              <Modal
                style={{ marginTop: 420 }}
                title="THÔNG TIN CHI TIẾT"
                centered
                visible={modal2Visible}
                onOk={() => setModal2Visible(false)}
                onCancel={() => setModal2Visible(false)}
                footer={null}
              >
                <div className="modal-information">
                  <Tabs defaultActiveKey="1" onChange={callback} size="medium">
                    <TabPane
                      tab=" Mục đích"
                      key="1"
                      className="information-tabpane"
                    >
                      <p className="modal-information-content modal-information-scroll">
                        {club.clubPurpose}
                      </p>
                    </TabPane>
                    <TabPane tab=" Chức năng" key="2">
                      <p className="modal-information-content modal-information-scroll">
                        {club.clubFunction}
                      </p>
                    </TabPane>
                    {UserType === "admin" ||
                    UserType === "staff" ||
                    (UserType === "adminClub" && Payload.clubId === club._id) ||
                    club.students.filter((item) => {
                      return (
                        item.studentId._id === userLogin.profile.id &&
                        item.isConfirmJoin === true
                      );
                    }).length > 0 ? (
                      <TabPane tab="Cơ cấu câu lạc bộ" key="3">
                        <div className="cocau-clb">
                          <img
                            src={club.clubStructureImage}
                            className="cocau-img"
                          />
                        </div>
                      </TabPane>
                    ) : (
                      <TabPane key="3"></TabPane>
                    )}
                  </Tabs>
                </div>
              </Modal>
            </Fragment>
          );
        })}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    userClubs: state.userClubs,
    userLogin: state.userLogin,
    userEvents: state.userEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllclbs: () => dispatch(actGetAllClubRequest()),
    getAllEvents: () => dispatch(actGetAllEventRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubsDetail);
