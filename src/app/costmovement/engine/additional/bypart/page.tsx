"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { engineParts } from "@/data/sampleData";

export default function ByPartComparisonPage() {
    const router = useRouter();
    const [selectedPart1, setSelectedPart1] = useState<string>("");
    const [selectedPart2, setSelectedPart2] = useState<string>("");
    const [searchTerm1, setSearchTerm1] = useState<string>("");
    const [searchTerm2, setSearchTerm2] = useState<string>("");
    const [showSuggestions1, setShowSuggestions1] = useState<boolean>(false);
    const [showSuggestions2, setShowSuggestions2] = useState<boolean>(false);

    const handleBackToComparison = () => {
        router.push("/costmovement/engine");
    };

    const handleRefresh = () => {
        router.refresh();
    };

    const handleStartComparison = () => {
        if (selectedPart1 && selectedPart2 && selectedPart1 !== selectedPart2) {
            router.push(
                `/costmovement/engine/additional/bypart/${encodeURIComponent(
                    selectedPart1
                )}/vs/${encodeURIComponent(selectedPart2)}`
            );
        }
    };

    const allPartNumbers = Object.keys(engineParts);

    const getPartSummary = (partNo: string) => {
        const part = engineParts[partNo];
        return {
            totalCost: part.costs.totalCost.currentYear,
            totalChange: part.costs.totalCost.difference,
            percentageChange: part.costs.totalCost.percentageChange,
        };
    };

    // Filter parts based on search terms
    const getFilteredParts = (searchTerm: string, excludePart?: string) => {
        if (!searchTerm.trim()) return [];
        return allPartNumbers
            .filter(
                (partNo) =>
                    partNo.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    partNo !== excludePart
            )
            .slice(0, 8); // Limit to 8 suggestions for better UX
    };

    const handlePartSelect = (partNo: string, partNumber: 1 | 2) => {
        if (partNumber === 1) {
            setSelectedPart1(partNo);
            setSearchTerm1(partNo);
            setShowSuggestions1(false);
        } else {
            setSelectedPart2(partNo);
            setSearchTerm2(partNo);
            setShowSuggestions2(false);
        }
    };

    const handleSearchChange = (value: string, partNumber: 1 | 2) => {
        if (partNumber === 1) {
            setSearchTerm1(value);
            setShowSuggestions1(value.trim() !== "");
            if (value !== selectedPart1) {
                setSelectedPart1("");
            }
        } else {
            setSearchTerm2(value);
            setShowSuggestions2(value.trim() !== "");
            if (value !== selectedPart2) {
                setSelectedPart2("");
            }
        }
    };

    const clearSelection = (partNumber: 1 | 2) => {
        if (partNumber === 1) {
            setSelectedPart1("");
            setSearchTerm1("");
            setShowSuggestions1(false);
        } else {
            setSelectedPart2("");
            setSearchTerm2("");
            setShowSuggestions2(false);
        }
    };

    const isComparisonReady =
        selectedPart1 && selectedPart2 && selectedPart1 !== selectedPart2;

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".search-container")) {
                setShowSuggestions1(false);
                setShowSuggestions2(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <Header
                    title="1v1 Part Comparison"
                    subtitle="Select two parts to compare their cost structures side by side"
                    showBackButton
                    onBackClick={handleBackToComparison}
                    onRefreshClick={handleRefresh}
                />

                {/* Part Selection Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Part 1 Search */}
                    <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-gray-900 flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                Search First Part
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Type to search for the first part to compare
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 search-container">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search part number (e.g., 12000-AB01)"
                                    value={searchTerm1}
                                    onChange={(e) =>
                                        handleSearchChange(e.target.value, 1)
                                    }
                                    onFocus={() =>
                                        setShowSuggestions1(
                                            searchTerm1.trim() !== ""
                                        )
                                    }
                                    className="pl-10 pr-10 bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-md"
                                />
                                {searchTerm1 && (
                                    <button
                                        onClick={() => clearSelection(1)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Search Suggestions */}
                            {showSuggestions1 && (
                                <div className="space-y-2 max-h-64 overflow-y-auto border-2 border-gray-300 rounded-md bg-white shadow-lg">
                                    {getFilteredParts(
                                        searchTerm1,
                                        selectedPart2
                                    ).map((partNo) => {
                                        return (
                                            <button
                                                key={partNo}
                                                onClick={() =>
                                                    handlePartSelect(partNo, 1)
                                                }
                                                className="w-full p-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-200 last:border-b-0"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-semibold text-gray-900">
                                                            {partNo}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {getFilteredParts(
                                        searchTerm1,
                                        selectedPart2
                                    ).length === 0 && (
                                        <div className="p-3 text-center text-gray-500">
                                            No parts found matching &quot;
                                            {searchTerm1}&quot;
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Selected Part Display */}
                            {selectedPart1 && (
                                <div className="p-3 bg-blue-50 border-2 border-blue-300 rounded-md">
                                    <div className="text-gray-900 font-semibold">
                                        Selected: {selectedPart1}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Part 2 Search */}
                    <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-gray-900 flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                Search Second Part
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Type to search for the second part to compare
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 search-container">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search part number (e.g., 16000-XY02)"
                                    value={searchTerm2}
                                    onChange={(e) =>
                                        handleSearchChange(e.target.value, 2)
                                    }
                                    onFocus={() =>
                                        setShowSuggestions2(
                                            searchTerm2.trim() !== ""
                                        )
                                    }
                                    className="pl-10 pr-10 bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-md"
                                />
                                {searchTerm2 && (
                                    <button
                                        onClick={() => clearSelection(2)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Search Suggestions */}
                            {showSuggestions2 && (
                                <div className="space-y-2 max-h-64 overflow-y-auto border-2 border-gray-300 rounded-md bg-white shadow-lg">
                                    {getFilteredParts(
                                        searchTerm2,
                                        selectedPart1
                                    ).map((partNo) => {
                                        return (
                                            <button
                                                key={partNo}
                                                onClick={() =>
                                                    handlePartSelect(partNo, 2)
                                                }
                                                className="w-full p-3 text-left hover:bg-purple-50 transition-colors border-b border-gray-200 last:border-b-0"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-semibold text-gray-900">
                                                            {partNo}
                                                        </div>
                                                    </div>
  
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {getFilteredParts(
                                        searchTerm2,
                                        selectedPart1
                                    ).length === 0 && (
                                        <div className="p-3 text-center text-gray-500">
                                            No parts found matching &quot;
                                            {searchTerm2}&quot;
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Selected Part Display */}
                            {selectedPart2 && (
                                <div className="p-3 bg-purple-50 border-2 border-purple-300 rounded-md">
                                    <div className="text-gray-900 font-semibold">
                                        Selected: {selectedPart2}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Comparison Button */}
                {isComparisonReady && (
                    <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                        <CardContent className="p-6">
                            <div className="text-center space-y-4">
                                <div className="text-gray-900">
                                    <div className="text-lg font-semibold mb-2">
                                        Ready to Compare
                                    </div>
                                    <div className="flex items-center justify-center gap-4 text-sm">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium">
                                            {selectedPart1}
                                        </span>

                                        <span className="font-medium">vs</span>

                                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md font-medium">
                                            {selectedPart2}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleStartComparison}
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-md border-2 border-green-500 px-8 py-3"
                                >
                                    Start 1v1 Comparison
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
