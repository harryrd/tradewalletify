
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface PriceCardProps {
  name: string;
  code: string;
  price: number;
  change: number;
  icon: string;
}

const PriceCard = ({ name, code, price, change, icon }: PriceCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="crypto-card flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `#0052FE20` }}
        >
          <span className="font-semibold text-sm" style={{ color: "#0052FE" }}>
            {code.substring(0, 3)}
          </span>
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{code}/USD</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">${price.toLocaleString()}</p>
        <div
          className={`text-sm flex items-center justify-end ${
            isPositive ? "text-green-500" : "text-red-500"
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
