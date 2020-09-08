import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { actGetAllEventRequest } from "../../../Redux/actions/user-events.action";
import ViewAllEvents from "./ViewAllEvents";
import { Container } from "react-bootstrap";
import { Spin, Input, Tooltip } from "antd";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Banner from "../../Banner/banner";
import { actGetAllClubRequest } from "../../../Redux/actions/user-clubs.action";
import { Col } from "react-bootstrap";
import Pagination from "../../Pagination/Pagination";
import { CloseOutlined } from "@ant-design/icons";
import "./ViewAllEvents.styles.css";
const Index = ({ getAllEvent, userEvents }) => {
  useEffect(() => {
    getAllEvent();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(9);
  const [togglePagination, setTogglePagination] = useState(true);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = userEvents
    .filter((item) => {
      return item.isActive === true;
    })
    .slice(indexOfFirstEvent, indexOfLastEvent);

  const disabledPagination = (value) => {
    setTogglePagination(value);
  };
  const [filterText, setFilterText] = useState("");
  const filteredItems = userEvents.filter(
    (item) =>
      item.isActive === true &&
      (item.eventTitle.toLocaleLowerCase().includes(filterText) ||
        item.eventDesc.toLocaleLowerCase().includes(filterText))
  );
  const itemsToDisplay = filterText ? filteredItems : currentEvents;

  //pagination after search
  const itemsToDisplay2 =
    filterText && itemsToDisplay !== currentEvents ? filteredItems : [];

  const [currentPageAS, setCurrentPageAS] = useState(1);
  const [eventsPerPageAS, setEventsPerPageAS] = useState(9);
  const indexOfLastEventAS = currentPageAS * eventsPerPageAS;
  const indexOfFirstEventAS = indexOfLastEventAS - eventsPerPageAS;
  const currentEventsAS = itemsToDisplay2
    .filter((item) => {
      return item.isActive === true;
    })
    .slice(indexOfFirstEventAS, indexOfLastEventAS);
  //
  const paginate = (number) => {
    if (filterText.length > 0 && currentEventsAS.length > 0) {
      setCurrentPageAS(number);
    } else {
      setCurrentPage(number);
    }
  };

  return (
    <Fragment>
      <Header />
      <Banner />
      <Container>
        <h1 className="home-body-title-allevent">TẤT CẢ SỰ KIỆN</h1>
        <br />
        <br />
        <Input
          placeholder="Tìm kiếm sự kiện"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
          suffix={
            <Tooltip title="Xoá tìm kiếm">
              <CloseOutlined
                style={{ color: "rgba(0,0,0,.45)" }}
                onClick={(e) => setFilterText("")}
              />
            </Tooltip>
          }
        />
      </Container>
      {userEvents.length > 0 ? (
        <ViewAllEvents
          events={currentEvents}
          disabledPagination={disabledPagination}
          itemsToDisplay={itemsToDisplay}
          filterText={filterText}
          currentEventsAS={currentEventsAS}
        />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      )}

      <div className="index-event">
        {togglePagination ? (
          <Pagination
            currentPage={
              filterText.length > 0 && currentEventsAS.length > 0
                ? currentPageAS
                : currentPage
            }
            itemsPerPage={9}
            totalitems={
              filterText.length > 0 && currentEventsAS.length > 0
                ? itemsToDisplay2.length
                : userEvents.filter((item) => {
                    return item.isActive === true;
                  }).length
            }
            paginate={paginate}
          />
        ) : (
          ""
        )}
      </div>

      <Footer />
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllEvent: () => {
      dispatch(actGetAllEventRequest());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    userEvents: state.userEvents,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
