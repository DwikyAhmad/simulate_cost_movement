"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, FileSpreadsheet, Search, Calculator, MessageSquare, X } from "lucide-react";
import { engineParts } from "@/data/sampleData";
import { EnginePart } from "@/types/cost";

interface FOBCalculation {
    partNo: string;
    engineType: string;
    exchangeRate: number;
    salesVolume: string;
    imap: number;
    fobPriceUSD: number;
    fobPriceRP: number;
    totalExportCost: number;
    exportCost: number;
    fobCharge: number;
    packingCost: number;
    totalExFactoryPrice: number;
    tmminOP: number;
    sellingGeneralAdmin: number;
    tmminGP: number;
    totMfgCost: number;
    totalMfgCostWithID: number;
    royalty: number;
    lva: number;
    totalPartCost: number;
    localCosts: number;
    inhouse: number;
    ohInsurance: number;
    outhouse: number;
    totalImportedCost: number;
    mspartsLandedCost: number;
    jpartsLandedCost: number;
}

export default function CalculationPage() {
    const [calculations, setCalculations] = useState<FOBCalculation[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [engineTypeFilter, setEngineTypeFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRemark, setSelectedRemark] = useState<{
        partNo: string;
        rowName: string;
        content: string;
    } | null>(null);

    // Master data values (these would normally come from the master data page)
    const masterData = {
        exchangeRate: 16374,
        tmminOP: 3.5,
        sellingGeneralAdmin: 1.37,
        royalty: 6,
        inlandInsuranceJSP: 0.06,
        inlandInsuranceMSP: 0.1,
        ohInsurance: 0.2018,
    };

    // Dummy remarks data for each part and row combination
    const remarksData: { [key: string]: string } = {};
    
    // Generate dummy remarks for each part and specific rows
    const generateRemarkKey = (partNo: string, rowType: string) => `${partNo}-${rowType}`;
    
    const remarkTemplates = [
        "Approved by cost owner. Material cost increased by 3.2% due to supplier price adjustment effective this month.",
        "Under review by procurement team. Waiting for final supplier confirmation on pricing for next quarter.",
        "Cost reduction of 5.1% achieved through process optimization and improved vendor negotiations.",
        "Price increase of 4.7% due to raw material cost escalation (steel prices up 8%) and inflation impact.",
        "Conditionally approved. Currently under review for potential cost reduction opportunities with alternative suppliers.",
        "Pending final calculation. Awaiting exchange rate confirmation from finance department for USD transactions.",
        "Aligned with target pricing. No significant variance from previous period, stable supplier relationship maintained.",
        "Requires re-evaluation next month. Market conditions suggest potential for 2-3% better pricing with volume commitment.",
        "Critical part - expedited approval granted. Premium pricing accepted due to quality requirements and delivery schedule.",
        "Cost verified and locked. Part of long-term supply agreement with fixed pricing until end of fiscal year.",
        "New supplier onboarded. Initial pricing competitive, subject to quarterly performance review and adjustment.",
        "Engineering change implemented. Cost impact: +2.3% due to upgraded specifications and quality standards.",
    ];

    // Initialize some dummy remarks (you can customize which cells have remarks)
    Object.values(engineParts).forEach((part, index) => {
        // Add remarks for some random cells to demonstrate functionality
        if (index % 2 === 0) {
            remarksData[generateRemarkKey(part.partNo, "fobPriceUSD")] = remarkTemplates[index % remarkTemplates.length];
        }
        if (index % 3 === 0) {
            remarksData[generateRemarkKey(part.partNo, "tmminOP")] = remarkTemplates[(index + 1) % remarkTemplates.length];
        }
        if (index === 1 || index === 3) {
            remarksData[generateRemarkKey(part.partNo, "lva")] = remarkTemplates[(index + 2) % remarkTemplates.length];
        }
        if (index % 4 === 0) {
            remarksData[generateRemarkKey(part.partNo, "totalPartCost")] = remarkTemplates[(index + 3) % remarkTemplates.length];
        }
        if (index === 2) {
            remarksData[generateRemarkKey(part.partNo, "ohInsurance")] = remarkTemplates[(index + 4) % remarkTemplates.length];
        }
        // Add more as needed
        remarksData[generateRemarkKey(part.partNo, "mspartsLandedCost")] = remarkTemplates[(index + 5) % remarkTemplates.length];
        remarksData[generateRemarkKey(part.partNo, "jpartsLandedCost")] = remarkTemplates[(index + 6) % remarkTemplates.length];
    });

    const showRemark = (partNo: string, rowType: string, rowName: string) => {
        const remarkKey = generateRemarkKey(partNo, rowType);
        if (remarksData[remarkKey]) {
            setSelectedRemark({
                partNo,
                rowName,
                content: remarksData[remarkKey],
            });
        }
    };

    const hasRemark = (partNo: string, rowType: string) => {
        return !!remarksData[generateRemarkKey(partNo, rowType)];
    };

    const closeRemark = () => {
        setSelectedRemark(null);
    };

    const generateCalculations = useCallback(() => {
        setIsLoading(true);

        const calculatedData: FOBCalculation[] = Object.values(engineParts).map(
            (part: EnginePart, index) => {
                const imap = 0.018; // IMAP margin
                const basePrice = 1589.54 + index * 150; // Vary prices for different parts
                const fobPriceUSD = basePrice;
                const salesVolume =
                    part.partNo === "120000Y140" ? "FALSE" : "186";

                // Calculate derived values
                const fobPriceRP = fobPriceUSD * masterData.exchangeRate;
                const totalExportCost = 25116143.202 + index * 1000000;
                const totalExFactoryPrice = totalExportCost + 317481.775;
                const tmminOP = totalExportCost * (masterData.tmminOP / 100);
                const sellingGeneralAdmin =
                    totalExportCost * (masterData.sellingGeneralAdmin / 100);
                const tmminGP = tmminOP + sellingGeneralAdmin + 500000;
                const totMfgCost = 24178.586 + index * 2000;
                const totalMfgCostWithID = totMfgCost;
                const royalty = totalExportCost * (masterData.royalty / 100);
                const lva = 18032512.389 + index * 500000;
                const totalPartCost = lva + totMfgCost + royalty;
                const localCosts = 15102.056 + index * 1000;
                const inhouse = 6547.26 + index * 500;
                const ohInsurance =
                    totalPartCost * (masterData.ohInsurance / 100);
                const outhouse = 125000 + index * 10000;
                const totalImportedCost =
                    totalPartCost + ohInsurance + outhouse;
                const mspartsLandedCost = totalImportedCost * 1.15;
                const jpartsLandedCost = totalImportedCost * 1.12;

                return {
                    partNo: part.partNo,
                    engineType: part.engineType,
                    exchangeRate: masterData.exchangeRate,
                    salesVolume,
                    imap,
                    fobPriceUSD,
                    fobPriceRP,
                    totalExportCost,
                    exportCost: 593466.424,
                    fobCharge: 331620.708,
                    packingCost: 261845.909,
                    totalExFactoryPrice,
                    tmminOP,
                    sellingGeneralAdmin,
                    tmminGP,
                    totMfgCost,
                    totalMfgCostWithID,
                    royalty,
                    lva,
                    totalPartCost,
                    localCosts,
                    inhouse,
                    ohInsurance,
                    outhouse,
                    totalImportedCost,
                    mspartsLandedCost,
                    jpartsLandedCost,
                };
            }
        );

        setCalculations(calculatedData);
        setIsLoading(false);
    }, [
        masterData.exchangeRate,
        masterData.tmminOP,
        masterData.sellingGeneralAdmin,
        masterData.royalty,
        masterData.ohInsurance,
    ]);

    const filteredCalculations = calculations.filter((calc) => {
        const matchesSearch =
            calc.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            calc.engineType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEngineType =
            engineTypeFilter === "all" || calc.engineType === engineTypeFilter;
        return matchesSearch && matchesEngineType;
    });

    const handleExportToExcel = (engineType?: string) => {
        console.log(
            `Exporting calculation data to Excel... ${
                engineType
                    ? `(${engineType} engines only)`
                    : "(all filtered data)"
            }`
        );
        alert(
            `Excel export functionality would be implemented here. This would generate a detailed FOB calculation spreadsheet for ${
                engineType ? engineType + " engines" : "all filtered data"
            }.`
        );
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatUSD = (value: number): string => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value);
    };

    // Initialize calculations on component mount
    if (calculations.length === 0 && !isLoading) {
        generateCalculations();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 md:p-6">
            <div className="max-w-full mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white border-b-2 border-blue-100 shadow-sm p-4 md:p-6">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
                            <Button
                                onClick={() => (window.location.href = "/")}
                                variant="outline"
                                className="flex items-center gap-2 rounded-md border-2 border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors w-fit"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Back to Home
                                </span>
                                <span className="sm:hidden">Home</span>
                            </Button>
                            <div>
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                                    TR E/G MSP PRICE Full CAL Format
                                </h1>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleExportToExcel("NR")}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md border-2 border-blue-500 px-4 py-2 shadow-sm"
                            >
                                <FileSpreadsheet className="h-4 w-4 mr-2" />
                                Export NR
                            </Button>
                            <Button
                                onClick={() => handleExportToExcel("TR")}
                                className="bg-purple-600 hover:bg-purple-700 text-white rounded-md border-2 border-purple-500 px-4 py-2 shadow-sm"
                            >
                                <FileSpreadsheet className="h-4 w-4 mr-2" />
                                Export TR
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white border-2 border-blue-100 shadow-sm rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by part number or engine type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-md"
                            />
                        </div>
                        <div>
                            <Select
                                value={engineTypeFilter}
                                onValueChange={setEngineTypeFilter}
                            >
                                <SelectTrigger className="bg-white border-2 border-gray-300 text-gray-900 rounded-md">
                                    <SelectValue placeholder="Filter by engine type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                    <SelectItem value="all" className="text-gray-900 hover:bg-blue-50">
                                        All Engine Types
                                    </SelectItem>
                                    <SelectItem value="NR" className="text-gray-900 hover:bg-blue-50">
                                        NR Engines
                                    </SelectItem>
                                    <SelectItem value="TR" className="text-gray-900 hover:bg-blue-50">
                                        TR Engines
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Calculation Results */}
                {isLoading ? (
                    <div className="bg-white border-2 border-blue-100 shadow-sm rounded-lg p-12 text-center">
                        <Calculator className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
                        <p className="text-gray-900 text-lg font-semibold">
                            Calculating FOB prices...
                        </p>
                        <p className="text-gray-600 text-sm">
                            Processing engine cost data and calculations
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border-2 border-blue-100 shadow-sm rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 font-bold text-lg">
                            FOB Price Calculation
                        </div>

                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <div className="min-w-fit">
                                    <table className="w-full border-collapse text-sm">
                                        <thead>
                                            <tr className="border-gray-300 bg-gray-50">
                                                <th className="text-gray-900 min-w-[250px] sticky -left-1 bg-gray-50 z-10 border-2 border-gray-300 p-2 text-left font-semibold">
                                                    Calculation Component
                                                </th>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <th
                                                            key={calc.partNo}
                                                            className="text-center text-gray-900 min-w-[180px] border-2 border-gray-300 p-2"
                                                        >
                                                            <div>
                                                                <div className="font-semibold">
                                                                    {
                                                                        calc.partNo
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-gray-600">
                                                                    {
                                                                        calc.engineType
                                                                    }
                                                                </div>
                                                            </div>
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* FOB Price USD */}
                                            <tr className="bg-yellow-100 border-gray-300">
                                                <td className="bg-yellow-200 text-gray-900 font-bold sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    FOB Price (US$)
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-fob-usd`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900 font-semibold">
                                                                {formatUSD(
                                                                    calc.fobPriceUSD
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "fobPriceUSD") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "fobPriceUSD", "FOB Price (US$)")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* FOB Price RP */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    FOB Price (RP)
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-fob-rp`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.fobPriceRP
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "fobPriceRP") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "fobPriceRP", "FOB Price (RP)")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total Export Cost */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Total Export Cost w/o
                                                    interest
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-export-cost`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.totalExportCost
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "totalExportCost") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "totalExportCost", "Total Export Cost")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total EX-Factory Price */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Total EX-Factory Price
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-ex-factory`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.totalExFactoryPrice
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "totalExFactoryPrice") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "totalExFactoryPrice", "Total EX-Factory Price")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* TMMIN E/G OP */}
                                            <tr className="bg-yellow-100 border-gray-300">
                                                <td className="bg-yellow-200 text-gray-900 font-bold sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    TMMIN E/G OP
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-tmmin-op`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900 font-semibold">
                                                                {formatCurrency(
                                                                    calc.tmminOP
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "tmminOP") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "tmminOP", "TMMIN E/G OP")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Selling & General Admin */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Selling & General Admin
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-selling-admin`}
                                                            className="text-center border border-gray-300 p-2"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.sellingGeneralAdmin
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* TMMIN GP w/o interest */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    TMMIN GP w/o interest
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-tmmin-gp`}
                                                            className="text-center border border-gray-300 p-2"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.tmminGP
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total MFG Cost (w/o: Inv. Intr & ID) */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Total MFG Cost (w/o: Inv.
                                                    Intr & ID)
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-mfg-cost`}
                                                            className="text-center border border-gray-300 p-2"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.totMfgCost
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total MFG Cost (w/ ID) */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Total MFG Cost (w/ ID)
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-mfg-cost-id`}
                                                            className="text-center border border-gray-300 p-2"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.totalMfgCostWithID
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Royalty */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Royalty
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-royalty`}
                                                            className="text-center border border-gray-300 p-2"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.royalty
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* LVA */}
                                            <tr className="bg-yellow-100 border-gray-300">
                                                <td className="bg-yellow-200 text-gray-900 font-bold sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    LVA
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-lva`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900 font-semibold">
                                                                {formatCurrency(
                                                                    calc.lva
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "lva") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "lva", "LVA")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total Part Cost */}
                                            <tr className="bg-blue-100 border-gray-300">
                                                <td className="bg-blue-200 text-gray-900 font-bold sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Total Part Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-total-part-cost`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900 font-semibold">
                                                                {formatCurrency(
                                                                    calc.totalPartCost
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "totalPartCost") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "totalPartCost", "Total Part Cost")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Local Cost */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Local Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-local-cost`}
                                                            className="text-center border border-gray-300 p-2"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.localCosts
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Inhouse */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Inhouse
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-inhouse`}
                                                            className="text-center border border-gray-300 p-2"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.inhouse
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* O/H Insurance */}
                                            <tr className="bg-pink-100 border-gray-300">
                                                <td className="bg-pink-200 text-gray-900 font-bold sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    O/H Insurance
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-oh-insurance`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.ohInsurance
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "ohInsurance") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "ohInsurance", "O/H Insurance")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Outhouse */}
                                            <tr className="border-gray-300 hover:bg-gray-50">
                                                <td className="bg-gray-100 text-gray-900 font-medium sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Outhouse
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-outhouse`}
                                                            className="text-center border border-gray-300 p-2"
                                                        >
                                                            <div className="text-gray-900">
                                                                {formatCurrency(
                                                                    calc.outhouse
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total Imported Cost */}
                                            <tr className="bg-green-100 border-gray-300">
                                                <td className="bg-green-200 text-gray-900 font-bold sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    Total Imported Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-total-imported`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900 font-semibold">
                                                                {formatCurrency(
                                                                    calc.totalImportedCost
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "totalImportedCost") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "totalImportedCost", "Total Imported Cost")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* MSPARTS Landed Cost */}
                                            <tr className="bg-purple-100 border-gray-300">
                                                <td className="bg-purple-200 text-gray-900 font-bold sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    MSPARTS Landed Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-msparts-landed`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900 font-semibold">
                                                                {formatCurrency(
                                                                    calc.mspartsLandedCost
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "mspartsLandedCost") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "mspartsLandedCost", "MSPARTS Landed Cost")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* JPARTS Landed Cost */}
                                            <tr className="bg-orange-100 border-gray-300">
                                                <td className="bg-orange-200 text-gray-900 font-bold sticky -left-1 z-10 border-2 border-gray-300 p-2">
                                                    JPARTS Landed Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-jparts-landed`}
                                                            className="text-center border border-gray-300 p-2 relative"
                                                        >
                                                            <div className="text-gray-900 font-semibold">
                                                                {formatCurrency(
                                                                    calc.jpartsLandedCost
                                                                )}
                                                            </div>
                                                            {hasRemark(calc.partNo, "jpartsLandedCost") && (
                                                                <button
                                                                    onClick={() => showRemark(calc.partNo, "jpartsLandedCost", "JPARTS Landed Cost")}
                                                                    className="absolute top-1 right-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="View remark"
                                                                >
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Remark Popup Modal */}
                {selectedRemark && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 border-2 border-gray-300">
                            <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {selectedRemark.rowName}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Part Number: {selectedRemark.partNo}
                                    </p>
                                </div>
                                <button
                                    onClick={closeRemark}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 leading-relaxed">
                                    {selectedRemark.content}
                                </p>
                            </div>
                            <div className="flex justify-end p-4 border-t-2 border-gray-200 bg-gray-50">
                                <Button
                                    onClick={closeRemark}
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
