import React, { useState, useEffect } from "react";
import "./AdminClub.css";

import { Layout, Menu, Breadcrumb, Dropdown } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { decode } from "jsonwebtoken";
import swal from "sweetalert";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import CreateEvent from "./event/createEvent";
import ViewAllEvent from "./event/viewAllEvent";
import { useDispatch, useSelector } from "react-redux";
import { getClubById } from "../../Redux/actions/user-clubs.action";
import UpdateEvent from "./event/updateEvent";
import { ViewAllStudent } from "./student/ViewAllStudent";
import { ConfirmStudent } from "./student/ConfirmStudent";
import { RiCalendarEventLine } from "react-icons/ri";
import CreateSchedule from "./schedule/CreateSchedule";
import { ViewSchedule } from "./schedule/ViewSchedule";
import { AiOutlineSchedule } from "react-icons/ai";
import { DashboardInfo } from "./dashboard/Dashboard";
import Col from "react-bootstrap/Col";
import { Avatar } from "antd";
import { GoDashboard } from "react-icons/go";

import { logOut } from "../../Redux/actions/student.action";
import UpdateSchedule from "./schedule/UpdateSchedule";
import { DashboardTotal } from "./dashboardTotal/DashboardTotal";
import { FeedBack } from "./Feedback/FeedBack";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminClub = (props) => {
  const Authorization = localStorage.getItem("Authorization");
  const decoded = decode(Authorization);
  const [clubsOfAdmin, setClubsOfAdmin] = useState("");
  const dispatch = useDispatch();
  const dataInfo = useSelector((state) => state.getClubsById.ClubById);

  useEffect(() => {
    dispatch(getClubById(decoded.payload.clubId));
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`/user/${decoded.payload.id}`}>
          <UserOutlined />
          Thông tin cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/" onClick={() => dispatch(logOut())}>
          <LoginOutlined />
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }} className="club_admin">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme="light"
      >
        <Link to="/">
          {" "}
          <img
            src="data:image/png;base64,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"
            alt="logo"
            className="logo_admin"
          />
        </Link>
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link
              to="/adminClub"
              onClick={() => dispatch(getClubById(decoded.payload.clubId))}
            >
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="/adminClub/info">Thông tin câu lạc bộ</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<CalendarOutlined className="icon_dashboard" />}
            title="Sự kiện"
          >
            <Menu.Item key="3">
              <Link to="/adminClub/create-event">Tạo sự kiện</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link
                to="/adminClub/view-all-event"
                onClick={() => dispatch(getClubById(decoded.payload.clubId))}
              >
                Danh sách sự kiện
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<UserOutlined className="icon_dashboard" />}
            title="Thành viên"
          >
            <Menu.Item key="5">
              <Link
                to="/adminClub/view-student"
                onClick={() => dispatch(getClubById(decoded.payload.clubId))}
              >
                Danh sách thành viên
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link
                to="/adminClub/confirm-student"
                onClick={() => dispatch(getClubById(decoded.payload.clubId))}
              >
                Xác nhận thành viên
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            icon={<ScheduleOutlined className="icon_dashboard" />}
            title="Lịch trình"
          >
            <Menu.Item key="7">
              <Link
                to="/adminClub/view-schedule"
                onClick={() => dispatch(getClubById(decoded.payload.clubId))}
              >
                Danh sách lịch trình
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/adminClub/create-schedule">Tạo lịch trình</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<PieChartOutlined />}>
            <Link to="/adminClub/feedback">Xem feeback</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header>
          <Col lg={{ span: 2, offset: 10 }}>
            <Dropdown overlay={menu} placement="bottomCenter">
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  icon={<UserOutlined />}
                ></Avatar>
                <span className="name_admin">Admin Club</span>
              </a>
            </Dropdown>
          </Col>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {/* Router */}
            <Route path="/adminClub/create-event" component={CreateEvent} />
            <Route path="/adminClub/feedback" component={FeedBack} />
            <Route path="/adminClub/view-all-event" component={ViewAllEvent} />
            <Route path="/adminClub/update-event/:id" component={UpdateEvent} />
            <Route path="/adminClub/view-student" component={ViewAllStudent} />
            <Route
              path="/adminClub/confirm-student"
              component={ConfirmStudent}
            />
            <Route
              path="/adminClub/create-schedule"
              component={CreateSchedule}
            />
            <Route path="/adminClub/view-schedule" component={ViewSchedule} />
            <Route
              path="/adminClub/update-schedule/:id"
              component={UpdateSchedule}
            />
            <Route path="/adminClub/info" component={DashboardInfo} />
            <Route path="/adminClub" component={DashboardTotal} exact />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminClub;
