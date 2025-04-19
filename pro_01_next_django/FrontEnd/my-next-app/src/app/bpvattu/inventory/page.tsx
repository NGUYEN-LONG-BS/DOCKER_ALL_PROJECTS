'use client';

import { useState } from 'react';
import { Tab, Nav, Row, Col, Container } from 'react-bootstrap'; // Import các component từ Bootstrap
import Navbar from '@/components/Navbar'; // Import Navbar từ components

const HomePage = () => {
  const [key, setKey] = useState<string>('tab1'); // State để theo dõi tab hiện tại

  return (
    <div>
      {/* Navbar */}
      <Navbar />
    
      <Container className="mt-5">
        <h1 className="text-center mb-4">QUẢN LÝ HÀNG HOÁ</h1>

        <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k: string) => setKey(k)}>
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
                  <h3>Phiếu nhập kho</h3>
                  <p>Nhập kho sản phẩm vào hệ thống quản lý kho.</p>
                </Tab.Pane>
                <Tab.Pane eventKey="tab2">
                  <h3>Phiếu xuất kho</h3>
                  <p>Xuất kho sản phẩm khỏi hệ thống quản lý kho.</p>
                </Tab.Pane>
                <Tab.Pane eventKey="tab3">
                  <h3>Tạo mới mã hàng</h3>
                  <p>Tạo và thêm mã hàng mới vào hệ thống.</p>
                </Tab.Pane>
                <Tab.Pane eventKey="tab4">
                  <h3>Nhật ký nhập kho</h3>
                  <p>Danh sách các phiếu nhập kho đã được ghi nhận trong hệ thống.</p>
                </Tab.Pane>
                <Tab.Pane eventKey="tab5">
                  <h3>Nhật ký xuất kho</h3>
                  <p>Danh sách các phiếu xuất kho đã được ghi nhận trong hệ thống.</p>
                </Tab.Pane>
                <Tab.Pane eventKey="tab6">
                  <h3>Báo cáo tồn kho</h3>
                  <p>Thông tin về tình trạng tồn kho hiện tại trong hệ thống.</p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default HomePage;
