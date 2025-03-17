
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface PriceCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  color: string;
}

const PriceCard = ({ name, symbol, price, change, color }: PriceCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="crypto-card flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <span className="font-semibold text-sm" style={{ color }}>
            {symbol}
          </span>
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{symbol}/USD</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">${price.toLocaleString()}</p>
        <div
          className={`text-sm flex items-center justify-end ${
            isPositive ? "text-crypto-green" : "text-crypto-red"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          <span>{isPositive ? "+" : ""}{change}%</span>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
