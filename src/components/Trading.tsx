import React, { useState } from "react";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar as CalendarIcon,
  ChevronDown, 
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CustomChart from "@/components/ui/custom-chart";
import PriceCard from "@/components/ui/PriceCard";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

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

const chartTimeframes = [
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
  { value: '1m', label: '1M' },
  { value: '1y', label: '1Y' },
  { value: 'all', label: 'All' },
];

const orderHistory = [
  {
    id: "1",
    type: "buy",
    pair: "BTC/USDT",
    amount: "0.001",
    currency: "BTC",
    price: "42,500",
    date: "2023-08-01 10:00",
  },
  {
    id: "2",
    type: "sell",
    pair: "ETH/USDT",
    amount: "0.01",
    currency: "ETH",
    price: "2,800",
    date: "2023-08-01 11:00",
  },
  {
    id: "3",
    type: "buy",
    pair: "LTC/USDT",
    amount: "1",
    currency: "LTC",
    price: "145",
    date: "2023-08-01 12:00",
  },
];

const Trading = () => {
  const [activeTab, setActiveTab] = useState("spot");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [timeframe, setTimeframe] = useState("1d");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  return (
    <div className="py-8 space-y-6">
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Trading</h1>
          <p className="text-muted-foreground text-sm">Buy and sell cryptocurrency</p>
        </div>
        <Tabs defaultValue="spot" className="w-full md:w-auto">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="spot">Spot</TabsTrigger>
            <TabsTrigger value="futures">Futures</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Chart */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <img src="/icons/btc.svg" alt="BTC" className="h-5 w-5" />
                </div>
                Bitcoin
                <span className="text-sm font-normal text-muted-foreground">BTC/USDT</span>
              </CardTitle>
              <CardDescription className="flex gap-2 items-center">
                <span className="text-2xl text-foreground font-medium">$42,680.75</span>
                <span className="text-red-500 text-sm font-medium flex items-center">
                  <ArrowDownRight size={14} className="mr-0.5" />
                  1.2%
                </span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="1d">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {chartTimeframes.map((tf) => (
                    <SelectItem key={tf.value} value={tf.value}>{tf.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <CustomChart type="candlestick" />
          </CardContent>
        </Card>
        
        {/* Right Column - Order Form */}
        <div className="space-y-6">
          {/* Order Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price (USDT)</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount (BTC)</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Total</label>
                      <span className="text-sm text-muted-foreground">0.00 USDT</span>
                    </div>
                    <Slider defaultValue={[25]} max={100} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <Button className="w-full">Buy BTC</Button>
                </TabsContent>
                <TabsContent value="sell" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price (USDT)</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount (BTC)</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Total</label>
                      <span className="text-sm text-muted-foreground">0.00 USDT</span>
                    </div>
                    <Slider defaultValue={[25]} max={100} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="destructive">Sell BTC</Button>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
          
          {/* Orders History */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="flex justify-between pb-2 border-b border-border/50 last:border-none">
                    <div>
                      <p className="font-medium">{order.type === 'buy' ? 'Buy' : 'Sell'} {order.pair}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.amount} {order.currency}</p>
                      <p className={`text-xs ${order.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                        {order.price} USDT
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full text-xs">View All Orders</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Trading;
