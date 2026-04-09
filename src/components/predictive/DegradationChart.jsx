import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MOCK_MONTHLY_DEGRADATION } from '../../data/mockData';

const DegradationChart = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Structural Degradation Forecast</h3>
          <p className="text-sm text-gray-400">Predicted road health score decline over the next 6 months</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={MOCK_MONTHLY_DEGRADATION}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorHiTech" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOuterRing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" axisLine={false} tickLine={false} />
          <YAxis stroke="rgba(255,255,255,0.4)" axisLine={false} tickLine={false} />
          <Tooltip 
             contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
             itemStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Area 
            type="monotone" 
            dataKey="Hi-Tech City" 
            stroke="#EF4444" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorHiTech)" 
            name="Hi-Tech City Main (Critical)"
          />
          <Area 
            type="monotone" 
            dataKey="Outer Ring" 
            stroke="#10B981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorOuterRing)" 
            name="NH-65 Outer Ring (Healthy)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DegradationChart;
