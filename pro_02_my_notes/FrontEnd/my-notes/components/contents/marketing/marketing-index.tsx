"use client"; // Đánh dấu là Client Component

import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Đăng ký các thành phần và plugin của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

// Styled components cho giao diện
const Container = styled.div`
  width: 100%; /* Tràn đầy chiều rộng của component cha */
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

const SubHeading = styled.h2`
  color: #333;
  margin-top: 20px;
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
  max-width: 700px; /* Giới hạn chiều rộng biểu đồ cho dễ đọc */
  margin: 20px auto;

  @media (max-width: 768px) {
    max-width: 100%; /* Tràn đầy trên màn hình nhỏ */
  }
`;

const Source = styled.p`
  font-style: italic;
  color: #555;
`;

const MarketingMetrics: React.FC = () => {
  // Dữ liệu chỉ số marketing
  const metricsData = [
    {
      metric: 'Lợi tức đầu tư (ROI)',
      formula: 'ROI = (Lợi nhuận ròng / Chi phí marketing) x 100%',
      example: 'Chiến dịch 100 triệu đồng, lợi nhuận ròng 150 triệu đồng → ROI = (150 - 100) / 100 = 50%',
      note: 'Đánh giá hiệu quả đầu tư, ROI càng cao càng hiệu quả.',
    },
    {
      metric: 'Tỷ lệ chuyển đổi (CR)',
      formula: 'CR = Số lượng hành động chuyển đổi / Tổng số truy cập',
      example: '200 đơn hàng / 1000 lượt truy cập → CR = 20%',
      note: 'Đo lường tỷ lệ người dùng thực hiện hành động mong muốn (mua hàng, đăng ký, v.v.).',
    },
    {
      metric: 'Chi phí cho mỗi khách hàng tiềm năng (CPL)',
      formula: 'CPL = Tổng chi phí chiến dịch / Tổng số khách hàng tiềm năng',
      example: '50 triệu đồng / 500 khách hàng tiềm năng → CPL = 100 nghìn đồng/khách',
      note: 'Chi phí trung bình để thu hút một khách hàng tiềm năng.',
    },
    {
      metric: 'Chi phí cho mỗi hành động (CPA)',
      formula: 'CPA = Tổng chi phí chiến dịch / Tổng số hành động cụ thể',
      example: '100 triệu đồng / 10.000 truy cập → CPA = 10.000 đồng/truy cập',
      note: 'Chi phí trung bình cho một hành động cụ thể (mua hàng, đăng ký, v.v.).',
    },
    {
      metric: 'Lợi nhuận trên chi phí quảng cáo (ROAS)',
      formula: 'ROAS = Tổng doanh thu / Tổng chi phí marketing',
      example: '1 tỷ đồng doanh thu / 100 triệu đồng chi phí → ROAS = 0.1',
      note: 'Đo lường doanh thu từ mỗi đồng chi cho quảng cáo.',
    },
    {
      metric: 'Chi phí cho mỗi đơn hàng (CPW)',
      formula: 'CPW = Tổng chi phí marketing / Tổng số đơn hàng',
      example: '100 triệu đồng / 10.000 đơn hàng → CPW = 10.000 đồng/đơn hàng',
      note: 'Chi phí trung bình để có được một đơn hàng.',
    },
    {
      metric: 'Tỷ lệ nhấp chuột (CTR)',
      formula: 'CTR = Tổng số lượt nhấp / Tổng số lượt hiển thị',
      example: '10.000 nhấp / 100.000 hiển thị → CTR = 0.1 (10%)',
      note: 'Tổng số lượt nhấp vào quảng cáo so với lượt hiển thị.',
    },
    {
      metric: 'Chi phí trung bình cho mỗi lượt nhấp (CPC)',
      formula: 'CPC = Tổng chi phí quảng cáo / Tổng số lần nhấp chuột',
      example: '100 triệu đồng / 10.000 nhấp chuột → CPC = 10.000 đồng/nhấp',
      note: 'Chi phí trung bình cho mỗi lần nhấp vào quảng cáo.',
    },
  ];

  // Dữ liệu biểu đồ (phân bổ giả định của các chỉ số trong chiến dịch)
  const chartData = {
    labels: ['ROI', 'CR', 'CPL', 'CPA', 'ROAS', 'CPW', 'CTR', 'CPC'],
    datasets: [
      {
        data: [20, 15, 15, 15, 15, 10, 10, 10], // Tỷ lệ giả định (%)
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
          '#7BC225',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  // Cài đặt biểu đồ để đảm bảo rõ nét và responsive
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Phân bổ tầm quan trọng của các chỉ số marketing (2025)',
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
    devicePixelRatio: 2, // Độ phân giải cao cho biểu đồ
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', lineHeight: 1.6, backgroundColor: '#f4f4f4' }}>
      <Container>
        <Heading>Các chỉ số đo lường hiệu quả marketing</Heading>
        <p>
          Đo lường hiệu quả marketing là bước cuối cùng trong bất kỳ kế hoạch marketing nào. Thông qua các chỉ số đo lường
          marketing, doanh nghiệp có thể điều chỉnh chiến lược tiếp thị của mình để tối ưu hóa chi phí và đem lại hiệu quả
          tốt nhất, hoặc rút kinh nghiệm cho các chiến dịch marketing sau đó.
        </p>

        <SubHeading>Chỉ số đo lường marketing là gì?</SubHeading>
        <p>
          Chỉ số đo lường marketing là các giá trị được sử dụng để đánh giá hiệu quả của các hoạt động marketing. Các chỉ
          số này giúp marketers hiểu được những gì họ đang đạt được, những gì họ cần cải thiện và liệu các chiến lược
          marketing của họ có đang mang lại kết quả mong muốn hay không.
        </p>

        <SubHeading>Những chỉ số quan trọng mà doanh nghiệp cần biết</SubHeading>
        <p>
          Đo lường hiệu quả hoạt động marketing không chỉ giúp doanh nghiệp chi phối lại ngân sách hợp lý. Dưới đây là
          những chỉ số đo lường marketing mà doanh nghiệp nên biết:
        </p>

        <Table>
          <thead>
            <tr>
              <th>Chỉ số</th>
              <th>Công thức</th>
              <th>Ví dụ</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {metricsData.map((item, index) => (
              <tr key={index}>
                <td>{item.metric}</td>
                <td>{item.formula}</td>
                <td>{item.example}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <SubHeading>Biểu đồ phân bổ tầm quan trọng của các chỉ số</SubHeading>
        <ChartContainer>
          <Pie data={chartData} options={chartOptions} height={500} />
        </ChartContainer>

        <p>
          Các chỉ số đo lường marketing rất quan trọng với doanh nghiệp, đặc biệt trong việc xác nhận KPI chiến lược
          marketing. Với những nội dung đã chia sẻ, hy vọng doanh nghiệp của bạn có thể nắm rõ được các chỉ số, biết cách
          tính toán và áp dụng chúng một cách hiệu quả.
        </p>

        <Source>
          Nguồn: Nội dung tổng hợp từ các tài liệu marketing và thực tiễn (dữ liệu cập nhật tháng 5/2025).
        </Source>
      </Container>
    </div>
  );
};

export default MarketingMetrics;