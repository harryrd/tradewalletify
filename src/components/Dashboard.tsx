
import React from "react";
import { ArrowUpRight, ArrowDownRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriceCard from "@/components/ui/PriceCard";
import CustomChart from "@/components/ui/custom-chart";
import { Card } from "@/components/ui/card";
import NewsItem from "@/components/NewsItem";

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

const newsData = [
  {
    id: 1,
    title: "Bitcoin Surpasses $43,000 as Institutional Investors Return",
    summary: "Bitcoin has reached a new monthly high as large institutional investors show renewed interest in digital assets.",
    source: "CryptoNews",
    date: "2023-07-21",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Yml0Y29pbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    title: "Ethereum 2.0 Upgrade: What You Need to Know",
    summary: "The upcoming Ethereum upgrade promises to improve scalability and reduce environmental impact.",
    source: "BlockchainToday",
    date: "2023-07-19",
    imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXRoZXJldW18ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    title: "Major Bank Launches Cryptocurrency Custody Services",
    summary: "One of the world's largest financial institutions has announced plans to offer cryptocurrency custody services to clients.",
    source: "FinanceDaily",
    date: "2023-07-18",
    imageUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFua3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 4,
    title: "NFT Market Shows Signs of Recovery After Months of Decline",
    summary: "The non-fungible token market is experiencing a resurgence with several high-profile sales in recent weeks.",
    source: "ArtTech",
    date: "2023-07-15",
    imageUrl: "https://images.unsplash.com/photo-1646483236107-26cf2ddbbb0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5mdHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    title: "Regulatory Clarity: New Framework for Cryptocurrency Assets",
    summary: "Regulators have published new guidelines aimed at providing clarity for cryptocurrency businesses and investors.",
    source: "PolicyInsight",
    date: "2023-07-12",
    imageUrl: "https://images.unsplash.com/photo-1621630866349-0cff448317a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlZ3VsYXRpb258ZW58MHx8MHx8fDA%3D"
  }
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

      {/* News Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Latest News</h2>
          <Button variant="link" className="text-primary p-0">More News</Button>
        </div>
        
        <div className="space-y-4">
          {newsData.map((news) => (
            <NewsItem 
              key={news.id}
              title={news.title}
              summary={news.summary}
              source={news.source}
              date={news.date}
              imageUrl={news.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
