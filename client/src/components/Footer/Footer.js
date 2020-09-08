import React from "react";
import "./footer.css";
import { Container, Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col className ="col-12 col-sm-5 col-lg-6 col-xl-6">
              <div className="img-respon">
                <img src="/images/logo2.png" alt="logo" className="img" />
                <img src="/images/preloader.png" alt="logo2" className="img2" />
              </div>
            </Col>

            <Col className ="col-12 col-sm-7 col-lg-6 col-xl-6">
              <div className="content">
                <p>
                  <strong>Trường Đại Học Văn Lang</strong>
                </p>
                <p>
                  <strong>Trụ sở:</strong> 45 Nguyễn Khắc Nhu, P. Cô Giang, Q.1,
                  Tp. HCM
                </p>
                <p>
                  <strong>Cơ sở 2:</strong> 233A Phan Văn Trị , P.11, Q. Bình
                  Thạnh, Tp. HCM
                </p>
                <p>
                  <strong>Cơ sở 3:</strong> 80/68 Dương Quảng Hàm, P.5, Q. Gò Vấp,
                  Tp. HCM
                </p>
                <p>
                  <strong>Điện thoại: </strong>028.71099221- EXT: 3320</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }} className="copyright">
              © 2020 - Bản Quyền Thuộc Trường Đại học Văn Lang
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
