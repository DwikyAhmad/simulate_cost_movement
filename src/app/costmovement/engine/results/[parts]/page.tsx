"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { engineParts } from "@/data/sampleData";
import { formatCurrency } from "@/lib/utils";

interface ComparisonResultsPageProps {
    params: Promise<{ parts: string }>;
}

export default function ComparisonResultsPage({
    params,
}: ComparisonResultsPageProps) {
    const router = useRouter();
    const resolvedParams = use(params);
    const selectedParts = decodeURIComponent(resolvedParams.parts).split(",");

    const handleBackToList = () => {
        router.push("/costmovement/engine");
    };

    const handleRefresh = () => {
        router.refresh();
    };

    const getChangeBadge = (percentage: number) => {
        const baseClasses = "rounded-none text-xs px-2 py-1";

        if (percentage >= 5) {
            return (
                <Badge variant="destructive" className={baseClasses}>
                    +{percentage.toFixed(2)}%
                </Badge>
            );
        } else if (percentage > 0) {
            return (
                <Badge
                    variant="secondary"
                    className={`${baseClasses} bg-yellow-100 text-yellow-800`}
                >
                    +{percentage.toFixed(2)}%
                </Badge>
            );
        } else if (percentage < 0) {
            return (
                <Badge
                    variant="default"
                    className={`${baseClasses} bg-green-100 text-green-800`}
                >
                    {percentage.toFixed(2)}%
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className={`${baseClasses} text-gray-600`}>
                0.00%
            </Badge>
        );
    };

    const getPartsData = () => {
        return selectedParts
            .map((partNo) => partNo.trim())
            .filter((partNo) => engineParts[partNo])
            .map((partNo) => engineParts[partNo]);
    };

    const partsData = getPartsData();

    if (partsData.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 p-3 md:p-6">
                <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                    <Header
                        title="Comparison Results"
                        subtitle="No valid parts found for comparison"
                        showBackButton
                        onBackClick={handleBackToList}
                        onRefreshClick={handleRefresh}
                    />
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardContent className="p-6">
                            <p className="text-white text-center">
                                No parts data available for the selected parts:{" "}
                                {selectedParts.join(", ")}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                <Header
                    title="Engine Parts Comparison"
                    subtitle={`Comparing ${partsData.length} selected parts - Cost analysis and trend detection`}
                    showBackButton
                    onBackClick={handleBackToList}
                    onRefreshClick={handleRefresh}
                />

                {/* Parts Overview */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Selected Parts Overview ({partsData.length} parts)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {partsData.map((part) => (
                                <div
                                    key={part.partNo}
                                    className="bg-gray-700 border border-gray-600 p-3 rounded-none"
                                >
                                    <h4 className="text-white font-semibold">
                                        {part.partNo}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge
                                            variant="outline"
                                            className="text-xs rounded-none text-blue-300 border-blue-300"
                                        >
                                            {part.model}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className="text-xs rounded-none text-green-300 border-green-300"
                                        >
                                            {part.destination}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Cost Breakdown by Category */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* NON LVA Section */}
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">
                                NON LVA Costs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {partsData.map((part) => (
                                    <div
                                        key={`${part.partNo}-nonlva`}
                                        className="bg-gray-700 p-3 rounded-none"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-medium">
                                                {part.partNo}
                                            </span>
                                            {getChangeBadge(
                                                part.costs.nonLVA.total
                                                    .percentageChange
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-400 mt-1">
                                            {formatCurrency(
                                                part.costs.nonLVA.total
                                                    .currentYear
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* LVA Section */}
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">
                                LVA Costs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {partsData.map((part) => (
                                    <div
                                        key={`${part.partNo}-lva`}
                                        className="bg-gray-700 p-3 rounded-none"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-medium">
                                                {part.partNo}
                                            </span>
                                            {getChangeBadge(
                                                part.costs.lva.total
                                                    .percentageChange
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-400 mt-1">
                                            {formatCurrency(
                                                part.costs.lva.total.currentYear
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Processing Cost Section */}
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">
                                Processing Costs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {partsData.map((part) => (
                                    <div
                                        key={`${part.partNo}-processing`}
                                        className="bg-gray-700 p-3 rounded-none"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-medium">
                                                {part.partNo}
                                            </span>
                                            {getChangeBadge(
                                                part.costs.processingCost.total
                                                    .percentageChange
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-400 mt-1">
                                            {formatCurrency(
                                                part.costs.processingCost.total
                                                    .currentYear
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
