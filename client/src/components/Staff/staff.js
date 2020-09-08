import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  CalendarOutlined,
  LineChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventTotal from "../Staff/StaffSystem/EventManagement/eventSearch";
import StudentStaticsContainer from "./StaffSystem/StudentManagement/StudentStatics/index";
import EventStatistics from "../Staff/StaffSystem/EventManagement/EventStatisticsJsx/index";

import ClubSum from "../Staff/StaffSystem/ClubManagement/clubStatistics";
import ClubStatistics from "../Staff/StaffSystem/ClubManagement/clubIndex";
import StudentSearchContainer from "./StaffSystem/StudentManagement/StudentSearch/index";
import "./AdminSystem.css";
import { connect } from "react-redux";

import {
  actGetAllClubRequest,
  getChartClub,
} from "../../Redux/actions/user-clubs.action";
import {
  actGetAllEventRequest,
  getChartEvent,
} from "../../Redux/actions/user-events.action";
import {
  actGetAllStudentRequest,
  getChartStudent,
} from "../../Redux/actions/student.action";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// const { Search } = Input;

class staff extends Component {
  /* submenu keys of first level */
  rootSubmenuKeys = ["sub1", "sub2", "sub3"];

  componentDidMount() {
    // const { getAllClub } = this.props;
    this.props.getAllClub();
    this.props.getChartClub();
    this.props.getAllEvent();
    this.props.getChartEvent();
    this.props.getAllStudent();
    this.props.getChartStudent();
    // console.log("getAllClub", this.props.getAllClub());
  }
  /* State */
  state = {
    collapsed: false,
    openKeys: ["sub1"],
  };

  /* Expand and Collapse */
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  /* Open Change SubMenu */
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          {/* Sider and menu */}
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            theme="light"
          >
            <img src="/images/logoVLU.png" alt="logo" className="logo_admin" />
            <Menu
              theme="light"
              mode="inline"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              defaultSelectedKeys={["1"]}
            >
              {/* SubMenu */}
              {/* câu lạc bộ */}
              <SubMenu
                key="sub1"
                title="Quản lý câu lạc bộ"
                icon={<LineChartOutlined />}
              >
                <Menu.Item key="1">
                  <span>Tổng câu lạc bộ</span>
                  <Link to="/staff/ClubStatistics" />
                </Menu.Item>
                <Menu.Item key="2">
                  <span>Thống kê câu lạc bộ</span>
                  <Link to="/staff/ClubSum" />
                </Menu.Item>
              </SubMenu>
              {/* sự kiện */}
              <SubMenu
                key="sub2"
                title="Quản lý sự kiện"
                icon={<CalendarOutlined />}
              >
                <Menu.Item key="3">
                  <span>Tổng sự kiện</span>
                  <Link to="/staff/EventSum" />
                </Menu.Item>
                <Menu.Item key="4">
                  <span>Thống kê sự kiện</span>
                  <Link to="/staff/EventStatistics" />
                </Menu.Item>
              </SubMenu>
              {/* sinh viên */}
              <SubMenu
                key="sub3"
                title="Quản lý sinh viên"
                icon={<UserOutlined />}
              >
                <Menu.Item key="5">
                  <span>Tổng sinh viên</span>
                  <Link to="/staff/StuTotal" />
                </Menu.Item>
                <Menu.Item key="6">
                  <span>Thống kê sinh viên</span>
                  <Link to="/staff/StudentStatistics" />
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          {/* Content */}
          <Layout className="site-layout">
            {/* Header-Content */}
            <Header className="site-layout-background" style={{ padding: 0 }} />
            {/* Body-Content */}
            <Content style={{ margin: "0 16px" }}>
              {/* Breadcrumb-Content */}
              <Breadcrumb style={{ margin: "16px 0" }}>
                {/* Breadcrumb Câu lạc bộ */}
                {/* <Route path='/staff/ClubStatistics'>
									<Breadcrumb.Item>
										<span>TỔNG CÂU LẠC BỘ</span>
									</Breadcrumb.Item>
								</Route> */}
                {/* <Route path='/staff/ClubSum'>
									<Breadcrumb.Item>
										<span>THÔNG KÊ CÂU LẠC BỘ</span>
									</Breadcrumb.Item>
								</Route> */}
                {/* Breadcrumb sự kiện */}
                {/* <Route path='/staff/EventStatistics'>
									<Breadcrumb.Item>
										<span>THỐNG KÊ SỰ KIỆN</span>
									</Breadcrumb.Item>
								</Route> */}
                {/* <Route path='/staff/EventSum'>
									<Breadcrumb.Item>
										<span>TỔNG SỰ KIỆN</span>
									</Breadcrumb.Item>
								</Route> */}
                {/* Breadcrumb sinh viên */}
                {/* <Route path='/staff/StudentStatistics'>
									<Breadcrumb.Item>
										<span>THỐNG KÊ SINH VIÊN</span>
									</Breadcrumb.Item>
								</Route> */}
                {/* <Route path='/staff/StuTotal'>
									<Breadcrumb.Item>
										<span>TỔNG SINH VIÊN</span>
									</Breadcrumb.Item>
								</Route> */}
              </Breadcrumb>
              {/* Div-Content kết hợp router khi nhấn menuitem */}
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 530 }}
              >
                {/* quản lý câu lạc bộ */}
                <Route exact path="/staff/" component={ClubStatistics} />
                <Route
                  path="/staff/ClubStatistics"
                  component={ClubStatistics}
                />
                <Route path="/staff/ClubSum" component={ClubSum} />
                {/* quản lý sự kiện */}
                <Route
                  path="/staff/EventStatistics"
                  component={EventStatistics}
                  // component={EventStatistics}
                />
                <Route path="/staff/EventSum" component={EventTotal} />

                {/* quản lý sinh viên */}
                <Route
                  path="/staff/StudentStatistics"
                  component={StudentStaticsContainer}
                />
                {/* /staff/StuTotal */}
                <Route
                  path="/staff/StuTotal"
                  component={StudentSearchContainer}
                />
              </div>
            </Content>
            {/* Footer-Content */}
            <Footer />
          </Layout>
        </Layout>
      </Router>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getAllClub: () => dispatch(actGetAllClubRequest()),
  getChartClub: () => dispatch(getChartClub()),
  getAllEvent: () => dispatch(actGetAllEventRequest()),
  getChartEvent: () => dispatch(getChartEvent()),
  getAllStudent: () => dispatch(actGetAllStudentRequest()),
  getChartStudent: () => dispatch(getChartStudent()),
});

export default connect(null, mapDispatchToProps)(staff);
