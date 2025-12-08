"use client";

import { use, useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Minus, RefreshCw, Calendar, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface FOBComparisonResultsProps {
    params: Promise<{
        part1: string;
        part2: string;
    }>;
}

// Mock FOB data structure - in real app this would come from your data source
const generateFOBData = (partNo: string, period: string) => {
    // Generate mock FOB data based on part number and period
    const baseValue = parseInt(partNo.replace(/[^0-9]/g, '')) || 1000;
    const periodMultiplier = period.includes('Feb') ? 1.0 : 1.05; // August slightly higher
    const yearMultiplier = parseInt(period.split('-')[0]) - 2023; // Year adjustment
    
    return {
        fobPriceUSD: (baseValue * 0.45 * periodMultiplier * (1 + yearMultiplier * 0.02)),
        fobPriceRP: (baseValue * 0.45 * periodMultiplier * (1 + yearMultiplier * 0.02) * 15000),
        totalExportCost: (baseValue * 0.42 * periodMultiplier * (1 + yearMultiplier * 0.02)),
        totalExFactoryPrice: (baseValue * 0.40 * periodMultiplier * (1 + yearMultiplier * 0.02)),
        tmminEGOP: (baseValue * 0.38 * periodMultiplier * (1 + yearMultiplier * 0.02) * 0.035),
        sellingGeneralAdmin: (baseValue * 0.38 * periodMultiplier * (1 + yearMultiplier * 0.02) * 0.0137),
        tmminGP: (baseValue * 0.35 * periodMultiplier * (1 + yearMultiplier * 0.02)),
        totalMFGCostWithoutID: (baseValue * 0.32 * periodMultiplier * (1 + yearMultiplier * 0.02)),
        totalMFGCostWithID: (baseValue * 0.34 * periodMultiplier * (1 + yearMultiplier * 0.02)),
        royalty: (baseValue * 0.30 * periodMultiplier * (1 + yearMultiplier * 0.02) * 0.06),
        lva: (baseValue * 0.28 * periodMultiplier * (1 + yearMultiplier * 0.02))
    };
};

export default function FOBComparisonResults({
    params,
}: FOBComparisonResultsProps) {
    const router = useRouter();

    // Unwrap the params Promise using React.use()
    const resolvedParams = use(params);

    // Decode the part numbers
    const part1 = decodeURIComponent(resolvedParams.part1);
    const part2 = decodeURIComponent(resolvedParams.part2);

    // Generate period options (years 2023-2026, Feb and Aug for each)
    const generatePeriodOptions = () => {
        const periods = [];
        for (let year = 2023; year <= 2026; year++) {
            periods.push(`${year}-Feb`, `${year}-Aug`);
        }
        return periods;
    };

    const availablePeriods = generatePeriodOptions();
    
    // Period selection state
    const [selectedPeriod1, setSelectedPeriod1] = useState('2024-Feb');
    const [selectedPeriod2, setSelectedPeriod2] = useState('2024-Aug');

    const handleBackToSelection = () => {
        router.push("/costmovement/fob");
    };

    const handleRefresh = () => {
        router.refresh();
    };

    const handleSwitchParts = () => {
        // Switch parts by navigating to swapped URL
        router.push(`/costmovement/fob/${encodeURIComponent(part2)}/vs/${encodeURIComponent(part1)}`);
    };

    // Get FOB data for both parts
    const part1FOBData = generateFOBData(part1, selectedPeriod1);
    const part2FOBData = generateFOBData(part2, selectedPeriod2);

    // Calculate relative differences
    const calculateRelativeDifference = (value1: number, value2: number) => {
        const difference = value1 - value2;
        const percentageDiff = value2 !== 0 ? ((value1 - value2) / value2) * 100 : 0;

        return {
            absolute: difference,
            percentage: percentageDiff,
            isHigher: difference > 0,
            isEqual: Math.abs(difference) < 0.01,
        };
    };

    const getDifferenceIcon = (diff: ReturnType<typeof calculateRelativeDifference>) => {
        if (diff.isEqual) return <Minus className="h-4 w-4 text-gray-500" />;
        return diff.isHigher ? (
            <TrendingUp className="h-4 w-4 text-red-600" />
        ) : (
            <TrendingDown className="h-4 w-4 text-green-600" />
        );
    };

    const getDifferenceBadge = (diff: ReturnType<typeof calculateRelativeDifference>) => {
        if (diff.isEqual) {
            return (
                <Badge variant="outline" className="rounded-md text-gray-600 border-gray-300">
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
            <Badge variant={variant} className="rounded-md">
                {diff.isHigher ? "+" : ""}
                {diff.percentage.toFixed(2)}%
            </Badge>
        );
    };

    // FOB comparison row component
    const FOBComparisonRow = ({
        componentName,
        value1,
        value2,
        isTotal = false,
        isGrandTotal = false,
    }: {
        componentName: string;
        value1: number;
        value2: number;
        isTotal?: boolean;
        isGrandTotal?: boolean;
    }) => {
        const diff = calculateRelativeDifference(value1, value2);

        const cellClass = isGrandTotal
            ? "font-bold text-gray-900"
            : isTotal
            ? "font-semibold text-gray-900"
            : "text-gray-700";

        const rowClass = isGrandTotal
            ? "bg-gray-100 border-t-4 border-gray-300"
            : isTotal
            ? "border-b-2 border-gray-300"
            : "border-gray-200";

        return (
            <TableRow
                className={`${rowClass} hover:bg-gray-50 border-gray-200`}
            >
                <TableCell
                    className={`${cellClass} sticky left-0 bg-white min-w-[200px]`}
                >
                    {componentName}
                </TableCell>
                <TableCell className="text-center">
                    <div className="space-y-1">
                        <div className={`text-sm font-semibold ${cellClass}`}>
                            {formatCurrency(value1)}
                        </div>
                        <div className="text-xs text-blue-600">Part 1</div>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="space-y-1">
                        <div className={`text-sm font-semibold ${cellClass}`}>
                            {formatCurrency(value2)}
                        </div>
                        <div className="text-xs text-purple-600">Part 2</div>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1">
                            {getDifferenceIcon(diff)}
                            <span
                                className={`text-sm font-semibold ${
                                    diff.isEqual
                                        ? "text-gray-500"
                                        : diff.isHigher
                                        ? "text-red-600"
                                        : "text-green-600"
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
        <div className="min-h-screen bg-gray-50 p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <Header
                    title="FOB Cost Movement Analysis"
                    subtitle={`Comparing ${part1} vs ${part2} - FOB pricing analysis across submission periods`}
                    showBackButton
                    onBackClick={handleBackToSelection}
                    onRefreshClick={handleRefresh}
                />

                {/* Switch Parts Button */}
                <div className="flex justify-center">
                    <Button
                        onClick={handleSwitchParts}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md border-2 border-gray-300"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Switch Part 1 ↔ Part 2
                    </Button>
                </div>

                {/* Period Selection Controls */}
                <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-gray-700" />
                            <CardTitle className="text-gray-900 text-lg">
                                Period Selection
                            </CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">
                            Select submission periods for FOB cost comparison (2x per year: February & August)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-blue-700">
                                    Part 1 Period ({part1})
                                </label>
                                <Select value={selectedPeriod1} onValueChange={setSelectedPeriod1}>
                                    <SelectTrigger className="bg-white border-2 border-gray-300 text-gray-900 rounded-md">
                                        <SelectValue placeholder="Select period for Part 1" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-300">
                                        {availablePeriods.map((period) => (
                                            <SelectItem key={period} value={period} className="text-gray-900 hover:bg-blue-50">
                                                {period}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-purple-700">
                                    Part 2 Period ({part2})
                                </label>
                                <Select value={selectedPeriod2} onValueChange={setSelectedPeriod2}>
                                    <SelectTrigger className="bg-white border-2 border-gray-300 text-gray-900 rounded-md">
                                        <SelectValue placeholder="Select period for Part 2" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-300">
                                        {availablePeriods.map((period) => (
                                            <SelectItem key={period} value={period} className="text-gray-900 hover:bg-purple-50">
                                                {period}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* FOB Comparison Table */}
                <Card className="rounded-lg border-2 bg-white border-orange-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-orange-600" />
                            FOB Cost Component Analysis
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Detailed comparison of FOB pricing components across selected periods
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gray-200 bg-gray-50">
                                        <TableHead className="text-gray-900 font-semibold sticky left-0 bg-gray-50 min-w-[200px]">
                                            FOB Component
                                        </TableHead>
                                        <TableHead className="text-center text-blue-700 font-semibold">
                                            <div className="space-y-1">
                                                <div>{part1}</div>
                                                <div className="text-xs font-normal text-gray-600">
                                                    {selectedPeriod1}
                                                </div>
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center text-purple-700 font-semibold">
                                            <div className="space-y-1">
                                                <div>{part2}</div>
                                                <div className="text-xs font-normal text-gray-600">
                                                    {selectedPeriod2}
                                                </div>
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center text-gray-900 font-semibold">
                                            Difference (Part 1 - Part 2)
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* FOB Components */}
                                    <FOBComparisonRow
                                        componentName="FOB Price (US$)"
                                        value1={part1FOBData.fobPriceUSD}
                                        value2={part2FOBData.fobPriceUSD}
                                    />
                                    <FOBComparisonRow
                                        componentName="FOB Price (RP)"
                                        value1={part1FOBData.fobPriceRP}
                                        value2={part2FOBData.fobPriceRP}
                                    />
                                    <FOBComparisonRow
                                        componentName="Total Export Cost w/o interest"
                                        value1={part1FOBData.totalExportCost}
                                        value2={part2FOBData.totalExportCost}
                                        isTotal
                                    />
                                    <FOBComparisonRow
                                        componentName="Total EX-Factory Price"
                                        value1={part1FOBData.totalExFactoryPrice}
                                        value2={part2FOBData.totalExFactoryPrice}
                                        isTotal
                                    />
                                    <FOBComparisonRow
                                        componentName="TMMIN E/G OP"
                                        value1={part1FOBData.tmminEGOP}
                                        value2={part2FOBData.tmminEGOP}
                                    />
                                    <FOBComparisonRow
                                        componentName="Selling & General Admin"
                                        value1={part1FOBData.sellingGeneralAdmin}
                                        value2={part2FOBData.sellingGeneralAdmin}
                                    />
                                    <FOBComparisonRow
                                        componentName="TMMIN GP w/o interest"
                                        value1={part1FOBData.tmminGP}
                                        value2={part2FOBData.tmminGP}
                                        isTotal
                                    />
                                    <FOBComparisonRow
                                        componentName="Total MFG Cost (w/o: Inv. Intr & ID)"
                                        value1={part1FOBData.totalMFGCostWithoutID}
                                        value2={part2FOBData.totalMFGCostWithoutID}
                                        isTotal
                                    />
                                    <FOBComparisonRow
                                        componentName="Total MFG Cost (w/ ID)"
                                        value1={part1FOBData.totalMFGCostWithID}
                                        value2={part2FOBData.totalMFGCostWithID}
                                        isTotal
                                    />
                                    <FOBComparisonRow
                                        componentName="Royalty"
                                        value1={part1FOBData.royalty}
                                        value2={part2FOBData.royalty}
                                    />
                                    <FOBComparisonRow
                                        componentName="LVA"
                                        value1={part1FOBData.lva}
                                        value2={part2FOBData.lva}
                                    />
                                    
                                    {/* Grand Total */}
                                    <FOBComparisonRow
                                        componentName="TOTAL FOB PRICE (US$)"
                                        value1={part1FOBData.fobPriceUSD}
                                        value2={part2FOBData.fobPriceUSD}
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
