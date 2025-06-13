'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { cumulativeData } from './data';
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
            labels: cumulativeData.map((item) => item.label),
            datasets: [
              {
                label: 'Value',
                data: cumulativeData.map((item) => item.cumulativeValue),
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
                barPercentage: 1.0, // Full width for each step
                categoryPercentage: 1.0,
              },
            ],
          },
          options: {
            indexAxis: 'x', // Vertical bars
            scales: {
              x: {
                stacked: true, // Ensure stacking
                ticks: { color: '#000' },
              },
              y: {
                beginAtZero: true,
                max: 130, // Set max based on total (120 + buffer)
                ticks: { color: '#000', stepSize: 10 },
                title: { display: false },
              },
            },
            plugins: {
              legend: { display: false },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 20,
                bottom: 20,
              },
            },
            animation: {
              duration: 0, // Disable animation for instant effect
            },
            // Custom plugin to draw lines connecting steps (approximation)
          },
          plugins: [
            {
              id: 'stepLines',
              afterDraw: (chart) => {
                const ctx = chart.ctx;
                const xAxis = chart.scales.x;
                const yAxis = chart.scales.y;
                ctx.save();
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.beginPath();
                cumulativeData.forEach((item, index) => {
                  if (index > 0) {
                    const prevX = xAxis.getPixelForValue(index - 1);
                    const currX = xAxis.getPixelForValue(index);
                    const y = yAxis.getPixelForValue(cumulativeData[index - 1].cumulativeValue);
                    ctx.moveTo(prevX, y);
                    ctx.lineTo(currX, y);
                  }
                });
                ctx.stroke();
                ctx.restore();
              },
            },
          ],
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
        {cumulativeData.map((item: ChartData, index: number) => (
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