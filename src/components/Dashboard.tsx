import React from "react";
import { ArrowUpRight, ArrowDownRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriceCard from "@/components/ui/PriceCard";
import { 
  AreaChart, 
  Area, 
  CartesianGrid,
  Tooltip, 
  XAxis,
  YAxis
} from "recharts";

const marketData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    code: "BTC",
    price: 42756.83,
    change: 1.2,
    icon: "/icons/btc.svg",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    code: "ETH",
    price: 2856.45,
    change: -0.8,
    icon: "/icons/eth.svg",
  },
  {
    id: "litecoin",
    name: "Litecoin",
    code: "LTC",
    price: 145.22,
    change: 0.5,
    icon: "/icons/ltc.svg",
  },
];

const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const Dashboard = () => {
  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-muted-foreground text-sm">Track your portfolio and trading activity</p>
        </div>
        <div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell size={18} />
          </Button>
        </div>
      </div>
      
      {/* Main Chart */}
      <div className="crypto-card">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">Portfolio Value</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">$32,857.55</span>
            <span className="text-green-500 font-medium flex items-center text-sm">
              <ArrowUpRight size={14} className="mr-0.5" />
              3.2%
            </span>
          </div>
        </div>
        
        <div className="aspect-[16/9]">
          <div className="w-full h-full">
            <AreaChart
              width={800}
              height={300}
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052FE" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0052FE" stopOpacity={0} />
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
                  background: "rgba(17, 24, 39, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  padding: "8px"
                }}
                itemStyle={{ color: "#fff" }}
                formatter={(value: number) => [`$${value}`, "Value"]}
                labelFormatter={(label) => `${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0052FE" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorGradient)" 
              />
            </AreaChart>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" className="text-xs px-3">1D</Button>
          <Button variant="ghost" size="sm" className="text-xs px-3">1W</Button>
          <Button variant="ghost" size="sm" className="text-xs px-3">1M</Button>
          <Button variant="ghost" size="sm" className="text-xs px-3">1Y</Button>
          <Button variant="ghost" size="sm" className="text-xs px-3">All</Button>
        </div>
      </div>
      
      {/* Market Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Market</h2>
          <Button variant="link" className="text-primary p-0">See All</Button>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {marketData.map((item) => (
            <PriceCard
              key={item.id}
              name={item.name}
              code={item.code}
              price={item.price}
              change={item.change}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
