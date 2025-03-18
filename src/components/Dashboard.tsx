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
import CustomChart from "@/components/ui/custom-chart";

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
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell size={18} />
        </Button>
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
          <CustomChart type="area" color="#0052FE" />
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
