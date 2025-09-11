"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, AlertTriangle } from "lucide-react";
import { engineParts } from "@/data/sampleData";

interface PartNumberFilterProps {
  onFilterChange: (filteredParts: string[]) => void;
  onStartComparison: (selectedParts: string[]) => void;
}

export default function PartNumberFilter({ onFilterChange, onStartComparison }: PartNumberFilterProps) {
  const [filterPrefix, setFilterPrefix] = useState<string>("");
  const [filteredParts, setFilteredParts] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const getComponentsAboveThreshold = (part: typeof engineParts[string]) => {
    const components = [
      part.costs.nonLVA.jsp,
      part.costs.nonLVA.msp,
      part.costs.lva.localOH,
      part.costs.lva.rawMaterial,
      part.costs.toolingOuthouse,
      part.costs.processingCost.labor,
      part.costs.processingCost.fohFixed,
      part.costs.processingCost.fohVar,
      part.costs.processingCost.unfinishDepre,
      part.costs.processingCost.exclusiveDepre,
    ];

    return components.filter(component => 
      Math.abs(component.percentageChange) >= 5
    ).length;
  };


  const handleInputChange = (value: string) => {
    setFilterPrefix(value);
  };

  const handleSearch = () => {
    const trimmed = filterPrefix.trim();
    if (trimmed === "") {
      setFilteredParts([]);
      onFilterChange([]);
      setHasSearched(true);
      return;
    }

    const allPartNumbers = Object.keys(engineParts);
    const filtered = allPartNumbers.filter((partNo) =>
      partNo.toLowerCase().startsWith(trimmed.toLowerCase())
    );

    setFilteredParts(filtered);
    onFilterChange(filtered);
    setHasSearched(true);
  };

  const clearFilter = () => {
    setFilterPrefix("");
    setFilteredParts([]);
    onFilterChange([]);
    setHasSearched(false);
  };

  return (
    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Parts by Part Number
        </CardTitle>
        <CardDescription className="text-gray-300">
          Enter a part number prefix to filter and compare parts (e.g., &quot;12000&quot;, &quot;1600&quot;)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filter Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter part number prefix (e.g., &quot;12000&quot;)"
              value={filterPrefix}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-none"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="rounded-none bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-500"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          {filterPrefix && hasSearched && (
            <Button
              onClick={clearFilter}
              variant="outline"
              className="rounded-none border-gray-500 text-black hover:bg-gray-700"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Filter Results */}
        {hasSearched && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-medium">
                  Filtered Results
                </h3>
                <Badge variant="secondary" className="rounded-none">
                  {filteredParts.length} parts found
                </Badge>
              </div>
              {filteredParts.length >= 2 && (
                <Button
                  onClick={() => onStartComparison(filteredParts)}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-none border-2 border-purple-500"
                >
                  Compare {filteredParts.length} Parts
                </Button>
              )}
            </div>

            {filteredParts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No parts found with prefix &quot;{filterPrefix}&quot;</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try a different prefix like &quot;12000&quot; or &quot;1600&quot;
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredParts.map(partNo => {
                  const part = engineParts[partNo];
                  
                  return (
                    <div
                      key={partNo}
                      className="bg-gray-700 border border-gray-600 p-4 rounded-none hover:bg-gray-650 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {partNo}
                              </h3>
                              <p className="text-sm text-gray-400 mt-1">
                                {getComponentsAboveThreshold(part)} of 10 components above threshold
                              </p>
                            </div>
                            <div className="flex items-center">
                              {getComponentsAboveThreshold(part) >= 1 ? (
                                <Badge variant="destructive" className="ml-2 rounded-none">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Above Threshold
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="ml-2 rounded-none text-white">
                                  Stable
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredParts.length === 1 && (
              <div className="text-center py-4">
                <p className="text-gray-400">Need at least 2 parts to compare</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try a broader prefix to find more matching parts
                </p>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {!hasSearched && (
          <div className="text-center py-8">
            <Filter className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Ready to Compare Parts</h3>
            <p className="text-gray-400 text-sm mb-4">
              Enter a part number prefix to see all matching parts for comparison
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
