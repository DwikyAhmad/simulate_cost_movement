"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { engineParts } from "@/data/sampleData";
import Header from "./Header";
import ControlPanel from "./ControlPanel";
import PartInfo from "./PartInfo";
import CostTable from "./CostTable";

interface CostDetailViewProps {
  initialPart: string;
  onBackToList: () => void;
}

export default function CostDetailView({ initialPart, onBackToList }: CostDetailViewProps) {
  const router = useRouter();
  const [selectedPart] = useState<string>(initialPart);
  const [selectedMonth, setSelectedMonth] = useState<string>("august-2025");
  const [comparisonYear, setComparisonYear] = useState<string>("2024");

  const currentPart = engineParts[selectedPart];

  const handlePartChange = (newPart: string) => {
    if (newPart !== selectedPart) {
      router.push(`/costmovement/engine/${newPart}`);
    }
  };

  const handleRefresh = () => {
    // Implement refresh logic here
    console.log("Refreshing data...");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <Header 
          title="Cost Movement Detail"
          subtitle={`Detailed cost analysis for ${currentPart.partNo}`}
          showBackButton
          onBackClick={onBackToList}
          onRefreshClick={handleRefresh}
        />

        {/* Control Panel */}
        <ControlPanel
          selectedPart={selectedPart}
          selectedMonth={selectedMonth}
          comparisonYear={comparisonYear}
          onPartChange={handlePartChange}
          onMonthChange={setSelectedMonth}
          onYearChange={setComparisonYear}
        />

        {/* Part Information */}
        <PartInfo
          partNo={currentPart.partNo}
          selectedMonth={selectedMonth}
          comparisonYear={comparisonYear}
        />

        {/* Cost Breakdown Table */}
        <CostTable partData={currentPart} />

      </div>
    </div>
  );
}
