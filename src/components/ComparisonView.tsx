"use client";

import { useState } from "react";
import Header from "./Header";
import PartSelector from "./PartSelector";
import ComparisonSummary from "./ComparisonSummary";
import ComparisonTable from "./ComparisonTable";

interface ComparisonViewProps {
  onBackToList: () => void;
}

export default function ComparisonView({ onBackToList }: ComparisonViewProps) {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const handleStartComparison = () => {
    if (selectedParts.length >= 2) {
      setShowComparison(true);
    }
  };

  const handleBackToSelector = () => {
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
              ? `Comparing ${selectedParts.length} parts: ${selectedParts.join(', ')}`
              : "Select multiple parts to compare their cost structures and performance"
          }
          showBackButton
          onBackClick={showComparison ? handleBackToSelector : onBackToList}
          onRefreshClick={handleRefresh}
        />

        {!showComparison ? (
          /* Part Selection View */
          <>
            <PartSelector
              selectedParts={selectedParts}
              onPartsChange={setSelectedParts}
              onStartComparison={handleStartComparison}
              maxParts={4}
            />
            
            {/* Preview Summary when parts are selected */}
            {selectedParts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    Preview Summary ({selectedParts.length} parts selected)
                  </h2>
                  {selectedParts.length >= 2 && (
                    <button
                      onClick={handleStartComparison}
                      className="text-sm text-blue-400 hover:text-blue-300 underline"
                    >
                      View detailed comparison →
                    </button>
                  )}
                </div>
                <ComparisonSummary selectedParts={selectedParts} />
              </div>
            )}
          </>
        ) : (
          /* Comparison Results View */
          <>
            {/* Summary Overview */}
            <ComparisonSummary selectedParts={selectedParts} />

            {/* Detailed Comparison Table */}
            <ComparisonTable selectedParts={selectedParts} />

            {/* Back to Selector Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleBackToSelector}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-500 rounded-none transition-colors"
              >
                ← Back to Part Selection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
