"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Users, ArrowRight, } from "lucide-react";

export default function ComparisonPage() {
  const router = useRouter();

  const handleBackToEngine = () => {
    router.push('/costmovement/engine');
  };

  const handleRefresh = () => {
    router.refresh();
  };

  const handleBulkComparison = () => {
    router.push('/costmovement/engine/additional/filter');
  };

  const handleByPartComparison = () => {
    router.push('/costmovement/engine/additional/bypart');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <Header 
          title="Cost Movement - Additional Analysis"
          subtitle="Choose your comparison method to analyze engine part costs and performance"
          showBackButton
          onBackClick={handleBackToEngine}
          onRefreshClick={handleRefresh}
        />

        {/* Comparison Options */}
        <div className="grid grid-cols-1 max-w-lg mx-auto pt-20 gap-6">
          {/* Bulk Comparison Card */}
          <Card className="rounded-none border-2 bg-gray-800 border-gray-600 hover:border-blue-500 transition-colors group">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-400" />
                Filter Cost Movement by Part Number
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <Button
                onClick={handleBulkComparison}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500 group-hover:border-blue-400 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Start Filter Comparison
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* 1v1 Comparison Card */}
          <Card className="rounded-none border-2 bg-gray-800 border-gray-600 hover:border-purple-500 transition-colors group">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                1v1 Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <Button
                onClick={handleByPartComparison}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-none border-2 border-purple-500 group-hover:border-purple-400 transition-colors"
              >
                <Users className="h-4 w-4 mr-2" />
                Start 1v1 Comparison
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
