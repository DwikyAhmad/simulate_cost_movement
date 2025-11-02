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
    <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-gray-900">
          <span>Part Information</span>
          <Badge variant="outline" className="text-lg px-4 py-2 rounded-md border-2 border-blue-300 bg-blue-50 text-blue-900">
            {partNo}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Current Period</p>
            <p className="text-lg font-semibold text-gray-900">{getDisplayDate(selectedMonth)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Comparison Period</p>
            <p className="text-lg font-semibold text-gray-900">{getComparisonDate(selectedMonth, comparisonYear)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
