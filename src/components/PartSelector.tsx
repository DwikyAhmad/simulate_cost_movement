"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, BarChart3 } from "lucide-react";
import { engineParts } from "@/data/sampleData";

interface PartSelectorProps {
  selectedParts: string[];
  onPartsChange: (parts: string[]) => void;
  onStartComparison: () => void;
  maxParts?: number;
}

export default function PartSelector({ 
  selectedParts, 
  onPartsChange, 
  onStartComparison,
  maxParts = 4 
}: PartSelectorProps) {
  const [pendingPart, setPendingPart] = useState<string>("");

  const availableParts = Object.keys(engineParts).filter(
    partNo => !selectedParts.includes(partNo)
  );

  const addPart = () => {
    if (pendingPart && !selectedParts.includes(pendingPart) && selectedParts.length < maxParts) {
      onPartsChange([...selectedParts, pendingPart]);
      setPendingPart("");
    }
  };

  const removePart = (partNo: string) => {
    onPartsChange(selectedParts.filter(p => p !== partNo));
  };

  const canAddMore = selectedParts.length < maxParts && availableParts.length > 0;
  const canCompare = selectedParts.length >= 2;

  return (
    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
      <CardHeader>
        <CardTitle className="text-white">Part Comparison Selector</CardTitle>
        <CardDescription className="text-gray-300">
          Select 2-{maxParts} engine parts to compare their cost structures side by side
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Parts Display */}
        {selectedParts.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-300">
              Selected Parts ({selectedParts.length}/{maxParts})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedParts.map((partNo) => (
                <Badge 
                  key={partNo}
                  variant="outline" 
                  className="flex items-center gap-2 px-3 py-2 text-white bg-gray-700 border-gray-500 rounded-none"
                >
                  <span className="font-mono">{partNo}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-gray-600 text-gray-300 hover:text-white"
                    onClick={() => removePart(partNo)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add New Part */}
        {canAddMore && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-300">Add Part to Comparison</h3>
            <div className="flex gap-2">
              <Select value={pendingPart} onValueChange={setPendingPart}>
                <SelectTrigger className="flex-1 rounded-none border-2 border-gray-600 bg-gray-700 text-white">
                  <SelectValue placeholder="Select part number to add" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {availableParts.map((partNo) => (
                    <SelectItem key={partNo} value={partNo} className="text-white hover:bg-gray-600">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono">{partNo}</span>
                        <span className="text-sm text-gray-400 ml-4">
                          {engineParts[partNo].costs.totalCost.percentageChange >= 0 ? '+' : ''}
                          {engineParts[partNo].costs.totalCost.percentageChange.toFixed(2)}%
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={addPart}
                disabled={!pendingPart}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Maximum Parts Reached */}
        {!canAddMore && availableParts.length > 0 && (
          <div className="text-sm text-gray-400 bg-gray-700 p-3 rounded border border-gray-600">
            Maximum of {maxParts} parts can be compared at once. Remove a part to add another.
          </div>
        )}

        {/* No More Parts Available */}
        {availableParts.length === 0 && selectedParts.length < maxParts && (
          <div className="text-sm text-gray-400 bg-gray-700 p-3 rounded border border-gray-600">
            All available parts have been selected for comparison.
          </div>
        )}

        {/* Comparison Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-600">
          <Button 
            onClick={onStartComparison}
            disabled={!canCompare}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-none border-2 border-green-500 disabled:bg-gray-600 disabled:border-gray-500 disabled:text-gray-400"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {canCompare ? `Compare ${selectedParts.length} Parts` : 'Select at least 2 parts'}
          </Button>
          
          {selectedParts.length > 0 && (
            <Button 
              onClick={() => onPartsChange([])}
              variant="outline"
              className="border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 rounded-none"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Quick Stats Preview */}
        {selectedParts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-600">
            <div className="text-center">
              <div className="text-sm text-gray-400">Parts Selected</div>
              <div className="text-lg font-semibold text-white">{selectedParts.length}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Avg. Change</div>
              <div className="text-lg font-semibold text-white">
                {(selectedParts.reduce((sum, partNo) => 
                  sum + engineParts[partNo].costs.totalCost.percentageChange, 0
                ) / selectedParts.length).toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Increasing</div>
              <div className="text-lg font-semibold text-red-400">
                {selectedParts.filter(partNo => 
                  engineParts[partNo].costs.totalCost.percentageChange > 0
                ).length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Decreasing</div>
              <div className="text-lg font-semibold text-green-400">
                {selectedParts.filter(partNo => 
                  engineParts[partNo].costs.totalCost.percentageChange < 0
                ).length}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
