import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SleepTrendSparkline = ({ data, dataKey, strokeColor = "#8884d8" }) => {
  if (!data || data.length === 0) {
    return <p className="text-xs text-gray-400 italic">Not enough data for trend.</p>;
  }

  // Ensure data has a 'name' for XAxis and the specified dataKey for YAxis
  const chartData = data.map((item, index) => ({
    name: item.name || `Day ${index + 1}`, // Fallback name if not provided
    [dataKey]: item[dataKey]
  }));

  return (
    <div style={{ width: '100%', height: 60 }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: -35, bottom: 0 }}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: '#9ca3af' }} />
          <YAxis hide={true} domain={[
            dataMin => (Math.floor(dataMin) -1),
            dataMax => (Math.ceil(dataMax) + 1)
            ]} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px', fontSize: '10px', padding: '2px 5px' }} 
            itemStyle={{ color: strokeColor }}
            formatter={(value) => [`${value}`, null]}
          />
          <Line type="monotone" dataKey={dataKey} stroke={strokeColor} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SleepTrendSparkline;

