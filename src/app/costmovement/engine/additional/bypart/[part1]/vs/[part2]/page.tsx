"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { engineParts } from "@/data/sampleData";
import { formatCurrency } from "@/lib/utils";
import { CostComponent } from "@/types/cost";

interface ByPartComparisonResultsProps {
    params: Promise<{
        part1: string;
        part2: string;
    }>;
}

export default function ByPartComparisonResults({
    params,
}: ByPartComparisonResultsProps) {
    const router = useRouter();

    // Unwrap the params Promise using React.use()
    const resolvedParams = use(params);

    // Decode the part numbers
    const part1 = decodeURIComponent(resolvedParams.part1);
    const part2 = decodeURIComponent(resolvedParams.part2);

    const handleBackToSelection = () => {
        router.push("/costmovement/engine/additional/bypart");
    };

    const handleRefresh = () => {
        router.refresh();
    };

    const handleSwitchParts = () => {
        // Switch parts by navigating to swapped URL
        router.push(`/costmovement/engine/additional/bypart/${encodeURIComponent(part2)}/vs/${encodeURIComponent(part1)}`);
    };

    // Get part data
    const part1Data = engineParts[part1];
    const part2Data = engineParts[part2];

    if (!part1Data || !part2Data) {
        return (
            <div className="min-h-screen bg-gray-900 p-3 md:p-6">
                <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                    <Header
                        title="Part Not Found"
                        subtitle="One or both parts could not be found"
                        showBackButton
                        onBackClick={handleBackToSelection}
                        onRefreshClick={handleRefresh}
                    />
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardContent className="py-12 text-center">
                            <div className="text-gray-400">
                                Parts {part1} or {part2} not found in the
                                database
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Calculate relative differences
    const calculateRelativeDifference = (
        component1: CostComponent,
        component2: CostComponent
    ) => {
        const difference = component1.currentYear - component2.currentYear;
        const percentageDiff =
            component2.currentYear !== 0
                ? ((component1.currentYear - component2.currentYear) /
                      component2.currentYear) *
                  100
                : 0;

        return {
            absolute: difference,
            percentage: percentageDiff,
            isHigher: difference > 0,
            isEqual: Math.abs(difference) < 0.01,
        };
    };

    const getDifferenceIcon = (
        diff: ReturnType<typeof calculateRelativeDifference>
    ) => {
        if (diff.isEqual) return <Minus className="h-4 w-4 text-gray-400" />;
        return diff.isHigher ? (
            <TrendingUp className="h-4 w-4 text-red-400" />
        ) : (
            <TrendingDown className="h-4 w-4 text-green-400" />
        );
    };

    const getDifferenceBadge = (
        diff: ReturnType<typeof calculateRelativeDifference>
    ) => {
        if (diff.isEqual) {
            return (
                <Badge variant="outline" className="rounded-none text-gray-400">
                    Same
                </Badge>
            );
        }

        const variant =
            Math.abs(diff.percentage) >= 10
                ? "destructive"
                : Math.abs(diff.percentage) >= 5
                ? "secondary"
                : "default";

        return (
            <Badge variant={variant} className="rounded-none">
                {diff.isHigher ? "+" : ""}
                {diff.percentage.toFixed(2)}%
            </Badge>
        );
    };

    const ComparisonRow = ({
        componentName,
        component1,
        component2,
        isTotal = false,
        isGrandTotal = false,
    }: {
        componentName: string;
        component1: CostComponent;
        component2: CostComponent;
        isTotal?: boolean;
        isGrandTotal?: boolean;
    }) => {
        const diff = calculateRelativeDifference(component1, component2);

        const cellClass = isGrandTotal
            ? "font-bold text-white"
            : isTotal
            ? "font-semibold text-white"
            : "text-gray-300";

        const rowClass = isGrandTotal
            ? "bg-gray-700 border-t-4 border-gray-500"
            : isTotal
            ? "border-b-2 border-gray-600"
            : "border-gray-700";

        return (
            <TableRow
                className={`${rowClass} hover:bg-gray-750 border-gray-600`}
            >
                <TableCell
                    className={`${cellClass} sticky left-0 bg-gray-800 min-w-[200px]`}
                >
                    {componentName}
                </TableCell>
                <TableCell className="text-center">
                    <div className="space-y-1">
                        <div className={`text-sm font-semibold ${cellClass}`}>
                            {formatCurrency(component1.currentYear)}
                        </div>
                        <div className="text-xs text-blue-400">Part 1</div>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="space-y-1">
                        <div className={`text-sm font-semibold ${cellClass}`}>
                            {formatCurrency(component2.currentYear)}
                        </div>
                        <div className="text-xs text-purple-400">Part 2</div>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                            {getDifferenceIcon(diff)}
                            <span
                                className={`text-sm font-semibold ${
                                    diff.isEqual
                                        ? "text-gray-400"
                                        : diff.isHigher
                                        ? "text-red-400"
                                        : "text-green-400"
                                }`}
                            >
                                {diff.isHigher ? "+" : ""}
                                {formatCurrency(diff.absolute)}
                            </span>
                        </div>
                        <div>{getDifferenceBadge(diff)}</div>
                    </div>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <Header
                    title="1v1 Part Comparison Results"
                    subtitle={`Comparing ${part1} vs ${part2} - Direct cost analysis and relative pricing differences`}
                    showBackButton
                    onBackClick={handleBackToSelection}
                    onRefreshClick={handleRefresh}
                />

                {/* Switch Parts Button */}
                <div className="flex justify-center">
                    <Button
                        onClick={handleSwitchParts}
                        className="bg-gray-600 hover:bg-gray-500 text-white rounded-none border-2 border-gray-500"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Switch Part 1 ↔ Part 2
                    </Button>
                </div>

                {/* Detailed Comparison Table */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Detailed Cost Component Comparison
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                            Side-by-side comparison showing relative differences
                            between parts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gray-600">
                                        <TableHead className="text-gray-300 sticky left-0 bg-gray-800 min-w-[200px]">
                                            Cost Component
                                        </TableHead>
                                        <TableHead className="text-center text-blue-300">
                                            {part1}
                                        </TableHead>
                                        <TableHead className="text-center text-purple-300">
                                            {part2}
                                        </TableHead>
                                        <TableHead className="text-center text-gray-300">
                                            Difference (Part 1 - Part 2)
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Non-LVA Components */}
                                    <ComparisonRow
                                        componentName="JSP (Non-LVA)"
                                        component1={part1Data.costs.nonLVA.jsp}
                                        component2={part2Data.costs.nonLVA.jsp}
                                    />
                                    <ComparisonRow
                                        componentName="MSP (Non-LVA)"
                                        component1={part1Data.costs.nonLVA.msp}
                                        component2={part2Data.costs.nonLVA.msp}
                                    />
                                    <ComparisonRow
                                        componentName="Non-LVA Total"
                                        component1={
                                            part1Data.costs.nonLVA.total
                                        }
                                        component2={
                                            part2Data.costs.nonLVA.total
                                        }
                                        isTotal
                                    />

                                    {/* LVA Components */}
                                    <ComparisonRow
                                        componentName="Local OH (LVA)"
                                        component1={part1Data.costs.lva.localOH}
                                        component2={part2Data.costs.lva.localOH}
                                    />
                                    <ComparisonRow
                                        componentName="Raw Material (LVA)"
                                        component1={
                                            part1Data.costs.lva.rawMaterial
                                        }
                                        component2={
                                            part2Data.costs.lva.rawMaterial
                                        }
                                    />
                                    <ComparisonRow
                                        componentName="LVA Total"
                                        component1={part1Data.costs.lva.total}
                                        component2={part2Data.costs.lva.total}
                                        isTotal
                                    />

                                    {/* Other Costs */}
                                    <ComparisonRow
                                        componentName="Tooling Outhouse"
                                        component1={
                                            part1Data.costs.toolingOuthouse
                                        }
                                        component2={
                                            part2Data.costs.toolingOuthouse
                                        }
                                    />
                                    <ComparisonRow
                                        componentName="Total Purchase Cost"
                                        component1={
                                            part1Data.costs.totalPurchaseCost
                                        }
                                        component2={
                                            part2Data.costs.totalPurchaseCost
                                        }
                                        isTotal
                                    />

                                    {/* Processing Costs */}
                                    <ComparisonRow
                                        componentName="Labor"
                                        component1={
                                            part1Data.costs.processingCost.labor
                                        }
                                        component2={
                                            part2Data.costs.processingCost.labor
                                        }
                                    />
                                    <ComparisonRow
                                        componentName="FOH Fixed"
                                        component1={
                                            part1Data.costs.processingCost
                                                .fohFixed
                                        }
                                        component2={
                                            part2Data.costs.processingCost
                                                .fohFixed
                                        }
                                    />
                                    <ComparisonRow
                                        componentName="FOH Variable"
                                        component1={
                                            part1Data.costs.processingCost
                                                .fohVar
                                        }
                                        component2={
                                            part2Data.costs.processingCost
                                                .fohVar
                                        }
                                    />
                                    <ComparisonRow
                                        componentName="Unfinish Depreciation"
                                        component1={
                                            part1Data.costs.processingCost
                                                .unfinishDepre
                                        }
                                        component2={
                                            part2Data.costs.processingCost
                                                .unfinishDepre
                                        }
                                    />
                                    <ComparisonRow
                                        componentName="Exclusive Depreciation"
                                        component1={
                                            part1Data.costs.processingCost
                                                .exclusiveDepre
                                        }
                                        component2={
                                            part2Data.costs.processingCost
                                                .exclusiveDepre
                                        }
                                    />
                                    <ComparisonRow
                                        componentName="Processing Cost Total"
                                        component1={
                                            part1Data.costs.processingCost.total
                                        }
                                        component2={
                                            part2Data.costs.processingCost.total
                                        }
                                        isTotal
                                    />

                                    {/* Grand Total */}
                                    <ComparisonRow
                                        componentName="TOTAL COST"
                                        component1={part1Data.costs.totalCost}
                                        component2={part2Data.costs.totalCost}
                                        isGrandTotal
                                    />
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
