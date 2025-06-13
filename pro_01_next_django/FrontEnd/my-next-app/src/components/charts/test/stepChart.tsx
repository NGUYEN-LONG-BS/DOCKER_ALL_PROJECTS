import React from 'react';

interface StepChartProps {
  data: number[];
}

const StepChart: React.FC<StepChartProps> = ({ data }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '300px', borderLeft: '2px solid black' }}>
      {data.map((value, index) => (
        <div key={index} style={{ width: '20px', height: `${((value - minValue) / (maxValue - minValue)) * 100}%`, backgroundColor: 'blue' }} />
      ))}
    </div>
  );
};

export default StepChart;
