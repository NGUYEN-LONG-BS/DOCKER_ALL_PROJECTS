"use client";
import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

// Styled components for styling
const Container = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  color: #333;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #4caf50;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const ChartContainer = styled.div`
  max-width: 700px;
  margin: 20px auto;
`;

const Source = styled.p`
  font-style: italic;
  color: #555;
`;

const CMSMarketShare: React.FC = () => {
  // Chart data
  const chartData = {
    labels: [
      'WordPress',
      'Shopify',
      'Wix',
      'Squarespace',
      'Joomla',
      'Drupal',
      'BigCommerce',
      'Weebly',
      'Code tay/Không sử dụng CMS',
    ],
    datasets: [
      {
        data: [61.95, 6.7, 5.0, 3.25, 2.25, 1.2, 1.0, 0.7, 30.95],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
          '#7BC225',
          '#E7E9ED',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  // Chart options for clarity and responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Thị phần CMS và website code tay năm 2025',
      },
      datalabels: {
        formatter: (value: number) => `${value}%`,
        color: '#fff',
        font: {
          weight: 'bold' as const,
        },
        anchor: 'center' as const,
        align: 'center' as const,
      },
    },
    devicePixelRatio: 2, // Ensure high-resolution rendering for clarity
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', lineHeight: 1.6, backgroundColor: '#f4f4f4' }}>
      <Container>
        <Heading>Thị phần CMS năm 2025</Heading>
        <p>
          Dưới đây là thống kê thị phần các hệ thống quản lý nội dung (CMS) phổ biến nhất và tỷ lệ website code tay (hoặc
          không sử dụng CMS đã biết) vào năm 2025, dựa trên các website có công nghệ đã được xác định. WordPress tiếp tục
          dẫn đầu với hệ sinh thái plugin phong phú, trong khi các nền tảng như Wix và Shopify tăng trưởng mạnh mẽ, đặc
          biệt trong thương mại điện tử và doanh nghiệp nhỏ.
        </p>

        <Table>
          <thead>
            <tr>
              <th>CMS hoặc Loại</th>
              <th>Thị phần (%)</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WordPress</td>
              <td>61.95</td>
              <td>Thống trị nhờ tính dễ sử dụng, mã nguồn mở, và hệ sinh thái plugin phong phú.</td>
            </tr>
            <tr>
              <td>Shopify</td>
              <td>6.7</td>
              <td>Mạnh trong thương mại điện tử, với hơn 4.8 triệu website.</td>
            </tr>
            <tr>
              <td>Wix</td>
              <td>5.0</td>
              <td>Tăng trưởng 1,633% từ 2015-2025, thân thiện với doanh nghiệp nhỏ.</td>
            </tr>
            <tr>
              <td>Squarespace</td>
              <td>3.25</td>
              <td>Phổ biến ở Mỹ và Anh, với khoảng 4.1 triệu website.</td>
            </tr>
            <tr>
              <td>Joomla</td>
              <td>2.25</td>
              <td>Mã nguồn mở, phức tạp hơn WordPress, hơn 919,707 website.</td>
            </tr>
            <tr>
              <td>Drupal</td>
              <td>1.2</td>
              <td>Phù hợp với website lưu lượng cao, khoảng 47,203 website.</td>
            </tr>
            <tr>
              <td>BigCommerce</td>
              <td>1.0</td>
              <td>Tập trung vào thương mại điện tử, khoảng 41,776 website.</td>
            </tr>
            <tr>
              <td>Weebly</td>
              <td>0.7</td>
              <td>Thị phần nhỏ, khoảng 508,756 website, chủ yếu ở Mỹ.</td>
            </tr>
            <tr>
              <td>Code tay/Không sử dụng CMS</td>
              <td>30.95</td>
              <td>Chiếm 28.9% - 33% tổng số website, giảm từ 76% năm 2011.</td>
            </tr>
          </tbody>
        </Table>

        <h2>Biểu đồ tròn thị phần CMS và website code tay</h2>
        <ChartContainer>
          <Pie data={chartData} options={chartOptions} height={500} />
        </ChartContainer>

        <Source>
          Nguồn: W3Techs (w3techs.com), BuiltWith (builtwith.com), Themeisle, MobiLoud, Search Engine Journal (dữ liệu
          cập nhật tháng 5/2025).
        </Source>
      </Container>
    </div>
  );
};

export default CMSMarketShare;