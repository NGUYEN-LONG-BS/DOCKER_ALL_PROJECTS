'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { chartData } from './data';
import { ChartData } from './types';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Chart01 = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: chartData.map((item) => item.label),
            datasets: [
              {
                label: 'Value',
                data: chartData.map((item) => item.value),
                backgroundColor: [
                  '#003087',
                  '#0056b3',
                  '#007bff',
                  '#339af0',
                  '#66b0ff',
                  '#99c4ff',
                  '#ced4da',
                  '#003087',
                ],
                borderColor: '#fff',
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: 'y',
            scales: {
              x: {
                beginAtZero: true,
                ticks: { color: '#000' },
              },
              y: {
                ticks: { color: '#000' },
              },
            },
            plugins: {
              legend: { display: false },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-container">
      <div className="row">
        <div className="col-12">
          <canvas ref={chartRef} />
        </div>
      </div>
      <div className="chart-legend">
        {chartData.map((item: ChartData, index: number) => (
          <div key={index} className="legend-item">
            <i className={`fas ${item.icon}`} style={{ color: index === 6 ? '#ced4da' : '#003087' }} />
            {item.label} ({item.value})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart01;