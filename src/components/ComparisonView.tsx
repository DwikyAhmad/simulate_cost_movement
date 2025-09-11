"use client";

import { useState } from "react";
import Header from "./Header";
import PartNumberFilter from "./PartNumberFilter";
import ComparisonTable from "./ComparisonTable";

interface ComparisonViewProps {
  onBackToList: () => void;
}

export default function ComparisonView({ onBackToList }: ComparisonViewProps) {
  const [filteredParts, setFilteredParts] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const handleFilterChange = (parts: string[]) => {
    setFilteredParts(parts);
    if (parts.length < 2) {
      setShowComparison(false);
    }
  };

  const handleStartComparison = () => {
    if (filteredParts.length >= 2) {
      setShowComparison(true);
    }
  };

  const handleBackToFilter = () => {
    setShowComparison(false);
  };

  const handleRefresh = () => {
    // Implement refresh logic here
    console.log("Refreshing comparison data...");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <Header 
          title={showComparison ? "Parts Comparison Analysis" : "Compare Engine Parts"}
          subtitle={
            showComparison 
              ? `Comparing ${filteredParts.length} parts: ${filteredParts.join(', ')}`
              : "Filter parts by part number prefix to compare their cost structures and performance"
          }
          showBackButton
          onBackClick={showComparison ? handleBackToFilter : onBackToList}
          onRefreshClick={handleRefresh}
        />

        {!showComparison ? (
          /* Part Filter View */
          <>
            <PartNumberFilter
              onFilterChange={handleFilterChange}
              onStartComparison={handleStartComparison}
            />
            
          </>
        ) : (
          /* Comparison Results View */
          <>
            {/* Detailed Comparison Table */}
            <ComparisonTable selectedParts={filteredParts} />

            {/* Back to Filter Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleBackToFilter}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-500 rounded-none transition-colors"
              >
                ← Back to Part Filter
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
