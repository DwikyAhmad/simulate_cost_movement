"use client";

import { useState } from "react";
import EnginePartsList from "@/components/EnginePartsList";
import CostDetailView from "@/components/CostDetailView";
import ComparisonView from "@/components/ComparisonView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type ViewType = 'list' | 'detail' | 'comparison';

export default function PartListCostPage() {
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedPart, setSelectedPart] = useState<string>("120000Y140");

  const handleSelectPart = (partNo: string) => {
    setSelectedPart(partNo);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  const handleGoToComparison = () => {
    setCurrentView('comparison');
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  // Add header with back button for all views
  const Header = () => (
    <div className="bg-gray-800 border-b border-gray-600 p-4 md:p-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
          <Button 
            onClick={handleBackToHome}
            variant="outline" 
            className="flex items-center gap-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Cost Movement</h1>
            <p className="text-gray-300 mt-1 text-sm md:text-base">
              Monitor cost movements across all engine components
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  switch (currentView) {
    case 'list':
      return (
        <div className="min-h-screen bg-gray-900">
          <Header />
          <EnginePartsList 
            onSelectPart={handleSelectPart}
            onGoToComparison={handleGoToComparison}
          />
        </div>
      );
    
    case 'detail':
      return (
        <div className="min-h-screen bg-gray-900">
          <Header />
          <CostDetailView 
            initialPart={selectedPart}
            onBackToList={handleBackToList}
          />
        </div>
      );
    
    case 'comparison':
      return (
        <div className="min-h-screen bg-gray-900">
          <Header />
          <ComparisonView 
            onBackToList={handleBackToList}
          />
        </div>
      );
    
    default:
      return (
        <div className="min-h-screen bg-gray-900">
          <Header />
          <EnginePartsList 
            onSelectPart={handleSelectPart}
            onGoToComparison={handleGoToComparison}
          />
        </div>
      );
  }
}
