"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { engineParts } from "@/data/sampleData";
import { Eye, AlertTriangle } from "lucide-react";

interface EnginePartsListProps {
    onSelectPart: (partNo: string) => void;
}

export default function EnginePartsList({
    onSelectPart,
}: EnginePartsListProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getDifferenceColor = (change: number) => {
        if (change > 0) return "text-red-400";
        if (change < 0) return "text-green-400";
        return "text-gray-300";
    };

    const getStatusIndicator = (percentageChange: number) => {
        if (Math.abs(percentageChange) >= 5) {
            return percentageChange > 0 ? (
                <Badge variant="destructive" className="ml-2 rounded-none">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Above Threshold
                </Badge>
            ) : (
                <Badge
                    variant="default"
                    className="ml-2 rounded-none bg-green-600 text-white"
                >
                    Good
                </Badge>
            );
        } else {
            return (
                <Badge
                    variant="outline"
                    className="ml-2 rounded-none text-white"
                >
                    Stable
                </Badge>
            );
        }
    };

    const partNumbers = Object.keys(engineParts);

    return (
        <div className="min-h-screen bg-gray-900 p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <div className="bg-gray-800 border-b border-gray-600 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">
                                Engine Parts Cost Overview
                            </h1>
                            <p className="text-gray-300 mt-1 text-sm md:text-base">
                                Monitor cost movements across all engine
                                components
                            </p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-sm text-gray-400">
                                Period: August 2025
                            </p>
                            <p className="text-sm text-gray-400">
                                Comparison: August 2024
                            </p>
                        </div>
                    </div>
                </div>

                {/* Parts List */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Engine Parts List
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                            Overview of all engine parts with cost movement
                            indicators
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            {partNumbers.map((partNo) => {
                                const part = engineParts[partNo];
                                const totalCost = part.costs.totalCost;

                                return (
                                    <div
                                        key={partNo}
                                        className="bg-gray-700 border border-gray-600 p-4 rounded-none hover:bg-gray-650 transition-colors"
                                    >
                                        {/* Desktop Layout */}
                                        <div className="hidden lg:flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">
                                                            {partNo}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {getStatusIndicator(
                                                            totalCost.percentageChange
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-400">
                                                        Current Total Cost
                                                    </p>
                                                    <p className="text-lg font-semibold text-white">
                                                        {formatCurrency(
                                                            totalCost.currentYear
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm text-gray-400">
                                                        Change from Last Year
                                                    </p>
                                                    <p
                                                        className={`text-lg font-semibold ${getDifferenceColor(
                                                            totalCost.difference
                                                        )}`}
                                                    >
                                                        {totalCost.difference >=
                                                        0
                                                            ? "+"
                                                            : "-"}
                                                        {formatCurrency(
                                                            Math.abs(
                                                                totalCost.difference
                                                            )
                                                        )}
                                                    </p>
                                                    <p
                                                        className={`text-sm ${getDifferenceColor(
                                                            totalCost.difference
                                                        )}`}
                                                    >
                                                        (
                                                        {totalCost.percentageChange >=
                                                        0
                                                            ? "+"
                                                            : ""}
                                                        {totalCost.percentageChange.toFixed(
                                                            2
                                                        )}
                                                        %)
                                                    </p>
                                                </div>

                                                <Button
                                                    onClick={() =>
                                                        onSelectPart(partNo)
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500"
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Tablet Layout */}
                                        <div className="hidden md:flex lg:hidden flex-col space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-semibold text-white">
                                                        {partNo}
                                                    </h3>
                                                    {getStatusIndicator(
                                                        totalCost.percentageChange
                                                    )}
                                                </div>
                                                <Button
                                                    onClick={() =>
                                                        onSelectPart(partNo)
                                                    }
                                                    size="sm"
                                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500"
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Details
                                                </Button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-400">
                                                        Current Total Cost
                                                    </p>
                                                    <p className="text-lg font-semibold text-white">
                                                        {formatCurrency(
                                                            totalCost.currentYear
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400">
                                                        Change from Last Year
                                                    </p>
                                                    <p
                                                        className={`text-lg font-semibold ${getDifferenceColor(
                                                            totalCost.difference
                                                        )}`}
                                                    >
                                                        {totalCost.difference >=
                                                        0
                                                            ? "+"
                                                            : "-"}
                                                        {formatCurrency(
                                                            Math.abs(
                                                                totalCost.difference
                                                            )
                                                        )}
                                                    </p>
                                                    <p
                                                        className={`text-sm ${getDifferenceColor(
                                                            totalCost.difference
                                                        )}`}
                                                    >
                                                        (
                                                        {totalCost.percentageChange >=
                                                        0
                                                            ? "+"
                                                            : ""}
                                                        {totalCost.percentageChange.toFixed(
                                                            2
                                                        )}
                                                        %)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Layout */}
                                        <div className="md:hidden flex flex-col space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-white">
                                                    {partNo}
                                                </h3>
                                                <Button
                                                    onClick={() =>
                                                        onSelectPart(partNo)
                                                    }
                                                    size="sm"
                                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="flex justify-center">
                                                {getStatusIndicator(
                                                    totalCost.percentageChange
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Current Total Cost
                                                    </p>
                                                    <p className="text-base font-semibold text-white">
                                                        {formatCurrency(
                                                            totalCost.currentYear
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Change from Last Year
                                                    </p>
                                                    <p
                                                        className={`text-base font-semibold ${getDifferenceColor(
                                                            totalCost.difference
                                                        )}`}
                                                    >
                                                        {totalCost.difference >=
                                                        0
                                                            ? "+"
                                                            : "-"}
                                                        {formatCurrency(
                                                            Math.abs(
                                                                totalCost.difference
                                                            )
                                                        )}
                                                    </p>
                                                    <p
                                                        className={`text-xs ${getDifferenceColor(
                                                            totalCost.difference
                                                        )}`}
                                                    >
                                                        (
                                                        {totalCost.percentageChange >=
                                                        0
                                                            ? "+"
                                                            : ""}
                                                        {totalCost.percentageChange.toFixed(
                                                            2
                                                        )}
                                                        %)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Total Parts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {partNumbers.length}
                            </div>
                            <p className="text-xs text-gray-400">
                                Active engine parts
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Above Threshold
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-400">
                                {
                                    partNumbers.filter(
                                        (partNo) =>
                                            engineParts[partNo].costs.totalCost
                                                .percentageChange >= 5
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-gray-400">
                                ≥5% cost increase
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Cost Reduction
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-400">
                                {
                                    partNumbers.filter(
                                        (partNo) =>
                                            engineParts[partNo].costs.totalCost
                                                .percentageChange <= -5
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-gray-400">
                                ≥5% cost decrease
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-300">
                                Stable Parts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-400">
                                {
                                    partNumbers.filter(
                                        (partNo) =>
                                            Math.abs(
                                                engineParts[partNo].costs
                                                    .totalCost.percentageChange
                                            ) < 2
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-gray-400">
                                &lt;2% change
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
