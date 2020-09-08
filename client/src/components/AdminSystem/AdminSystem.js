import ClubStatistics from "./AdminManagement/ClubManagement/clubStatistics";
import ClubSearch from "../AdminSystem/AdminManagement/ClubManagement/clubSearch";
import AddClub from "../AdminSystem/AdminManagement/ClubManagement/addClub";
import EventStatistics from "../AdminSystem/AdminManagement/EventManagement/EventStatisticsJsx/index";
import EventSearch from "../AdminSystem/AdminManagement/EventManagement/eventSearch";
import StudentSearchContainer from "../../components/AdminSystem/AdminManagement/StudentManagement/StudentSearch/index";
import StudentStaticsContainer from "../../components/AdminSystem/AdminManagement/StudentManagement/StudentStatics/index";
import "./AdminSystem.css";
import {
  actGetAllClubRequest,
  getChartClub,
} from "../../Redux/actions/user-clubs.action";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  AreaChartOutlined,
  FileImageOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UpdateclubContainer from "./AdminManagement/ClubManagement/Updateclub";
import UserDecent from "./AdminManagement/StudentManagement/StudentDecent/index";
import UpdateClubStructureContainer from "./AdminManagement/ClubManagement/Updateclub/UpdateClubWithStructureImage/index";
import WebBannerManage from "./AdminManagement/WebBannerManage/index";
import StaffRegister from "./AdminManagement/StaffRegister/index";
import BannerAction from "./AdminManagement/WebBannerManage/BannerAction/index";

const { Header, Content, Footer, Sider } = Layout;
function AdminSystem(props) {
  const { getAllClub, getChartClub } = props;

  return (
    <Router>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            width: 500,
            position: "fixed",
            left: 0,
            backgroundColor: "white",
          }}
        >
          <a href="">
            {" "}
            <img
              src="/images/logo.png"
              alt="logo"
              className="logo_admin"
            />{" "}
          </a>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            {/* Quản lý câu lạc bộ */}
            <SubMenu
              key="sub1"
              icon={<BarChartOutlined />}
              title="Quản lý câu lạc bộ"
            >
              <Menu.Item key="1">
                <span>Thống kê câu lạc bộ</span>
                <Link to="/adminsystem/ClubStatistics" />
              </Menu.Item>
              <Menu.Item key="2">
                <span>Tìm kiếm câu lạc bộ</span>
                <Link to="/adminsystem/ClubSearch" />
              </Menu.Item>
              <Menu.Item key="3">
                <span>Thêm câu lạc bộ</span>
                <Link to="/adminsystem/addClub" />
              </Menu.Item>
            </SubMenu>
            {/* Quản lý sự kiện */}
            <SubMenu
              key="sub2"
              icon={<AreaChartOutlined />}
              title="Quản lý sự kiện"
            >
              <Menu.Item key="4">
                <span>Thống kê sự kiện</span>
                <Link to="/adminsystem/EventStatistics" />
              </Menu.Item>
              <Menu.Item key="5">
                <span>Tìm kiếm sự kiện</span>
                <Link to="/adminsystem/EventSearch" />
              </Menu.Item>
            </SubMenu>
            {/* Quản lý sinh viên */}
            <SubMenu
              key="sub3"
              icon={<UserOutlined />}
              title="Quản lý sinh viên"
            >
              <Menu.Item key="6">
                <span>Thống kê sinh viên</span>
                <Link to="/adminsystem/StudentStatistics" />
              </Menu.Item>
              <Menu.Item key="7">
                <span>Tìm kiếm sinh viên</span>
                <Link to="/adminsystem/StudentSearch" />
              </Menu.Item>
            </SubMenu>
            {/* Quản lý web Banner */}
            <SubMenu key="sub4" icon={<FileImageOutlined />} title="Web Banner">
              <Menu.Item key="8">
                <span>Hình ảnh của banner</span>
                <Link to="/adminsystem/BannerManage" />
              </Menu.Item>
            </SubMenu>
            {/* tạo staff */}
            <Menu.Item key="9" icon={<UserAddOutlined />}>
              <span>Tạo tài khoản staff</span>
              <Link to="/adminsystem/CreateStaff" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center", minHeight: "630px" }}
            >
              <Route exact path="/adminsystem/" component={ClubStatistics} />
              <Route
                path="/adminsystem/ClubStatistics"
                component={ClubStatistics}
              />
              <Route path="/adminsystem/ClubSearch" component={ClubSearch} />
              <Route path="/adminsystem/addClub" component={AddClub} />
              {/* quản lý sự kiện */}
              <Route
                path="/adminsystem/EventStatistics"
                component={EventStatistics}
              />
              <Route path="/adminsystem/EventSearch" component={EventSearch} />
              {/* quản lý sinh viên */}
              <Route
                path="/adminsystem/StudentStatistics"
                component={StudentStaticsContainer}
              />
              <Route
                path="/adminsystem/StudentSearch"
                component={StudentSearchContainer}
              />
              {/* update Club info */}
              <Route
                path="/adminsystem/editClub/:id"
                component={UpdateclubContainer}
              />
              {/* student Cap quyen */}
              <Route
                path="/adminsystem/set-permission/user/:id"
                component={UserDecent}
              />
              {/* update structure club */}
              <Route
                path="/adminsystem/updateStructureImage/Club/:id"
                component={UpdateClubStructureContainer}
              />
              {/* Banner Manage */}
              <Route
                path="/adminsystem/BannerManage"
                component={WebBannerManage}
              />
              {/* tạo staff */}
              <Route
                path="/adminsystem/CreateStaff"
                component={StaffRegister}
              />
              {/* tao banner */}
              <Route
                path="/adminsystem/CreateBanner"
                component={BannerAction}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  userClubs: state.userClubs,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClub: () => dispatch(actGetAllClubRequest()),
  getChartClub: () => dispatch(getChartClub()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSystem);
