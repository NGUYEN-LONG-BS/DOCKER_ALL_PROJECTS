import React, { useState } from 'react';

const EconomicGrowthAndCycles = () => {
  const [gdp2022, setGdp2022] = useState(500);
  const [gdp2023, setGdp2023] = useState(520);
  const [gdp2024, setGdp2024] = useState(540);
  const [growthRate2023, setGrowthRate2023] = useState<number | null>(null);
  const [growthRate2024, setGrowthRate2024] = useState<number | null>(null);
  const [averageGrowthRate, setAverageGrowthRate] = useState<number | null>(null);

  const calculateGrowthRates = () => {
    const rate2023 = ((gdp2023 - gdp2022) / gdp2022) * 100;
    const rate2024 = ((gdp2024 - gdp2023) / gdp2023) * 100;
    setGrowthRate2023(rate2023);
    setGrowthRate2024(rate2024);
    setAverageGrowthRate((rate2023 + rate2024) / 2);
  };

  return (
    <div>
      <h1>Tăng Trưởng Kinh Tế và Chu Kỳ Kinh Tế</h1>

      <h2>Bài Tập 1: Tính Tỷ Lệ Tăng Trưởng GDP</h2>
      <p>GDP thực tế các năm:</p>
      <ul>
        <li>Năm 2022: {gdp2022} tỷ USD</li>
        <li>Năm 2023: {gdp2023} tỷ USD</li>
        <li>Năm 2024: {gdp2024} tỷ USD</li>
      </ul>

      <button onClick={calculateGrowthRates}>Tính Tỷ Lệ Tăng Trưởng</button>

      {growthRate2023 !== null && growthRate2024 !== null && (
        <div>
          <h3>Kết quả tính toán:</h3>
          <p>Tỷ lệ tăng trưởng từ 2022 đến 2023: {growthRate2023.toFixed(2)}%</p>
          <p>Tỷ lệ tăng trưởng từ 2023 đến 2024: {growthRate2024.toFixed(2)}%</p>
          <p>Tỷ lệ tăng trưởng bình quân trong 3 năm: {averageGrowthRate?.toFixed(2)}%</p>
        </div>
      )}

      <h2>Bài Tập 2: Phân Tích Chu Kỳ Kinh Tế</h2>
      <p>
        Dựa vào các giai đoạn chu kỳ kinh tế sau, hãy xác định nền kinh tế của quốc gia A đang ở giai đoạn nào:
      </p>
      <ul>
        <li>Giai đoạn 1: Phục hồi</li>
        <li>Giai đoạn 2: Mở rộng</li>
        <li>Giai đoạn 3: Đỉnh điểm</li>
        <li>Giai đoạn 4: Suy thoái</li>
      </ul>

      <p>
        Chính phủ có thể tăng chi tiêu công, giảm thuế để kích thích cầu. Ngân hàng trung ương có thể giảm lãi suất để thúc đẩy đầu tư và tiêu dùng.
      </p>

      <p>Giai đoạn hiện tại của nền kinh tế có thể được xác định bằng cách phân tích các chỉ số GDP, tỷ lệ thất nghiệp, và lạm phát.
      </p>

      <h2>Bài Tập 3: Dự Báo Chu Kỳ Kinh Tế</h2>
      <p>Giả sử ngân hàng trung ương quyết định tăng lãi suất từ 2% lên 3%. Hãy phân tích tác động của quyết định này đến chu kỳ kinh tế và dự đoán giai đoạn tiếp theo.</p>

      <p>
        Lãi suất tăng có thể ảnh hưởng đến các yếu tố như đầu tư và tiêu dùng, tỷ giá và lạm phát. Việc này sẽ có tác động lớn đến chu kỳ kinh tế và có thể là dấu hiệu của một giai đoạn suy thoái hoặc đỉnh điểm.
      </p>

      <h2>Bài Tập 4: Các Giai Đoạn Chu Kỳ Kinh Tế</h2>
      <p>
        Dưới đây là dữ liệu về GDP thực tế và tỷ lệ thất nghiệp trong một quốc gia qua các năm:
      </p>
      <table>
        <thead>
          <tr>
            <th>Năm</th>
            <th>GDP thực tế ($Billion)</th>
            <th>Tỷ lệ thất nghiệp (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2020</td>
            <td>500</td>
            <td>8</td>
          </tr>
          <tr>
            <td>2021</td>
            <td>520</td>
            <td>7</td>
          </tr>
          <tr>
            <td>2022</td>
            <td>540</td>
            <td>6.5</td>
          </tr>
          <tr>
            <td>2023</td>
            <td>530</td>
            <td>7.2</td>
          </tr>
          <tr>
            <td>2024</td>
            <td>510</td>
            <td>8.5</td>
          </tr>
        </tbody>
      </table>

      <p>
        Dựa vào dữ liệu trên, hãy xác định các giai đoạn trong chu kỳ kinh tế và giải thích sự chuyển tiếp giữa các giai đoạn.
      </p>

      <h2>Bài Tập 5: Chính Sách Tiền Tệ và Tác Động</h2>
      <p>
        Ngân hàng trung ương của quốc gia X quyết định tăng lãi suất từ 2% lên 3%. Hãy phân tích tác động của quyết định này đến đầu tư, tiêu dùng, và lạm phát.
      </p>
    </div>
  );
};

export default EconomicGrowthAndCycles;
