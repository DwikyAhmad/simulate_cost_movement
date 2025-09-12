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
    <div className="min-h-screen bg-gray-900">
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
      <EnginePartsList 
        onSelectPart={handleSelectPart}
        onGoToComparison={handleGoToComparison}
      />
    </div>
  );
}
