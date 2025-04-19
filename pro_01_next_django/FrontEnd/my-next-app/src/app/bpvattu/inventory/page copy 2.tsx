'use client';

import { useState } from 'react';
import { Tab, Nav, Row, Col, Container } from 'react-bootstrap'; // Import các component từ Bootstrap

const HomePage = () => {
  const [key, setKey] = useState('tab1'); // State để theo dõi tab hiện tại

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">QUẢN LÝ TỒN KHO</h1>

      <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k) => setKey(k)}>
        <Row>
          <Col sm={12}>
            {/* Dùng Nav với variant="pills" để hiển thị các tab ngang */}
            <Nav variant="pills" className="justify-content-center">
              <Nav.Item>
                <Nav.Link eventKey="tab1">Phiếu nhập kho</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab2">Phiếu xuất kho</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab3">Tạo mới mã hàng</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab4">Nhật ký nhập kho</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab5">Nhật ký xuất kho</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab6">Báo cáo tồn kho</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="tab1">
                <h3>Tab 1 Content</h3>
                <p>This is the content for the first tab.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab2">
                <h3>Tab 2 Content</h3>
                <p>This is the content for the second tab.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab3">
                <h3>Tab 3 Content</h3>
                <p>This is the content for the third tab.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab4">
                <h3>Tab 4 Content</h3>
                <p>This is the content for the fourth tab.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab5">
                <h3>Tab 5 Content</h3>
                <p>This is the content for the fifth tab.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="tab6">
                <h3>Tab 6 Content</h3>
                <p>This is the content for the sixth tab.</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default HomePage;
