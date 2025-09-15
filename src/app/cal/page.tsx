"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileSpreadsheet, Search, Calculator } from "lucide-react";
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
    const [isLoading, setIsLoading] = useState(false);

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

    const filteredCalculations = calculations.filter(
        (calc) =>
            calc.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            calc.engineType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExportToExcel = () => {
        console.log("Exporting calculation data to Excel...");
        alert(
            "Excel export functionality would be implemented here. This would generate a detailed FOB calculation spreadsheet."
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
        <div className="min-h-screen bg-gray-900 p-3 md:p-6">
            <div className="max-w-full mx-auto space-y-6">
                {/* Header */}
                <div className="bg-gray-800 border-b border-gray-600 p-4 md:p-6">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
                            <Button
                                onClick={() => (window.location.href = "/")}
                                variant="outline"
                                className="flex items-center gap-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 w-fit"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Back to Home
                                </span>
                                <span className="sm:hidden">Home</span>
                            </Button>
                            <div>
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                    TR E/G MSP PRICE Full CAL Format
                                </h1>
                                <p className="text-gray-300 mt-1 text-sm md:text-base">
                                    Original After cost reduction revised - FOB
                                    Price Calculation and Export
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleExportToExcel}
                                className="bg-green-600 hover:bg-green-700 text-white rounded-none border-2 border-green-500 px-4 py-2"
                            >
                                <FileSpreadsheet className="h-4 w-4 mr-2" />
                                Export Excel
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-gray-800 border border-gray-600 p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search by part number or engine type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-none"
                        />
                    </div>
                </div>

                {/* Calculation Results */}
                {isLoading ? (
                    <div className="bg-gray-800 border border-gray-600 p-12 text-center">
                        <Calculator className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
                        <p className="text-white text-lg">
                            Calculating FOB prices...
                        </p>
                        <p className="text-gray-400 text-sm">
                            Processing engine cost data and calculations
                        </p>
                    </div>
                ) : (
                    <div className="bg-gray-800 border border-gray-600 rounded-none">
                        <div className="bg-green-600 text-white p-4 font-bold text-lg">
                            FOB Price Calculation
                        </div>

                        <div className="p-4">
                            <div className="overflow-x-auto">
                                <div className="min-w-fit">
                                    <table className="w-full border-collapse text-sm">
                                        <thead>
                                            <tr className="border-gray-600">
                                                <th className="text-gray-300 min-w-[250px] sticky -left-1 bg-gray-800 z-10 border border-gray-600 p-2 text-left">
                                                    Calculation Component
                                                </th>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <th
                                                            key={calc.partNo}
                                                            className="text-center text-gray-300 min-w-[180px] border border-gray-600 p-2"
                                                        >
                                                            <div>
                                                                <div className="font-semibold">
                                                                    {
                                                                        calc.partNo
                                                                    }
                                                                </div>
                                                                <div className="text-xs text-gray-400">
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
                                            <tr className="bg-yellow-200/20 border-gray-600">
                                                <td className="bg-yellow-200 text-black font-bold sticky -left-1 z-10 border border-gray-600 p-2">
                                                    FOB Price (US$)
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-fob-usd`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white font-semibold">
                                                                {formatUSD(
                                                                    calc.fobPriceUSD
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* FOB Price RP */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    FOB Price (RP)
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-fob-rp`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.fobPriceRP
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total Export Cost */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Total Export Cost w/o
                                                    interest
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-export-cost`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.totalExportCost
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total EX-Factory Price */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Total EX-Factory Price
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-ex-factory`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.totalExFactoryPrice
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* TMMIN E/G OP */}
                                            <tr className="bg-yellow-200/20 border-gray-600">
                                                <td className="bg-yellow-200 text-black font-bold sticky -left-1 z-10 border border-gray-600 p-2">
                                                    TMMIN E/G OP
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-tmmin-op`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white font-semibold">
                                                                {formatCurrency(
                                                                    calc.tmminOP
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Selling & General Admin */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Selling & General Admin
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-selling-admin`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.sellingGeneralAdmin
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* TMMIN GP w/o interest */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    TMMIN GP w/o interest
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-tmmin-gp`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.tmminGP
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total MFG Cost (w/o: Inv. Intr & ID) */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Total MFG Cost (w/o: Inv.
                                                    Intr & ID)
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-mfg-cost`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.totMfgCost
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total MFG Cost (w/ ID) */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Total MFG Cost (w/ ID)
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-mfg-cost-id`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.totalMfgCostWithID
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Royalty */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Royalty
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-royalty`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.royalty
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* LVA */}
                                            <tr className="bg-yellow-200/20 border-gray-600">
                                                <td className="bg-yellow-200 text-black font-bold sticky -left-1 z-10 border border-gray-600 p-2">
                                                    LVA
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-lva`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white font-semibold">
                                                                {formatCurrency(
                                                                    calc.lva
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total Part Cost */}
                                            <tr className="bg-blue-900/30 border-gray-600">
                                                <td className="bg-blue-900 text-white font-bold sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Total Part Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-total-part-cost`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white font-semibold">
                                                                {formatCurrency(
                                                                    calc.totalPartCost
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Local Cost */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Local Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-local-cost`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.localCosts
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Inhouse */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Inhouse
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-inhouse`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.inhouse
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* O/H Insurance */}
                                            <tr className="bg-pink-200/20 border-gray-600">
                                                <td className="bg-pink-200 text-black font-bold sticky -left-1 z-10 border border-gray-600 p-2">
                                                    O/H Insurance
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-oh-insurance`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.ohInsurance
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Outhouse */}
                                            <tr className="border-gray-600">
                                                <td className="bg-gray-700 text-white sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Outhouse
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-outhouse`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white">
                                                                {formatCurrency(
                                                                    calc.outhouse
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* Total Imported Cost */}
                                            <tr className="bg-green-900/30 border-gray-600">
                                                <td className="bg-green-900 text-white font-bold sticky -left-1 z-10 border border-gray-600 p-2">
                                                    Total Imported Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-total-imported`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white font-semibold">
                                                                {formatCurrency(
                                                                    calc.totalImportedCost
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* MSPARTS Landed Cost */}
                                            <tr className="bg-purple-900/30 border-gray-600">
                                                <td className="bg-purple-900 text-white font-bold sticky -left-1 z-10 border border-gray-600 p-2">
                                                    MSPARTS Landed Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-msparts-landed`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white font-semibold">
                                                                {formatCurrency(
                                                                    calc.mspartsLandedCost
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                )}
                                            </tr>

                                            {/* JPARTS Landed Cost */}
                                            <tr className="bg-orange-900/30 border-gray-600">
                                                <td className="bg-orange-900 text-white font-bold sticky -left-1 z-10 border border-gray-600 p-2">
                                                    JPARTS Landed Cost
                                                </td>
                                                {filteredCalculations.map(
                                                    (calc) => (
                                                        <td
                                                            key={`${calc.partNo}-jparts-landed`}
                                                            className="text-center border border-gray-600 p-2"
                                                        >
                                                            <div className="text-white font-semibold">
                                                                {formatCurrency(
                                                                    calc.jpartsLandedCost
                                                                )}
                                                            </div>
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
            </div>
        </div>
    );
}
