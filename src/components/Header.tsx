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
    <div className="bg-white border-b-2 border-blue-100 shadow-sm p-4 md:p-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
          {showBackButton && onBackClick && (
            <Button 
              onClick={onBackClick}
              variant="outline" 
              className="flex items-center gap-2 rounded-md border-2 border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
              <span className="sm:hidden">Back</span>
            </Button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">{title}</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">{subtitle}</p>
          </div>
        </div>
        {onRefreshClick && (
          <Button 
            onClick={onRefreshClick}
            variant="outline" 
            className="flex items-center gap-2 rounded-md border-2 border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        )}
      </div>
    </div>
  );
}
