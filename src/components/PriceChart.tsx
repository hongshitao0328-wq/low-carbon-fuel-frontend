import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Oct 22', vlsfo: 665, methanol: 890, ammonia: 1080, credit: 85 },
  { date: 'Oct 25', vlsfo: 670, methanol: 885, ammonia: 1090, credit: 86 },
  { date: 'Oct 28', vlsfo: 668, methanol: 880, ammonia: 1085, credit: 87 },
  { date: 'Nov 1', vlsfo: 675, methanol: 895, ammonia: 1095, credit: 88 },
  { date: 'Nov 4', vlsfo: 672, methanol: 888, ammonia: 1100, credit: 87 },
  { date: 'Nov 7', vlsfo: 678, methanol: 892, ammonia: 1105, credit: 88 },
  { date: 'Nov 10', vlsfo: 680, methanol: 885, ammonia: 1110, credit: 89 },
  { date: 'Nov 13', vlsfo: 682, methanol: 878, ammonia: 1115, credit: 90 },
  { date: 'Nov 16', vlsfo: 685, methanol: 875, ammonia: 1120, credit: 89 },
  { date: 'Nov 21', vlsfo: 682.5, methanol: 876.2, ammonia: 1124.8, credit: 89.3 },
];

export function PriceChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
          label={{ value: 'Price ($/MT)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="line"
        />
        <Line 
          type="monotone" 
          dataKey="vlsfo" 
          stroke="#1E40AF" 
          strokeWidth={3}
          name="VLSFO"
          dot={{ fill: '#1E40AF', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="methanol" 
          stroke="#059669" 
          strokeWidth={3}
          name="Methanol"
          dot={{ fill: '#059669', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="ammonia" 
          stroke="#0d9488" 
          strokeWidth={3}
          name="Ammonia"
          dot={{ fill: '#0d9488', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="credit" 
          stroke="#4f46e5" 
          strokeWidth={3}
          name="Carbon Credit"
          dot={{ fill: '#4f46e5', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
