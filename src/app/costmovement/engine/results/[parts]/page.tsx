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
                                    Comparison Period
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

                {/* Detailed Cost Component Breakdown */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Detailed Cost Component Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* NON LVA Components */}
                            <div>
                                <h4 className="text-white font-semibold mb-4 text-lg border-b border-gray-600 pb-2">
                                    NON LVA Components
                                </h4>

                                {/* JSP Component */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        JSP
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-jsp`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .nonLVA.jsp
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .nonLVA.jsp
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .nonLVA
                                                                        .jsp
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .nonLVA.jsp
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .nonLVA
                                                                        .jsp
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .nonLVA.jsp
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* MSP Component */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        MSP
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-msp`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .nonLVA.msp
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .nonLVA.msp
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .nonLVA
                                                                        .msp
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .nonLVA.msp
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .nonLVA
                                                                        .msp
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .nonLVA.msp
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* NON LVA Total */}
                                <div className="bg-blue-900/20 p-3 rounded-none">
                                    <h5 className="text-white font-semibold mb-2 text-md">
                                        NON LVA Total
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-nonlva-total`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-semibold">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .nonLVA
                                                                    .total
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .nonLVA
                                                                    .total
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .nonLVA
                                                                        .total
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .nonLVA
                                                                    .total
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .nonLVA
                                                                        .total
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .nonLVA
                                                                    .total
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            {/* LVA Components */}
                            <div>
                                <h4 className="text-white font-semibold mb-4 text-lg border-b border-gray-600 pb-2">
                                    LVA Components
                                </h4>

                                {/* Local OH Component */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        Local OH (Overhead)
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-localoh`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs.lva
                                                                    .localOH
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs.lva
                                                                    .localOH
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .lva
                                                                        .localOH
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs.lva
                                                                    .localOH
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .lva
                                                                        .localOH
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs.lva
                                                                    .localOH
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* Raw Material Component */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        Raw Material
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-rawmaterial`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs.lva
                                                                    .rawMaterial
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs.lva
                                                                    .rawMaterial
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .lva
                                                                        .rawMaterial
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs.lva
                                                                    .rawMaterial
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .lva
                                                                        .rawMaterial
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs.lva
                                                                    .rawMaterial
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* LVA Total */}
                                <div className="bg-green-900/20 p-3 rounded-none">
                                    <h5 className="text-white font-semibold mb-2 text-md">
                                        LVA Total
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-lva-total`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-semibold">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            {formatCurrency(
                                                                part.costs.lva
                                                                    .total
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            {formatCurrency(
                                                                part.costs.lva
                                                                    .total
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .lva
                                                                        .total
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs.lva
                                                                    .total
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .lva
                                                                        .total
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs.lva
                                                                    .total
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            {/* Tooling Outhouse */}
                            <div>
                                <h4 className="text-white font-semibold mb-4 text-lg border-b border-gray-600 pb-2">
                                    Tooling Outhouse
                                </h4>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-gray-600">
                                                <TableHead className="text-gray-300">
                                                    Part Number
                                                </TableHead>
                                                <TableHead className="text-gray-300 text-right">
                                                    Current Year
                                                </TableHead>
                                                <TableHead className="text-gray-300 text-right">
                                                    Last Year
                                                </TableHead>
                                                <TableHead className="text-gray-300 text-right">
                                                    Difference
                                                </TableHead>
                                                <TableHead className="text-gray-300 text-center">
                                                    Change %
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {partsData.map((part) => (
                                                <TableRow
                                                    key={`${part.partNo}-tooling`}
                                                    className="border-gray-600"
                                                >
                                                    <TableCell className="text-white font-medium">
                                                        {part.partNo}
                                                    </TableCell>
                                                    <TableCell className="text-white text-right">
                                                        {formatCurrency(
                                                            part.costs
                                                                .toolingOuthouse
                                                                .currentYear
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-white text-right">
                                                        {formatCurrency(
                                                            part.costs
                                                                .toolingOuthouse
                                                                .lastYear
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-white text-right">
                                                        <span
                                                            className={
                                                                part.costs
                                                                    .toolingOuthouse
                                                                    .difference >=
                                                                0
                                                                    ? "text-red-400"
                                                                    : "text-green-400"
                                                            }
                                                        >
                                                            {part.costs
                                                                .toolingOuthouse
                                                                .difference >= 0
                                                                ? "+"
                                                                : ""}
                                                            {formatCurrency(
                                                                part.costs
                                                                    .toolingOuthouse
                                                                    .difference
                                                            )}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {getChangeBadge(
                                                            part.costs
                                                                .toolingOuthouse
                                                                .percentageChange
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Total Purchase Cost */}
                            <div>
                                <h4 className="text-white font-semibold mb-4 text-lg border-b border-gray-600 pb-2">
                                    Total Purchase Cost
                                </h4>
                                <div className="bg-pink-900/20 p-3 rounded-none">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-totalpurchase`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-semibold">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .totalPurchaseCost
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .totalPurchaseCost
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .totalPurchaseCost
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .totalPurchaseCost
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .totalPurchaseCost
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .totalPurchaseCost
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            {/* Processing Cost Components */}
                            <div>
                                <h4 className="text-white font-semibold mb-4 text-lg border-b border-gray-600 pb-2">
                                    Processing Cost Components
                                </h4>

                                {/* Labor */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        Labor
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-labor`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .labor
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .labor
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .processingCost
                                                                        .labor
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .processingCost
                                                                    .labor
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .processingCost
                                                                        .labor
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .processingCost
                                                                    .labor
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* FOH Fixed */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        FOH Fixed
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-fohfixed`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .fohFixed
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .fohFixed
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .processingCost
                                                                        .fohFixed
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .processingCost
                                                                    .fohFixed
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .processingCost
                                                                        .fohFixed
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .processingCost
                                                                    .fohFixed
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* FOH Variable */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        FOH Variable
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-fohvar`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .fohVar
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .fohVar
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .processingCost
                                                                        .fohVar
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .processingCost
                                                                    .fohVar
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .processingCost
                                                                        .fohVar
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .processingCost
                                                                    .fohVar
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* Unfinish Depreciation */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        Unfinish Depreciation
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-unfinishdepre`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .unfinishDepre
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .unfinishDepre
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .processingCost
                                                                        .unfinishDepre
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .processingCost
                                                                    .unfinishDepre
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .processingCost
                                                                        .unfinishDepre
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .processingCost
                                                                    .unfinishDepre
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* Exclusive Depreciation */}
                                <div className="mb-4">
                                    <h5 className="text-white font-medium mb-2 text-md">
                                        Exclusive Depreciation
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-exclusivedepre`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-medium">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .exclusiveDepre
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .exclusiveDepre
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .processingCost
                                                                        .exclusiveDepre
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .processingCost
                                                                    .exclusiveDepre
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .processingCost
                                                                        .exclusiveDepre
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .processingCost
                                                                    .exclusiveDepre
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                {/* Processing Cost Total */}
                                <div className="bg-purple-900/20 p-3 rounded-none">
                                    <h5 className="text-white font-semibold mb-2 text-md">
                                        Processing Cost Total
                                    </h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-gray-600">
                                                    <TableHead className="text-gray-300">
                                                        Part Number
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Current Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Last Year
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-right">
                                                        Difference
                                                    </TableHead>
                                                    <TableHead className="text-gray-300 text-center">
                                                        Change %
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {partsData.map((part) => (
                                                    <TableRow
                                                        key={`${part.partNo}-processing-total`}
                                                        className="border-gray-600"
                                                    >
                                                        <TableCell className="text-white font-semibold">
                                                            {part.partNo}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .total
                                                                    .currentYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            {formatCurrency(
                                                                part.costs
                                                                    .processingCost
                                                                    .total
                                                                    .lastYear
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white text-right font-semibold">
                                                            <span
                                                                className={
                                                                    part.costs
                                                                        .processingCost
                                                                        .total
                                                                        .difference >=
                                                                    0
                                                                        ? "text-red-400"
                                                                        : "text-green-400"
                                                                }
                                                            >
                                                                {part.costs
                                                                    .processingCost
                                                                    .total
                                                                    .difference >=
                                                                0
                                                                    ? "+"
                                                                    : ""}
                                                                {formatCurrency(
                                                                    part.costs
                                                                        .processingCost
                                                                        .total
                                                                        .difference
                                                                )}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getChangeBadge(
                                                                part.costs
                                                                    .processingCost
                                                                    .total
                                                                    .percentageChange
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
