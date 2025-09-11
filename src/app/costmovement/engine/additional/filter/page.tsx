"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import PartNumberFilter from "@/components/PartNumberFilter";

export default function ComparisonFilterPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/costmovement/engine/additional');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFilterChange = (parts: string[]) => {
    // This will be handled by the PartNumberFilter component
    // when it navigates to the results page
  };

  const handleStartComparison = (selectedParts: string[]) => {
    if (selectedParts.length >= 2) {
      // Navigate to results page with selected parts as URL parameters
      const partsParam = selectedParts.join(',');
      router.push(`/costmovement/engine/additional/results/${encodeURIComponent(partsParam)}`);
    }
  };

  const handleRefresh = () => {
    // Refresh the current page
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <Header 
          title="Compare Engine Parts"
          subtitle="Filter parts by part number prefix to compare their cost structures and performance"
          showBackButton
          onBackClick={handleBack}
          onRefreshClick={handleRefresh}
        />

        {/* Part Filter View */}
        <PartNumberFilter
          onFilterChange={handleFilterChange}
          onStartComparison={handleStartComparison}
        />
      </div>
    </div>
  );
}
