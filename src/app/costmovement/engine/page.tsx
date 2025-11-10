"use client";

import { useRouter } from "next/navigation";
import EnginePartsList from "@/components/EnginePartsList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EnginePartsListPage() {
  const router = useRouter();

  const handleSelectPart = (partNo: string) => {
    router.push(`/costmovement/engine/${partNo}`);
  };

  const handleGoToComparison = () => {
    router.push('/costmovement/engine/additional/bypart');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
            <Button 
              onClick={handleBackToHome}
              variant="outline" 
              className="flex items-center gap-2 rounded-none border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 w-fit"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Cost Movement</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Monitor cost movements across all engine components
              </p>
            </div>
          </div>
        </div>
      </div>
      <EnginePartsList 
        onSelectPart={handleSelectPart}
        onGoToComparison={handleGoToComparison}
      />
    </div>
  );
}
