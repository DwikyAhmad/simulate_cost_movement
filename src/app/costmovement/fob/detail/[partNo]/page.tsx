"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { engineParts } from "@/data/sampleData";

interface FOBDetailPageProps {
    params: Promise<{
        partNo: string;
    }>;
}

// Generate period options (2023-2026, Feb and Aug)
const generatePeriodOptions = () => {
    const periods = [];
    for (let year = 2023; year <= 2026; year++) {
        periods.push(`${year}-Feb`, `${year}-Aug`);
    }
    return periods;
};

// Mock FOB data generator with cost breakdown structure (deterministic)
const generateFOBData = (partNo: string, period: string = "2024-Aug") => {
    const baseValue = parseInt(partNo.replace(/[^0-9]/g, '')) || 1000;
    const periodMultiplier = period.includes('Feb') ? 1.0 : 1.05;
    const yearMultiplier = parseInt(period.split('-')[0]) - 2023;
    
    // Create deterministic variance based on partNo and period
    const seed = (partNo + period).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const variance = ((seed % 1000) / 1000 - 0.5) * 0.3; // Range: -0.15 to 0.15
    
    const base = baseValue * periodMultiplier * (1 + yearMultiplier * 0.02);
    
    return {
        fobPriceUSD: base * 0.45 * (1 + variance * 0.1),
        fobPriceRP: base * 0.45 * (1 + variance * 0.1) * 15000,
        totalExportCost: base * 0.42 * (1 + variance * 0.1),
        totalExFactoryPrice: base * 0.40 * (1 + variance * 0.1),
        tmminEGOP: base * 0.38 * (1 + variance * 0.1) * 0.035,
        sellingGeneralAdmin: base * 0.38 * (1 + variance * 0.1) * 0.0137,
        tmminGP: base * 0.35 * (1 + variance * 0.1),
        totalMFGCostWithoutID: base * 0.32 * (1 + variance * 0.1),
        totalMFGCostWithID: base * 0.34 * (1 + variance * 0.1),
        royalty: base * 0.30 * (1 + variance * 0.1) * 0.06,
        lva: base * 0.28 * (1 + variance * 0.1)
    };
};

// Generate previous year data for comparison
const generatePreviousYearData = (partNo: string, currentPeriod: string) => {
    const [year, month] = currentPeriod.split('-');
    const prevYear = (parseInt(year) - 1).toString();
    const prevPeriod = `${prevYear}-${month}`;
    return generateFOBData(partNo, prevPeriod);
};

export default function FOBDetailPage({
    params,
}: FOBDetailPageProps) {
    const router = useRouter();
    const resolvedParams = use(params);
    const partNo = decodeURIComponent(resolvedParams.partNo);
    
    // State for period selection
    const [selectedPeriod, setSelectedPeriod] = useState("2024-Aug");

    const handleBackToList = () => {
        router.push("/costmovement/fob");
    };

    const handleRefresh = () => {
        router.refresh();
    };

    const partData = engineParts[partNo];
    const availablePeriods = generatePeriodOptions();

    if (!partData) {
        return (
            <div className="min-h-screen bg-gray-50 p-3 md:p-6">
                <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                    <Header
                        title="Part Not Found"
                        subtitle={`Part ${partNo} could not be found`}
                        showBackButton
                        onBackClick={handleBackToList}
                        onRefreshClick={handleRefresh}
                    />
                    <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                        <CardContent className="py-12 text-center">
                            <div className="text-gray-600">
                                Part {partNo} not found in the database
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Calculate current and previous year data
    const currentData = generateFOBData(partNo, selectedPeriod);
    const previousData = generatePreviousYearData(partNo, selectedPeriod);

    // Helper functions for calculations
    const calculateDifference = (current: number, previous: number) => current - previous;
    const calculatePercentage = (current: number, previous: number) => 
        previous !== 0 ? ((current - previous) / previous) * 100 : 0;

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatDollar = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Define cost components for the table
    const costComponents = [
        { label: "FOB Price (US$)", current: currentData.fobPriceUSD, previous: previousData.fobPriceUSD, isUSD: true },
        { label: "FOB Price (RP)", current: currentData.fobPriceRP, previous: previousData.fobPriceRP, isUSD: false },
        { label: "Total Export Cost w/o interest", current: currentData.totalExportCost, previous: previousData.totalExportCost, isUSD: false },
        { label: "Total EX-Factory Price", current: currentData.totalExFactoryPrice, previous: previousData.totalExFactoryPrice, isUSD: false },
        { label: "TMMIN E/G OP", current: currentData.tmminEGOP, previous: previousData.tmminEGOP, isUSD: false },
        { label: "Selling & General Admin", current: currentData.sellingGeneralAdmin, previous: previousData.sellingGeneralAdmin, isUSD: false },
        { label: "TMMIN GP w/o interest", current: currentData.tmminGP, previous: previousData.tmminGP, isUSD: false },
        { label: "Total MFG Cost (w/o: Inv. Intr & ID)", current: currentData.totalMFGCostWithoutID, previous: previousData.totalMFGCostWithoutID, isUSD: false },
        { label: "Total MFG Cost (w/ ID)", current: currentData.totalMFGCostWithID, previous: previousData.totalMFGCostWithID, isUSD: false },
        { label: "Royalty", current: currentData.royalty, previous: previousData.royalty, isUSD: false },
        { label: "LVA", current: currentData.lva, previous: previousData.lva, isUSD: false }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <Header
                    title="Cost Breakdown Analysis"
                    subtitle="Detailed cost comparison showing year-over-year changes for all cost components"
                    showBackButton
                    onBackClick={handleBackToList}
                    onRefreshClick={handleRefresh}
                />

                {/* Period Selection */}
                <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div className="text-gray-900">
                                <h3 className="font-semibold">Analysis Period - {partNo}</h3>
                                <p className="text-gray-600 text-sm">Select period to analyze cost changes</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                                    <SelectTrigger className="w-40 bg-white border-2 border-gray-300 text-gray-900 rounded-md">
                                        <SelectValue />
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
                        </div>
                    </CardContent>
                </Card>

                {/* Cost Breakdown Table */}
                <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-200 bg-gray-50">
                                    <TableHead className="text-gray-900 font-semibold">Cost Component</TableHead>
                                    <TableHead className="text-gray-900 font-semibold text-right">Current</TableHead>
                                    <TableHead className="text-gray-900 font-semibold text-right">{selectedPeriod}</TableHead>
                                    <TableHead className="text-gray-900 font-semibold text-right">Difference</TableHead>
                                    <TableHead className="text-gray-900 font-semibold text-right">Change %</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {costComponents.map((component, index) => {
                                    const difference = calculateDifference(component.current, component.previous);
                                    const percentage = calculatePercentage(component.current, component.previous);
                                    const isPositive = difference > 0;
                                    const isHighChange = Math.abs(percentage) > 15;

                                    return (
                                        <TableRow 
                                            key={index}
                                            className="bg-white hover:bg-gray-50 border-gray-200"
                                        >
                                            <TableCell className="font-medium text-gray-900 py-3">
                                                {component.label}
                                            </TableCell>
                                            <TableCell className="text-right text-gray-900 font-medium">
                                                {component.isUSD ? formatDollar(component.current) : formatRupiah(component.current)}
                                            </TableCell>
                                            <TableCell className="text-right text-gray-900 font-medium">
                                                {component.isUSD ? formatDollar(component.previous) : formatRupiah(component.previous)}
                                            </TableCell>
                                            <TableCell className="text-right font-medium text-gray-900">
                                                {isPositive ? '+' : ''}{component.isUSD ? formatDollar(difference) : formatRupiah(difference)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="font-medium text-gray-900">
                                                        {isPositive ? '+' : ''}{percentage.toFixed(2)}%
                                                    </span>
                                                    {isHighChange && (
                                                        <Badge 
                                                            variant="destructive"
                                                            className="rounded-md text-xs"
                                                        >
                                                            Warning: {isPositive ? '+' : ''}{percentage.toFixed(2)}%
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
