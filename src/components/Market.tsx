
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PriceCard from "@/components/ui/PriceCard";

// Sample data - in a real app this would come from an API
const cryptoData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    code: "BTC",
    price: 642756830000, // In IDR
    change: 1.2,
    icon: "/icons/btc.svg",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    code: "ETH",
    price: 42856450000,
    change: -0.8,
    icon: "/icons/eth.svg",
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    code: "BNB",
    price: 3452200000,
    change: 2.5,
    icon: "/icons/bnb.svg",
  },
  // ... more cryptocurrencies
];

const Market = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("market_cap");

  const handleCryptoSelect = (cryptoId: string) => {
    navigate(`/trading/${cryptoId}`);
  };

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="py-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Market</h1>
          <p className="text-muted-foreground text-sm">Top 50 cryptocurrencies by market cap</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="Search cryptocurrency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64"
            icon={<Search className="h-4 w-4" />}
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {cryptoData.map((crypto) => (
          <div
            key={crypto.id}
            onClick={() => handleCryptoSelect(crypto.id)}
            className="cursor-pointer"
          >
            <PriceCard
              name={crypto.name}
              code={crypto.code}
              price={crypto.price}
              change={crypto.change}
              icon={crypto.icon}
              priceFormatter={formatIDR}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
