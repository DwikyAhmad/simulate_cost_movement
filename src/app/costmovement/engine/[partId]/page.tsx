"use client";

import { useRouter, useParams } from "next/navigation";
import CostDetailView from "@/components/CostDetailView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PartDetailPage() {
  const router = useRouter();
  const params = useParams();
  const partId = params.partId as string;

  const handleBackToList = () => {
    router.push('/costmovement/engine');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white border-b-2 border-blue-100 shadow-sm p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
            <Button 
              onClick={handleBackToHome}
              variant="outline" 
              className="flex items-center gap-2 rounded-md border-2 border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">Cost Movement - Part Details</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Detailed cost analysis for part {partId}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CostDetailView 
        initialPart={partId}
        onBackToList={handleBackToList}
      />
    </div>
  );
}
