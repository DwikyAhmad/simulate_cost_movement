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
    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
      <CardHeader>
        <CardTitle className="text-white">Simulation Controls</CardTitle>
        <CardDescription className="text-gray-300">
          Select engine part and time period for cost analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Part Number</label>
            <Select value={selectedPart} onValueChange={onPartChange}>
              <SelectTrigger className="rounded-none border-2 border-gray-600 bg-gray-700 text-white">
                <SelectValue placeholder="Select part number" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {Object.keys(engineParts).map((partNo) => (
                  <SelectItem key={partNo} value={partNo} className="text-white hover:bg-gray-600">
                    {partNo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Current Period (2025)</label>
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="rounded-none border-2 border-gray-600 bg-gray-700 text-white">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="august-2025" className="text-white hover:bg-gray-600">August 2025</SelectItem>
                <SelectItem value="july-2025" className="text-white hover:bg-gray-600">July 2025</SelectItem>
                <SelectItem value="june-2025" className="text-white hover:bg-gray-600">June 2025</SelectItem>
                <SelectItem value="may-2025" className="text-white hover:bg-gray-600">May 2025</SelectItem>
                <SelectItem value="april-2025" className="text-white hover:bg-gray-600">April 2025</SelectItem>
                <SelectItem value="march-2025" className="text-white hover:bg-gray-600">March 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Comparison Year</label>
            <Select value={comparisonYear} onValueChange={onYearChange}>
              <SelectTrigger className="rounded-none border-2 border-gray-600 bg-gray-700 text-white">
                <SelectValue placeholder="Select comparison year" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="2024" className="text-white hover:bg-gray-600">2024</SelectItem>
                <SelectItem value="2023" className="text-white hover:bg-gray-600">2023</SelectItem>
                <SelectItem value="2022" className="text-white hover:bg-gray-600">2022</SelectItem>
                <SelectItem value="2021" className="text-white hover:bg-gray-600">2021</SelectItem>
                <SelectItem value="2020" className="text-white hover:bg-gray-600">2020</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
