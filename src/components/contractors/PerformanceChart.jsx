import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'RoadTech', success: 94, rejected: 6 },
  { name: 'Prime Paving', success: 85, rejected: 15 },
  { name: 'Metro Infra', success: 98, rejected: 2 },
];

const PerformanceChart = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-[300px] w-full">
      <h3 className="text-xl font-semibold text-white mb-4">Contractor Verification Success Rate</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
          <YAxis stroke="rgba(255,255,255,0.7)" />
          <Tooltip 
             contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
             itemStyle={{ color: '#fff' }}
          />
          <Legend />
          <Bar dataKey="success" stackId="a" fill="#10B981" name="Approved" />
          <Bar dataKey="rejected" stackId="a" fill="#EF4444" name="Rejected" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
