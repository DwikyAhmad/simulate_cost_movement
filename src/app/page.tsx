"use client";

import { useState } from "react";
import EnginePartsList from "@/components/EnginePartsList";
import CostDetailView from "@/components/CostDetailView";
import ComparisonView from "@/components/ComparisonView";

type ViewType = 'list' | 'detail' | 'comparison';

export default function CostMovementSimulation() {
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

  switch (currentView) {
    case 'list':
      return (
        <EnginePartsList 
          onSelectPart={handleSelectPart}
          onGoToComparison={handleGoToComparison}
        />
      );
    
    case 'detail':
      return (
        <CostDetailView 
          initialPart={selectedPart}
          onBackToList={handleBackToList}
        />
      );
    
    case 'comparison':
      return (
        <ComparisonView 
          onBackToList={handleBackToList}
        />
      );
    
    default:
      return (
        <EnginePartsList 
          onSelectPart={handleSelectPart}
          onGoToComparison={handleGoToComparison}
        />
      );
  }
}