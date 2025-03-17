
import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  CartesianGrid, 
  Tooltip, 
  XAxis,
  YAxis 
} from "recharts";

const timeframes = ["1D", "1W", "1M", "1Y", "All"];

const candlestickData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const Trading = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");

  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Trading</h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search coins..."
            className="pr-8 w-44"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Trading Pair Selection */}
      <div className="crypto-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">B</div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Bitcoin</span>
              <span className="text-muted-foreground font-mono">BTC</span>
            </div>
            <p className="text-sm">$42,756.83</p>
          </div>
        </div>
        <Select defaultValue="usd">
          <SelectTrigger className="w-24">
            <SelectValue placeholder="USD" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price and Timeframe */}
      <div className="crypto-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-muted-foreground text-sm">Current Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">$42,756.83</span>
              <span className="text-green-500 text-sm">+1.2%</span>
            </div>
          </div>
          <div className="flex gap-1 bg-secondary/50 p-1 rounded-lg">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                size="sm"
                className={`text-xs px-3 ${selectedTimeframe === timeframe ? "" : "text-muted-foreground"}`}
                onClick={() => setSelectedTimeframe(timeframe)}
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="h-72 w-full">
        <div className="w-full h-full">
          <BarChart
            width={800}
            height={288}
            data={candlestickData}
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
            <Bar dataKey="value" fill="#0052FE" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>
      </div>

      {/* Trading Tabs */}
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="buy" className="flex-1">Buy</TabsTrigger>
          <TabsTrigger value="sell" className="flex-1">Sell</TabsTrigger>
          <TabsTrigger value="convert" className="flex-1">Convert</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buy" className="space-y-4">
          <div className="crypto-card">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <div className="flex">
                  <Input type="number" placeholder="0.00" className="rounded-r-none" />
                  <div className="bg-secondary flex items-center px-3 rounded-r-md border border-l-0 border-input">
                    <span className="font-medium mr-1">USD</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">You'll receive</label>
                <div className="flex">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="rounded-r-none bg-muted pointer-events-none" 
                    readOnly
                  />
                  <div className="bg-secondary flex items-center px-3 rounded-r-md border border-l-0 border-input">
                    <span className="font-medium mr-1">BTC</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6">Buy Bitcoin</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="sell" className="space-y-4">
          <div className="crypto-card">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <div className="flex">
                  <Input type="number" placeholder="0.00" className="rounded-r-none" />
                  <div className="bg-secondary flex items-center px-3 rounded-r-md border border-l-0 border-input">
                    <span className="font-medium mr-1">BTC</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">You'll receive</label>
                <div className="flex">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="rounded-r-none bg-muted pointer-events-none" 
                    readOnly
                  />
                  <div className="bg-secondary flex items-center px-3 rounded-r-md border border-l-0 border-input">
                    <span className="font-medium mr-1">USD</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-6 border-destructive/30 text-destructive hover:bg-destructive/5">
              Sell Bitcoin
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="convert" className="space-y-4">
          <div className="crypto-card">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <div className="flex">
                  <Input type="number" placeholder="0.00" className="rounded-r-none" />
                  <div className="bg-secondary flex items-center px-3 rounded-r-md border border-l-0 border-input">
                    <span className="font-medium mr-1">BTC</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <div className="flex">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="rounded-r-none bg-muted pointer-events-none" 
                    readOnly
                  />
                  <div className="bg-secondary flex items-center px-3 rounded-r-md border border-l-0 border-input">
                    <span className="font-medium mr-1">ETH</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6">Convert</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Trading;
