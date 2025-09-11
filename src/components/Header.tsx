"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onRefreshClick?: () => void;
}

export default function Header({ 
  title, 
  subtitle, 
  showBackButton = false, 
  onBackClick,
  onRefreshClick 
}: HeaderProps) {
  return (
    <div className="bg-gray-800 border-b border-gray-600 p-4 md:p-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
          {showBackButton && onBackClick && (
            <Button 
              onClick={onBackClick}
              variant="outline" 
              className="flex items-center gap-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 w-fit"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
              <span className="sm:hidden">Back</span>
            </Button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{title}</h1>
            <p className="text-gray-300 mt-1 text-sm md:text-base">{subtitle}</p>
          </div>
        </div>
        {onRefreshClick && (
          <Button 
            onClick={onRefreshClick}
            variant="outline" 
            className="flex items-center gap-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 w-fit md:w-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh Data</span>
            <span className="sm:hidden">Refresh</span>
          </Button>
        )}
      </div>
    </div>
  );
}
