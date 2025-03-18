
import React from "react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 3000 },
  { name: "Oct", value: 5000 },
  { name: "Nov", value: 2780 },
  { name: "Dec", value: 3890 },
];

interface CustomChartProps {
  type?: "line" | "area" | "bar" | "candlestick";
  color?: string;
}

const CustomChart = ({ type = "line", color = "#0052FE" }: CustomChartProps) => {
  if (type === "candlestick") {
    // For candlestick, we'll simulate with a bar chart for now
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            hide 
            domain={['dataMin - 500', 'dataMax + 500']} 
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "0.5rem",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide domain={['dataMin - 500', 'dataMax + 500']} />
          <CartesianGrid strokeDasharray="3 3" className="chart-grid" vertical={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "0.5rem",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "0.5rem",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Default line chart
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }} 
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "0.5rem",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2}
          dot={false} 
          activeDot={{ r: 6 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomChart;
