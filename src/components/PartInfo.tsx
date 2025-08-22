"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDisplayDate, getComparisonDate } from "@/lib/utils";

interface PartInfoProps {
  partNo: string;
  selectedMonth: string;
  comparisonYear: string;
}

export default function PartInfo({ partNo, selectedMonth, comparisonYear }: PartInfoProps) {
  return (
    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span>Part Information</span>
          <Badge variant="outline" className="text-lg px-4 py-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white">
            {partNo}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-400">Current Period</p>
            <p className="text-lg font-semibold text-white">{getDisplayDate(selectedMonth)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Comparison Period</p>
            <p className="text-lg font-semibold text-white">{getComparisonDate(selectedMonth, comparisonYear)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
