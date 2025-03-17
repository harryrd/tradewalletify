
import React from "react";
import { ArrowUpRight, ArrowDownRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriceCard from "@/components/ui/PriceCard";
import Chart from "@/components/ui/Chart";

const marketData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 42361.24,
    change: 2.34,
    color: "#F7931A",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2326.78,
    change: -1.12,
    color: "#627EEA",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 140.25,
    change: 5.67,
    color: "#00FFBD",
  },
  {
    id: "ripple",
    name: "Ripple",
    symbol: "XRP",
    price: 0.62,
    change: -0.75,
    color: "#23292F",
  },
];

const Dashboard = () => {
  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Good morning</h1>
          <p className="text-muted-foreground text-sm">Monday, 7 May</p>
        </div>
        <Button size="icon" variant="outline" className="rounded-full">
          <Bell size={18} />
        </Button>
      </div>

      {/* Portfolio Balance Card */}
      <div className="glass-card p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Portfolio balance</p>
          <h2 className="text-3xl font-bold">$32,456.78</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center text-crypto-green text-sm font-medium">
            <ArrowUpRight size={16} />
            <span>+3.54%</span>
          </div>
          <span className="text-sm text-muted-foreground">last 24h</span>
        </div>
        
        <div className="aspect-[16/9]">
          <Chart type="area" color="#0052FE" />
        </div>
        
        <div className="flex gap-3">
          <Button className="flex-1 rounded-xl bg-crypto-blue">Buy</Button>
          <Button className="flex-1 rounded-xl" variant="outline">Sell</Button>
        </div>
      </div>

      {/* Markets Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Markets</h3>
          <Button variant="link" size="sm" className="text-primary">
            See all
          </Button>
        </div>
        
        <div className="space-y-3">
          {marketData.map((coin) => (
            <PriceCard
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.price}
              change={coin.change}
              color={coin.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
