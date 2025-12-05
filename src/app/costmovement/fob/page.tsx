"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Eye, Search, Filter, Users, DollarSign } from "lucide-react";
import { engineParts } from "@/data/sampleData";

// Mock FOB data generator
const generateFOBData = (partNo: string) => {
    const baseValue = parseInt(partNo.replace(/[^0-9]/g, '')) || 1000;
    return {
        fobPriceUSD: (baseValue * 0.45),
        totalExportCost: (baseValue * 0.42),
        tmminGP: (baseValue * 0.35),
    };
};

export default function FOBAnalysisPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [modelFilter, setModelFilter] = useState<string>("all");
    const [destinationFilter, setDestinationFilter] = useState<string>("all");
    const [engineTypeFilter, setEngineTypeFilter] = useState<string>("all");

    const handleBackToMain = () => {
        router.push("/");
    };

    const handleGoTo1v1 = () => {
        router.push('/costmovement/fob/compare');
    };

    const handleShowDetail = (partNo: string) => {
        router.push(`/costmovement/fob/detail/${partNo}`);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Get unique models, destinations, and engine types for filters
    const allParts = Object.entries(engineParts);
    const models = [...new Set(Object.values(engineParts).map(part => part.model))].sort();
    const destinations = [...new Set(Object.values(engineParts).map(part => part.destination))].sort();
    const engineTypes = [...new Set(Object.values(engineParts).map(part => part.engineType))].sort();

    // Filter parts based on search and filters
    const filteredParts = allParts.filter(([partNo, part]) => {
        const matchesSearch = partNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesModel = modelFilter === "all" || part.model === modelFilter;
        const matchesDestination = destinationFilter === "all" || part.destination === destinationFilter;
        const matchesEngineType = engineTypeFilter === "all" || part.engineType === engineTypeFilter;
        return matchesSearch && matchesModel && matchesDestination && matchesEngineType;
    });

    return (
        <div className="min-h-screen bg-gray-900 p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <Header
                    title="FOB Cost Movement Analysis"
                    subtitle="Analyze FOB pricing components for engine parts"
                    showBackButton
                    onBackClick={handleBackToMain}
                    onRefreshClick={handleRefresh}
                />

                {/* Action Buttons */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="text-white">
                                <h3 className="font-semibold">FOB Analysis Options</h3>
                                <p className="text-gray-300 text-sm">Select parts to view details or compare</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleGoTo1v1}
                                    className="bg-orange-600 hover:bg-orange-700 text-white rounded-none border-2 border-orange-500"
                                >
                                    <Users className="h-4 w-4 mr-2" />
                                    1v1 Comparison
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Filters */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Search Part Number
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search parts..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Model
                                </label>
                                <Select value={modelFilter} onValueChange={setModelFilter}>
                                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white rounded-none">
                                        <SelectValue placeholder="All Models" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-700 border-gray-600 text-white">
                                        <SelectItem value="all">All Models</SelectItem>
                                        {models.map((model) => (
                                            <SelectItem key={model} value={model}>
                                                {model}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Destination
                                </label>
                                <Select value={destinationFilter} onValueChange={setDestinationFilter}>
                                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white rounded-none">
                                        <SelectValue placeholder="All Destinations" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-700 border-gray-600 text-white">
                                        <SelectItem value="all">All Destinations</SelectItem>
                                        {destinations.map((destination) => (
                                            <SelectItem key={destination} value={destination}>
                                                {destination}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Engine Type
                                </label>
                                <Select value={engineTypeFilter} onValueChange={setEngineTypeFilter}>
                                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white rounded-none">
                                        <SelectValue placeholder="All Engine Types" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-700 border-gray-600 text-white">
                                        <SelectItem value="all">All Engine Types</SelectItem>
                                        {engineTypes.map((engineType) => (
                                            <SelectItem key={engineType} value={engineType}>
                                                {engineType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Badge variant="outline" className="rounded-none text-white">
                                {filteredParts.length} parts found
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Parts List */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-orange-400" />
                            FOB Analysis - Engine Parts
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                            Select a part to view detailed FOB cost analysis
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            {filteredParts.map(([partNo, part]) => {
                                const fobData = generateFOBData(partNo);
                                
                                return (
                                    <Card
                                        key={partNo}
                                        className="cursor-pointer transition-all duration-200 rounded-none border-2 border-gray-600 bg-gray-700 hover:border-orange-500 hover:bg-gray-750"
                                    >
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between">
                                                {/* Left side - Part info */}
                                                <div className="flex items-center gap-6">
                                                    <div className="font-semibold text-white min-w-[120px]">
                                                        {partNo}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-300">
                                                        <span><span className="text-gray-400">Model:</span> {part.model}</span>
                                                        <span><span className="text-gray-400">Destination:</span> {part.destination}</span>
                                                        <span><span className="text-gray-400">Engine:</span> {part.engineType}</span>
                                                    </div>
                                                </div>

                                                {/* Center - FOB Summary */}
                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="text-center">
                                                        <div className="text-gray-400 text-xs">FOB Price</div>
                                                        <div className="text-orange-300 font-medium">
                                                            {formatCurrency(fobData.fobPriceUSD)}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right side - Action Button */}
                                                <Button
                                                    onClick={() => handleShowDetail(partNo)}
                                                    size="sm"
                                                    className="bg-orange-600 hover:bg-orange-700 text-white rounded-none border-2 border-orange-500"
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Show Detail
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
