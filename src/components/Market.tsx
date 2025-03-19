
import React, { useState, ChangeEvent } from "react";
import { Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Sample data for the cryptocurrency market
const cryptoData = [
  { id: "bitcoin", name: "Bitcoin", code: "BTC", price: 680000000, change: 2.5, iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { id: "ethereum", name: "Ethereum", code: "ETH", price: 45000000, change: -1.2, iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { id: "binancecoin", name: "Binance Coin", code: "BNB", price: 5000000, change: 0.8, iconUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.png" },
  { id: "ripple", name: "XRP", code: "XRP", price: 7800, change: -3.5, iconUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.png" },
  { id: "cardano", name: "Cardano", code: "ADA", price: 7000, change: 1.9, iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
  { id: "solana", name: "Solana", code: "SOL", price: 1700000, change: 4.2, iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  { id: "polkadot", name: "Polkadot", code: "DOT", price: 300000, change: -0.5, iconUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png" },
  { id: "dogecoin", name: "Dogecoin", code: "DOGE", price: 2100, change: 5.8, iconUrl: "https://cryptologos.cc/logos/dogecoin-doge-logo.png" },
  { id: "avalanche", name: "Avalanche", code: "AVAX", price: 500000, change: 2.3, iconUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png" },
  { id: "chainlink", name: "Chainlink", code: "LINK", price: 250000, change: -1.7, iconUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png" },
  // Additional cryptocurrencies to reach 50 would go here
];

const Market = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("market_cap");
  const [timeRange, setTimeRange] = useState("24h");

  const formatToIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const filteredCryptos = cryptoData.filter(crypto => 
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Cryptocurrency Market</h1>
        <p className="text-muted-foreground">Top currencies by market cap</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="24h" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="24h">24h</SelectItem>
              <SelectItem value="7d">7d</SelectItem>
              <SelectItem value="30d">30d</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Market Cap" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market_cap">Market Cap</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="change">% Change</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Market Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-left">
            <tr className="border-b">
              <th className="py-3 px-4 text-muted-foreground font-medium">#</th>
              <th className="py-3 px-4 text-muted-foreground font-medium">Name</th>
              <th className="py-3 px-4 text-muted-foreground font-medium text-right">Price</th>
              <th className="py-3 px-4 text-muted-foreground font-medium text-right">24h %</th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.map((crypto, index) => (
              <tr 
                key={crypto.id} 
                className="border-b hover:bg-secondary/50 transition-colors"
              >
                <td className="py-4 px-4 text-sm">{index + 1}</td>
                <td className="py-4 px-4">
                  <Link 
                    to={`/trading/${crypto.id}`}
                    className="flex items-center gap-3"
                  >
                    <img 
                      src={crypto.iconUrl} 
                      alt={crypto.name} 
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">{crypto.code}</div>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4 text-right font-medium">
                  {formatToIDR(crypto.price)}
                </td>
                <td className={`py-4 px-4 text-right font-medium ${crypto.change >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Market;
