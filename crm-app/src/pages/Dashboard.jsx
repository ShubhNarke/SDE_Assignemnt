import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{ label: 'Sales', data: [10, 20, 30, 25, 15], backgroundColor: 'blue' }],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Bar data={data} />
    </div>
  );
};

export default Dashboard;