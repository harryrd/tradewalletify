
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface NewsItemProps {
  title: string;
  summary: string;
  source: string;
  date: string;
  imageUrl: string;
}

const NewsItem = ({ title, summary, source, date, imageUrl }: NewsItemProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-48 md:h-auto">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex flex-col h-full">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{summary}</p>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xs font-medium text-primary">{source}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
              <button className="text-primary hover:text-primary/80 transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default NewsItem;
