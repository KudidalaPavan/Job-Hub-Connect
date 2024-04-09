import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const SimplePieChart = () => {
  const data = [
    { title: 'Red', value: 300, color: '#E57373' },
    { title: 'Blue', value: 200, color: '#64B5F6' },
    { title: 'Yellow', value: 100, color: '#FFF176' },
  ];

  return (
    <div style={{ height: '300px' }}> {/* Adjust the height here */}
    <h2>Simple Pie Chart Example</h2>
    <PieChart
      data={data}
      lineWidth={15}
      totalValue={data.reduce((acc, { value }) => acc + value, 0)}
    />
  </div>
  );
};

export default SimplePieChart;
