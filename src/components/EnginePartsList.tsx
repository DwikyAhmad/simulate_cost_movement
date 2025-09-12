"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
import { engineParts } from "@/data/sampleData";
import {
    Eye,
    AlertTriangle,
    BarChart3,
    Search,
    Filter,
    CheckSquare,
} from "lucide-react";

interface EnginePartsListProps {
    onSelectPart: (partNo: string) => void;
    onGoToComparison?: () => void;
}

export default function EnginePartsList({
    onSelectPart,
    onGoToComparison,
}: EnginePartsListProps) {
    const router = useRouter();
    const [partNumberFilter, setPartNumberFilter] = useState("");
    const [modelFilter, setModelFilter] = useState("all");
    const [destinationFilter, setDestinationFilter] = useState("all");
    const [selectedParts, setSelectedParts] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const getComponentsAboveThreshold = (
        part: (typeof engineParts)[string]
    ) => {
        const components = [
            part.costs.nonLVA.jsp,
            part.costs.nonLVA.msp,
            part.costs.lva.localOH,
            part.costs.lva.rawMaterial,
            part.costs.toolingOuthouse,
            part.costs.processingCost.labor,
            part.costs.processingCost.fohFixed,
            part.costs.processingCost.fohVar,
            part.costs.processingCost.unfinishDepre,
            part.costs.processingCost.exclusiveDepre,
            part.costs.totalPurchaseCost,
        ];

        return components.filter(
            (component) => component.percentageChange <= -5
        ).length;
    };

    // Get unique models and destinations for filter options
    const { models, destinations } = useMemo(() => {
        const partsArray = Object.values(engineParts);
        const models = [
            ...new Set(partsArray.map((part) => part.model)),
        ].sort();
        const destinations = [
            ...new Set(partsArray.map((part) => part.destination)),
        ].sort();
        return { models, destinations };
    }, []);

    // Filter parts based on current filter values
    const filteredParts = useMemo(() => {
        const allParts = Object.entries(engineParts);

        return allParts.filter(([partNo, part]) => {
            const matchesPartNumber =
                partNumberFilter === "" ||
                partNo.toLowerCase().includes(partNumberFilter.toLowerCase());

            const matchesModel =
                modelFilter === "all" || part.model === modelFilter;

            const matchesDestination =
                destinationFilter === "all" ||
                part.destination === destinationFilter;

            return matchesPartNumber && matchesModel && matchesDestination;
        });
    }, [partNumberFilter, modelFilter, destinationFilter]);

    const handlePartSelect = (partNo: string) => {
        setSelectedParts((prev) => {
            if (prev.includes(partNo)) {
                return prev.filter((p) => p !== partNo);
            } else {
                return [...prev, partNo];
            }
        });
    };

    const handleCompareSelected = () => {
        if (selectedParts.length >= 2) {
            const partsParam = selectedParts.join(",");
            router.push(
                `/costmovement/engine/results/${encodeURIComponent(partsParam)}`
            );
        }
    };

    const clearFilters = () => {
        setPartNumberFilter("");
        setModelFilter("all");
        setDestinationFilter("all");
        setSelectedParts([]);
    };

    return (
        <div className="p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Period Info and Actions */}
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <div className="flex flex-col sm:flex-row gap-2">
                        {onGoToComparison && (
                            <Button
                                onClick={onGoToComparison}
                                className="bg-purple-600 hover:bg-purple-700 text-white rounded-none border-2 border-purple-500 w-fit"
                            >
                                <BarChart3 className="h-4 w-4 mr-2" />
                                <span className="">
                                    1v1 Comparison
                                </span>
                            </Button>
                        )}
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            variant="outline"
                            className="bg-gray-700 border-gray-500 text-white hover:bg-gray-600 rounded-none w-fit"
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filter & Compare
                        </Button>
                        {selectedParts.length >= 2 && (
                            <Button
                                onClick={handleCompareSelected}
                                className="bg-green-600 hover:bg-green-700 text-white rounded-none border-2 border-green-500 w-fit"
                            >
                                <CheckSquare className="h-4 w-4 mr-2" />
                                Compare Selected ({selectedParts.length})
                            </Button>
                        )}
                    </div>
                </div>

                {/* Filter Section */}
                {showFilters && (
                    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Filter className="h-5 w-5" />
                                Filter Parts
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Filter parts by number, model, and destination.
                                Select multiple parts to compare.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 mb-4">
                                {/* Part Number Filter */}
                                <div className="space-y-2 w-sm">
                                    <label className="text-sm font-medium text-white">
                                        Part Number
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="text"
                                            placeholder="Search part number..."
                                            value={partNumberFilter}
                                            onChange={(e) =>
                                                setPartNumberFilter(
                                                    e.target.value
                                                )
                                            }
                                            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-none"
                                        />
                                    </div>
                                </div>

                                {/* Model Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">
                                        Model
                                    </label>
                                    <Select
                                        value={modelFilter}
                                        onValueChange={setModelFilter}
                                    >
                                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white rounded-none">
                                            <SelectValue placeholder="Select model" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-700 border-gray-600 text-white">
                                            <SelectItem value="all">
                                                All Models
                                            </SelectItem>
                                            {models.map((model) => (
                                                <SelectItem
                                                    key={model}
                                                    value={model}
                                                >
                                                    {model}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Destination Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">
                                        Destination
                                    </label>
                                    <Select
                                        value={destinationFilter}
                                        onValueChange={setDestinationFilter}
                                    >
                                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white rounded-none">
                                            <SelectValue placeholder="Select destination" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-700 border-gray-600 text-white">
                                            <SelectItem value="all">
                                                All Destinations
                                            </SelectItem>
                                            {destinations.map((destination) => (
                                                <SelectItem
                                                    key={destination}
                                                    value={destination}
                                                >
                                                    {destination}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="rounded-none"
                                    >
                                        {filteredParts.length} parts found
                                    </Badge>
                                    {selectedParts.length > 0 && (
                                        <Badge
                                            variant="outline"
                                            className="rounded-none text-white border-gray-500"
                                        >
                                            {selectedParts.length} selected
                                        </Badge>
                                    )}
                                </div>
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="rounded-none border-gray-500 text-black hover:bg-gray-700"
                                >
                                    Clear All
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Parts List */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center justify-between">
                            <span>Engine Parts List</span>
                            {showFilters && (
                                <Badge
                                    variant="secondary"
                                    className="rounded-none"
                                >
                                    {filteredParts.length} of{" "}
                                    {Object.keys(engineParts).length} parts
                                </Badge>
                            )}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                            Overview of engine parts with cost movement
                            indicators. Click parts to select for comparison.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredParts.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-400">
                                    No parts match the current filters
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Try adjusting your filter criteria
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredParts.map(([partNo, part]) => {
                                    const isSelected =
                                        selectedParts.includes(partNo);

                                    return (
                                        <div
                                            key={partNo}
                                            className={`bg-gray-700 border p-4 rounded-none transition-colors cursor-pointer ${
                                                isSelected
                                                    ? "border-blue-500 bg-blue-900/20"
                                                    : "border-gray-600 hover:bg-gray-650"
                                            }`}
                                            onClick={() =>
                                                handlePartSelect(partNo)
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    isSelected
                                                                }
                                                                onChange={() =>
                                                                    handlePartSelect(
                                                                        partNo
                                                                    )
                                                                }
                                                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            />
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-white">
                                                                    {partNo}
                                                                </h3>
                                                                <div className="flex items-center gap-4 mt-1">
                                                                    <p className="text-sm text-gray-400">
                                                                        {getComponentsAboveThreshold(
                                                                            part
                                                                        )}{" "}
                                                                        of 11
                                                                        components
                                                                        above
                                                                        threshold
                                                                    </p>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs rounded-none text-blue-300 border-blue-300"
                                                                    >
                                                                        {
                                                                            part.model
                                                                        }
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs rounded-none text-green-300 border-green-300"
                                                                    >
                                                                        {
                                                                            part.destination
                                                                        }
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            {getComponentsAboveThreshold(
                                                                part
                                                            ) >= 1 ? (
                                                                <Badge
                                                                    variant="destructive"
                                                                    className="ml-2 rounded-none"
                                                                >
                                                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                                                    Above
                                                                    Threshold
                                                                </Badge>
                                                            ) : (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="ml-2 rounded-none text-white"
                                                                >
                                                                    Stable
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onSelectPart(
                                                                partNo
                                                            );
                                                        }}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500"
                                                    >
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
