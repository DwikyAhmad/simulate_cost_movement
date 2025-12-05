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

                {/* Period Information */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Cost Movement Analysis - Multiple Parts Comparison
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-400">
                                    Current Period
                                </p>
                                <p className="text-lg font-semibold text-white">
                                    August 2025
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">
                                    Previous Period
                                </p>
                                <p className="text-lg font-semibold text-white">
                                    August 2024
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">
                                    Parts Selected
                                </p>
                                <p className="text-lg font-semibold text-white">
                                    {partsData.length} parts
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {partsData.map((part) => (
                                <div
                                    key={part.partNo}
                                    className="flex items-center gap-2"
                                >
                                    <Badge
                                        variant="outline"
                                        className="rounded-none text-white border-gray-500 bg-gray-700"
                                    >
                                        {part.partNo}
                                    </Badge>
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
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Horizontal Comparison Table */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Cost Component Comparison
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <div className="min-w-fit">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-gray-600">
                                            <TableHead className="text-gray-300 min-w-[200px] sticky left-0 bg-gray-800 z-10">
                                                Cost Component
                                            </TableHead>
                                            {partsData.map((part) => (
                                                <TableHead
                                                    key={part.partNo}
                                                    className="text-center text-gray-300 min-w-[200px]"
                                                >
                                                    <div>
                                                        <div className="font-semibold">
                                                            {part.partNo}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            Current / Change / %
                                                        </div>
                                                    </div>
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {/* NON LVA Section */}
                                        <TableRow className="bg-blue-900/30 border-gray-600">
                                            <TableCell className="text-white font-semibold sticky left-0 bg-blue-900/30 z-10">
                                                NON LVA
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-nonlva`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white font-semibold">
                                                            {formatCurrency(
                                                                part.costs.nonLVA.total.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.nonLVA.total.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.nonLVA.total.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.nonLVA.total.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.nonLVA.total.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* JSP */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                JSP
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-jsp`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.nonLVA.jsp.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.nonLVA.jsp.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.nonLVA.jsp.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.nonLVA.jsp.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.nonLVA.jsp.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* MSP */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                MSP
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-msp`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.nonLVA.msp.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.nonLVA.msp.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.nonLVA.msp.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.nonLVA.msp.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.nonLVA.msp.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* LVA Section */}
                                        <TableRow className="bg-green-900/30 border-gray-600">
                                            <TableCell className="text-white font-semibold sticky left-0 bg-green-900/30 z-10">
                                                LVA
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-lva`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white font-semibold">
                                                            {formatCurrency(
                                                                part.costs.lva.total.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.lva.total.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.lva.total.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.lva.total.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.lva.total.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Local OH */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                Local OH
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-localoh`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.lva.localOH.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.lva.localOH.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.lva.localOH.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.lva.localOH.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.lva.localOH.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Raw Material */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                Raw Material
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-rawmaterial`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.lva.rawMaterial.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.lva.rawMaterial.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.lva.rawMaterial.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.lva.rawMaterial.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.lva.rawMaterial.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Tooling Outhouse */}
                                        <TableRow className="bg-yellow-900/30 border-gray-600">
                                            <TableCell className="text-white font-semibold sticky left-0 bg-yellow-900/30 z-10">
                                                Tooling Outhouse
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-tooling`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.toolingOuthouse.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.toolingOuthouse.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.toolingOuthouse.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.toolingOuthouse.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.toolingOuthouse.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Total Purchase Cost */}
                                        <TableRow className="bg-pink-900/30 border-gray-600">
                                            <TableCell className="text-white font-semibold sticky left-0 bg-pink-900/30 z-10">
                                                Total Purchase Cost
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-totalpurchase`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white font-semibold">
                                                            {formatCurrency(
                                                                part.costs.totalPurchaseCost.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.totalPurchaseCost.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.totalPurchaseCost.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.totalPurchaseCost.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.totalPurchaseCost.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Processing Cost Section */}
                                        <TableRow className="bg-purple-900/30 border-gray-600">
                                            <TableCell className="text-white font-semibold sticky left-0 bg-purple-900/30 z-10">
                                                Processing Cost
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-processing`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white font-semibold">
                                                            {formatCurrency(
                                                                part.costs.processingCost.total.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.processingCost.total.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.processingCost.total.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.processingCost.total.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.processingCost.total.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Labor */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                Labor
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-labor`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.processingCost.labor.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.processingCost.labor.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.processingCost.labor.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.processingCost.labor.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.processingCost.labor.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* FOH Fixed */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                FOH Fixed
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-fohfixed`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.processingCost.fohFixed.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.processingCost.fohFixed.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.processingCost.fohFixed.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.processingCost.fohFixed.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.processingCost.fohFixed.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* FOH Variable */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                FOH Variable
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-fohvar`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.processingCost.fohVar.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.processingCost.fohVar.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.processingCost.fohVar.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.processingCost.fohVar.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.processingCost.fohVar.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Unfinish Depreciation */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                Unfinish Depreciation
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-unfinishdepre`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.processingCost.unfinishDepre.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.processingCost.unfinishDepre.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.processingCost.unfinishDepre.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.processingCost.unfinishDepre.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.processingCost.unfinishDepre.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Exclusive Depreciation */}
                                        <TableRow className="border-gray-600">
                                            <TableCell className="text-white pl-6 sticky left-0 bg-gray-800 z-10">
                                                Exclusive Depreciation
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-exclusivedepre`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white">
                                                            {formatCurrency(
                                                                part.costs.processingCost.exclusiveDepre.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm ${
                                                            part.costs.processingCost.exclusiveDepre.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.processingCost.exclusiveDepre.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.processingCost.exclusiveDepre.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.processingCost.exclusiveDepre.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {/* Total Cost */}
                                        <TableRow className="bg-gray-700 border-t-4 border-gray-500">
                                            <TableCell className="text-white font-bold text-lg sticky left-0 bg-gray-700 z-10">
                                                Total Cost
                                            </TableCell>
                                            {partsData.map((part) => (
                                                <TableCell
                                                    key={`${part.partNo}-total`}
                                                    className="text-center"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-white font-bold text-lg">
                                                            {formatCurrency(
                                                                part.costs.totalCost.currentYear
                                                            )}
                                                        </div>
                                                        <div className={`text-sm font-semibold ${
                                                            part.costs.totalCost.difference >= 0
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                        }`}>
                                                            {part.costs.totalCost.difference >= 0 ? "+" : ""}
                                                            {formatCurrency(part.costs.totalCost.difference)}
                                                        </div>
                                                        <div>
                                                            {getChangeBadge(part.costs.totalCost.percentageChange)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
