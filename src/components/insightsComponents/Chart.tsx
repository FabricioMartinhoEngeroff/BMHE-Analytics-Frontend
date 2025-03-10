import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  [key: string]: string | number; 
}

interface ChartProps {
  data: ChartData[];
  colors?: string[];
}

export default function Chart({ data, colors = ["#8884d8", "#82ca9d", "#ff7300"] }: ChartProps) {
  const keys = Object.keys(data[0] || {}).filter((key) => key !== "name");

  return (
    <div className="chart-container">
      <h2>Insights por Período</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
