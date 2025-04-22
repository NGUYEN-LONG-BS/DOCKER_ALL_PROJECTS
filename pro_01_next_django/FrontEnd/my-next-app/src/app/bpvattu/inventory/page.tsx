'use client';
import { useState } from 'react';
import { Tab, Nav, Row, Col, Container } from 'react-bootstrap';
import Navbar from '@/components/Navbar';
import Table_Test from '@/components/table_test';
import Table_test_02category from '@/components/table_test_02category';
import Table_login_info from '@/components/table_login_info';
import Table_inventory_category from '@/components/table_inventory_category';
import Inventory_category_post from '@/components/inventory_category_post';

// Define the type for tab keys
type TabKey = 'tab1' | 'tab2' | 'tab3' | 'tab4' | 'tab5' | 'tab6';

const HomePage = () => {
  const [key, setKey] = useState<TabKey>('tab1');

  return (
    <div>
      {/* Navbar */}
      <Navbar />
    
      <Container className="mt-5">
        <h1 className="text-center mb-4">QUẢN LÝ HÀNG HOÁ</h1>

        <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k: string | null) => setKey(k as TabKey || 'tab1')}>
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
                {/* Phiếu nhập kho */}
                <Tab.Pane eventKey="tab1">
                  <h3>Phiếu nhập kho</h3>
                  
                </Tab.Pane>

                {/* Phiếu xuất kho */}
                <Tab.Pane eventKey="tab2">
                  <h3>Phiếu xuất kho</h3>
                  
                </Tab.Pane>

                {/* Tạo mới mã hàng */}
                <Tab.Pane eventKey="tab3">
                  <h3>Tạo mới mã hàng</h3>
                  <Inventory_category_post/>
                  <Table_inventory_category />
                </Tab.Pane>

                {/* Nhật ký nhập kho */}
                <Tab.Pane eventKey="tab4">
                  <h3>Nhật ký nhập kho</h3>
                  <Table_test_02category/>
                </Tab.Pane>

                {/* Nhật ký xuất kho */}
                <Tab.Pane eventKey="tab5">
                  <h3>Nhật ký xuất kho</h3>
                  <Table_login_info/>
                </Tab.Pane>

                {/* Báo cáo tồn kho */}
                <Tab.Pane eventKey="tab6">
                  <h3>Báo cáo tồn kho</h3>
                  <Table_Test/>
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
