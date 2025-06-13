import React from 'react';

interface WaterfallChartProps {
  data: number[];
}

const WaterfallChart: React.FC<WaterfallChartProps> = ({ data }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '300px', borderLeft: '2px solid black' }}>
      {data.map((value, index) => (
        <div
          key={index}
          style={{
            width: '30px',
            height: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
            backgroundColor: value >= 0 ? 'green' : 'red',
            marginLeft: '5px',
            marginBottom: '2px',
          }}
        />
      ))}
    </div>
  );
};

export default WaterfallChart;
