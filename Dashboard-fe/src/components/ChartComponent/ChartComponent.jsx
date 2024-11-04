// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarChartComponent = () => {
//   const data = {
//     labels: ['January', 'February', 'March'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [30, 45, 60],
//         backgroundColor: 'rgba(100, 165, 230, 0.565)',
//         borderColor: 'rgba(145, 191, 229, 0.467)',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Monthly Sales Data',
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// export default BarChartComponent;


import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getCategoryProductCount } from '../../services/CategoryService';

const CategoryProductChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryProductCount();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Product Count by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="productCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryProductChart;

