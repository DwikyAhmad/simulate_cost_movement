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
import { Search, X, DollarSign } from "lucide-react";
import { engineParts } from "@/data/sampleData";

export default function FOBComparePage() {
    const router = useRouter();
    const [selectedPart1, setSelectedPart1] = useState<string>("");
    const [selectedPart2, setSelectedPart2] = useState<string>("");
    const [searchTerm1, setSearchTerm1] = useState<string>("");
    const [searchTerm2, setSearchTerm2] = useState<string>("");
    const [showSuggestions1, setShowSuggestions1] = useState<boolean>(false);
    const [showSuggestions2, setShowSuggestions2] = useState<boolean>(false);

    const handleBackToFOB = () => {
        router.push("/costmovement/fob");
    };

    const handleRefresh = () => {
        router.refresh();
    };

    const handleStartComparison = () => {
        if (selectedPart1 && selectedPart2 && selectedPart1 !== selectedPart2) {
            router.push(
                `/costmovement/fob/${encodeURIComponent(
                    selectedPart1
                )}/vs/${encodeURIComponent(selectedPart2)}`
            );
        }
    };

    const allPartNumbers = Object.keys(engineParts);

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
        <div className="min-h-screen bg-gray-900 p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <Header
                    title="FOB 1v1 Comparison"
                    subtitle="Select two parts to compare their FOB pricing components side by side"
                    showBackButton
                    onBackClick={handleBackToFOB}
                    onRefreshClick={handleRefresh}
                />

                {/* Part Selection Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Part 1 Search */}
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                Search First Part
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Type to search for the first part to analyze FOB costs
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
                                    className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-none"
                                />
                                {searchTerm1 && (
                                    <button
                                        onClick={() => clearSelection(1)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Search Suggestions */}
                            {showSuggestions1 && (
                                <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-600 rounded-none bg-gray-700">
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
                                                className="w-full p-3 text-left hover:bg-blue-600 transition-colors border-b border-gray-600 last:border-b-0"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-semibold text-white">
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
                                        <div className="p-3 text-center text-gray-400">
                                            No parts found matching &quot;
                                            {searchTerm1}&quot;
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Selected Part Display */}
                            {selectedPart1 && (
                                <div className="p-3 bg-blue-900/30 border border-blue-600 rounded-none">
                                    <div className="text-white font-semibold">
                                        Selected: {selectedPart1}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Part 2 Search */}
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                Search Second Part
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Type to search for the second part to analyze FOB costs
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
                                    className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-none"
                                />
                                {searchTerm2 && (
                                    <button
                                        onClick={() => clearSelection(2)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Search Suggestions */}
                            {showSuggestions2 && (
                                <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-600 rounded-none bg-gray-700">
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
                                                className="w-full p-3 text-left hover:bg-purple-600 transition-colors border-b border-gray-600 last:border-b-0"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-semibold text-white">
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
                                        <div className="p-3 text-center text-gray-400">
                                            No parts found matching &quot;
                                            {searchTerm2}&quot;
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Selected Part Display */}
                            {selectedPart2 && (
                                <div className="p-3 bg-purple-900/30 border border-purple-600 rounded-none">
                                    <div className="text-white font-semibold">
                                        Selected: {selectedPart2}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Comparison Button */}
                {isComparisonReady && (
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardContent className="p-6">
                            <div className="text-center space-y-4">
                                <div className="text-white">
                                    <div className="text-lg font-semibold mb-2">
                                        Ready to Analyze FOB Costs
                                    </div>
                                    <div className="flex items-center justify-center gap-4 text-sm">
                                        <span className="bg-blue-600 px-3 py-1 rounded-none">
                                            {selectedPart1}
                                        </span>

                                        <span>vs</span>

                                        <span className="bg-purple-600 px-3 py-1 rounded-none">
                                            {selectedPart2}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleStartComparison}
                                    className="bg-orange-600 hover:bg-orange-700 text-white rounded-none border-2 border-orange-500 px-8 py-3"
                                >
                                    <DollarSign className="h-4 w-4 mr-2" />
                                    Start FOB Comparison
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
