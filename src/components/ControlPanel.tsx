"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { engineParts } from "@/data/sampleData";

interface ControlPanelProps {
  selectedPart: string;
  selectedMonth: string;
  comparisonYear: string;
  onPartChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

export default function ControlPanel({
  selectedPart,
  selectedMonth,
  comparisonYear,
  onPartChange,
  onMonthChange,
  onYearChange
}: ControlPanelProps) {
  return (
    <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900">Simulation Controls</CardTitle>
        <CardDescription className="text-gray-600">
          Select engine part and time period for cost analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Part Number</label>
            <Select value={selectedPart} onValueChange={onPartChange}>
              <SelectTrigger className="rounded-md border-2 border-gray-300 bg-white text-gray-900">
                <SelectValue placeholder="Select part number" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                {Object.keys(engineParts).map((partNo) => (
                  <SelectItem key={partNo} value={partNo} className="text-gray-900 hover:bg-blue-50">
                    {partNo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Current Period</label>
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="rounded-md border-2 border-gray-300 bg-white text-gray-900">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="august-2025" className="text-gray-900 hover:bg-blue-50">August 2025</SelectItem>
                <SelectItem value="february-2025" className="text-gray-900 hover:bg-blue-50">February 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Previous Period</label>
            <Select value={comparisonYear} onValueChange={onYearChange}>
              <SelectTrigger className="rounded-md border-2 border-gray-300 bg-white text-gray-900">
                <SelectValue placeholder="Select previous period" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="august-2024" className="text-gray-900 hover:bg-blue-50">August 2024</SelectItem>
                <SelectItem value="february-2024" className="text-gray-900 hover:bg-blue-50">February 2024</SelectItem>
                <SelectItem value="august-2023" className="text-gray-900 hover:bg-blue-50">August 2023</SelectItem>
                <SelectItem value="february-2023" className="text-gray-900 hover:bg-blue-50">February 2023</SelectItem>
                <SelectItem value="august-2022" className="text-gray-900 hover:bg-blue-50">August 2022</SelectItem>
                <SelectItem value="february-2022" className="text-gray-900 hover:bg-blue-50">February 2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
