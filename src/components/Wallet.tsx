
import React from "react";
import { PlusCircle, Send, Download, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const assets = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.45,
    value: 19062.56,
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
    color: "#F7931A",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    balance: 3.21,
    value: 7468.96,
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    color: "#627EEA",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    balance: 24.5,
    value: 3436.13,
    logo: "https://cryptologos.cc/logos/solana-sol-logo.svg",
    color: "#00FFBD",
  },
];

const transactions = [
  {
    id: "tx1",
    type: "received",
    amount: 0.05,
    symbol: "BTC",
    date: "May 6, 2023",
    from: "0x1a2...3b4c",
    status: "completed",
  },
  {
    id: "tx2",
    type: "sent",
    amount: 10,
    symbol: "SOL",
    date: "May 5, 2023",
    to: "0x5d6...7e8f",
    status: "completed",
  },
  {
    id: "tx3",
    type: "received",
    amount: 0.5,
    symbol: "ETH",
    date: "May 3, 2023",
    from: "0x9a0...1b2c",
    status: "completed",
  },
];

const Wallet = () => {
  const [hideBalance, setHideBalance] = React.useState(false);
  
  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">My Wallet</h1>
          <p className="text-muted-foreground text-sm">Manage your crypto</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setHideBalance(!hideBalance)}
        >
          {hideBalance ? <Eye size={20} /> : <EyeOff size={20} />}
        </Button>
      </div>

      {/* Balance Card */}
      <div className="glass-card p-6 space-y-4">
        <p className="text-sm text-muted-foreground">Total balance</p>
        <h2 className="text-3xl font-bold">
          {hideBalance ? "••••••" : "$29,967.65"}
        </h2>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl flex-1 gap-2 h-12"
          >
            <Send size={18} />
            <span>Send</span>
          </Button>
          <Button
            variant="outline" 
            size="sm"
            className="rounded-xl flex-1 gap-2 h-12"
          >
            <Download size={18} />
            <span>Receive</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-2 h-12"
          >
            <PlusCircle size={18} />
            <span>Buy</span>
          </Button>
        </div>
      </div>

      {/* Assets and Transactions Tabs */}
      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets" className="space-y-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="crypto-card flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${asset.color}20` }}
                >
                  <span className="font-semibold text-sm" style={{ color: asset.color }}>
                    {asset.symbol}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {asset.balance} {asset.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {hideBalance ? "••••••" : `$${asset.value.toLocaleString()}`}
                </p>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="crypto-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "received"
                      ? "bg-crypto-green/10 text-crypto-green"
                      : "bg-crypto-red/10 text-crypto-red"
                  }`}
                >
                  {tx.type === "received" ? (
                    <Download size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {tx.type === "received" ? "Received" : "Sent"} {tx.symbol}
                  </p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {tx.type === "received" ? "+" : "-"}
                  {hideBalance ? "••" : tx.amount} {tx.symbol}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
