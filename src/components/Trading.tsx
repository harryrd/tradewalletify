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
import { Chart } from "@/components/ui/chart";

const timeframes = ["1D", "1W", "1M", "1Y", "All"];

const Trading = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  
  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">BTC/USD</h1>
          <div className="text-sm font-medium bg-secondary px-2 py-1 rounded-md flex items-center">
            <span>Bitcoin</span>
            <ChevronDown size={16} className="ml-1 text-muted-foreground" />
          </div>
        </div>
        <Button size="icon" variant="outline" className="rounded-full">
          <Search size={18} />
        </Button>
      </div>

      {/* Price Info */}
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <h2 className="text-3xl font-bold">$42,361.24</h2>
          <div className="flex items-center text-crypto-green text-sm font-medium pb-1">
            <span>+2.34%</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">May 7, 2023, 12:30 PM</p>
      </div>

      {/* Chart Timeframe Selector */}
      <div className="flex overflow-x-auto no-scrollbar py-2">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            className={`px-4 py-2 text-sm font-medium rounded-lg mr-2 transition-colors ${
              selectedTimeframe === timeframe
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground"
            }`}
            onClick={() => setSelectedTimeframe(timeframe)}
          >
            {timeframe}
          </button>
        ))}
      </div>

      {/* Price Chart */}
      <div className="h-72 w-full">
        <Chart type="candlestick" color="#0052FE" />
      </div>

      {/* Trading Tabs */}
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
          <TabsTrigger value="convert">Convert</TabsTrigger>
        </TabsList>
        <TabsContent value="buy" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Pay with</span>
                <span className="text-sm text-muted-foreground">Balance: $5,400.00</span>
              </div>
              <div className="flex h-12 w-full rounded-lg border bg-background px-3 items-center">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="border-0 bg-transparent h-10 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-right flex-1"
                />
                <Select defaultValue="usd">
                  <SelectTrigger className="border-0 w-24 p-0 h-8 ml-2 focus:ring-0">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">You receive</span>
                <span className="text-sm text-muted-foreground">1 BTC ≈ $42,361.24</span>
              </div>
              <div className="flex h-12 w-full rounded-lg border bg-background px-3 items-center">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="border-0 bg-transparent h-10 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-right flex-1"
                />
                <Select defaultValue="btc">
                  <SelectTrigger className="border-0 w-24 p-0 h-8 ml-2 focus:ring-0">
                    <SelectValue placeholder="BTC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="sol">SOL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button className="w-full rounded-xl bg-crypto-blue h-12">
            Buy Bitcoin
          </Button>
        </TabsContent>
        
        <TabsContent value="sell" className="space-y-4">
          {/* Sell content similar to buy but reversed */}
          <div className="text-center text-muted-foreground py-8">
            Sell functionality would mirror the buy interface
          </div>
        </TabsContent>
        
        <TabsContent value="convert" className="space-y-4">
          {/* Convert content */}
          <div className="text-center text-muted-foreground py-8">
            Convert between cryptocurrencies directly
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Trading;
