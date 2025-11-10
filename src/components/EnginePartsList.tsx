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
    ChevronLeft,
    ChevronRight,
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
    const [engineTypeFilter, setEngineTypeFilter] = useState("all");
    const [selectedParts, setSelectedParts] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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

    // Get unique models, destinations, and engine types for filter options
    const { models, destinations, engineTypes } = useMemo(() => {
        const partsArray = Object.values(engineParts);
        const models = [
            ...new Set(partsArray.map((part) => part.model)),
        ].sort();
        const destinations = [
            ...new Set(partsArray.map((part) => part.destination)),
        ].sort();
        const engineTypes = [
            ...new Set(partsArray.map((part) => part.engineType)),
        ].sort();
        return { models, destinations, engineTypes };
    }, []);

    // Filter parts based on current filter values
    const filteredParts = useMemo(() => {
        const allParts = Object.entries(engineParts);

        const filtered = allParts.filter(([partNo, part]) => {
            const matchesPartNumber =
                partNumberFilter === "" ||
                partNo.toLowerCase().includes(partNumberFilter.toLowerCase());

            const matchesModel =
                modelFilter === "all" || part.model === modelFilter;

            const matchesDestination =
                destinationFilter === "all" ||
                part.destination === destinationFilter;

            const matchesEngineType =
                engineTypeFilter === "all" ||
                part.engineType === engineTypeFilter;

            return (
                matchesPartNumber &&
                matchesModel &&
                matchesDestination &&
                matchesEngineType
            );
        });

        // Reset to page 1 when filters change
        setCurrentPage(1);
        return filtered;
    }, [partNumberFilter, modelFilter, destinationFilter, engineTypeFilter]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredParts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedParts = filteredParts.slice(startIndex, endIndex);

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

    const handleSelectAll = () => {
        const currentPagePartNumbers = paginatedParts.map(([partNo]) => partNo);
        setSelectedParts((prev) => {
            const newSelected = [...prev];
            currentPagePartNumbers.forEach(partNo => {
                if (!newSelected.includes(partNo)) {
                    newSelected.push(partNo);
                }
            });
            return newSelected;
        });
    };

    const handleSelectAllFiltered = () => {
        const filteredPartNumbers = filteredParts.map(([partNo]) => partNo);
        setSelectedParts(filteredPartNumbers);
    };

    const handleDeselectAll = () => {
        setSelectedParts([]);
    };

    const clearFilters = () => {
        setPartNumberFilter("");
        setModelFilter("all");
        setDestinationFilter("all");
        setEngineTypeFilter("all");
        setSelectedParts([]);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number(value));
        setCurrentPage(1);
    };

    // Check if all filtered parts are selected
    const allFilteredSelected =
        filteredParts.length > 0 &&
        filteredParts.every(([partNo]) => selectedParts.includes(partNo));

    // Check if all parts on current page are selected
    const allCurrentPageSelected =
        paginatedParts.length > 0 &&
        paginatedParts.every(([partNo]) => selectedParts.includes(partNo));

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
                                <span className="">1v1 Comparison</span>
                            </Button>
                        )}
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            variant="outline"
                            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-none w-fit"
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
                    <Card className="rounded-none border-2 bg-white border-gray-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-gray-900 flex items-center gap-2">
                                <Filter className="h-5 w-5" />
                                Filter Parts
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Filter parts by number, model, and destination.
                                Select multiple parts to compare.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 mb-4">
                                {/* Part Number Filter */}
                                <div className="space-y-2 w-sm">
                                    <label className="text-sm font-medium text-gray-700">
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
                                            className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-400 rounded-none"
                                        />
                                    </div>
                                </div>

                                {/* Engine Type Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Engine Type
                                    </label>
                                    <Select
                                        value={engineTypeFilter}
                                        onValueChange={setEngineTypeFilter}
                                    >
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900 rounded-none">
                                            <SelectValue placeholder="Select engine type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 text-gray-900">
                                            <SelectItem value="all">
                                                All Types
                                            </SelectItem>
                                            {engineTypes.map((engineType) => (
                                                <SelectItem
                                                    key={engineType}
                                                    value={engineType}
                                                >
                                                    {engineType}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Model Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        CFC
                                    </label>
                                    <Select
                                        value={modelFilter}
                                        onValueChange={setModelFilter}
                                    >
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900 rounded-none">
                                            <SelectValue placeholder="Select model" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 text-gray-900">
                                            <SelectItem value="all">
                                                All CFC
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
                                    <label className="text-sm font-medium text-gray-700">
                                        Destination
                                    </label>
                                    <Select
                                        value={destinationFilter}
                                        onValueChange={setDestinationFilter}
                                    >
                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900 rounded-none">
                                            <SelectValue placeholder="Select destination" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 text-gray-900">
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
                                            className="rounded-none text-gray-700 border-gray-300"
                                        >
                                            {selectedParts.length} selected
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    {filteredParts.length > 0 && (
                                        <>
                                            {allFilteredSelected ? (
                                                <Button
                                                    onClick={handleDeselectAll}
                                                    variant="outline"
                                                    className="rounded-none border-orange-500 text-orange-600 hover:bg-orange-50"
                                                >
                                                    Deselect All
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button
                                                        onClick={handleSelectAll}
                                                        variant="outline"
                                                        disabled={allCurrentPageSelected}
                                                        className="rounded-none text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                    >
                                                        Select This Page
                                                    </Button>
                                                    {filteredParts.length > itemsPerPage && (
                                                        <Button
                                                            onClick={handleSelectAllFiltered}
                                                            variant="outline"
                                                            className="rounded-none text-blue-600 border-blue-300 hover:bg-blue-50"
                                                        >
                                                            Select All ({filteredParts.length})
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                    <Button
                                        onClick={clearFilters}
                                        variant="outline"
                                        className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50"
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Parts List */}
                <Card className="rounded-none border-2 bg-white border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center justify-between">
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
                        <CardDescription className="text-gray-600">
                            Overview of engine parts with cost movement
                            indicators. Click parts to select for comparison.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredParts.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">
                                    No parts match the current filters
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Try adjusting your filter criteria
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {paginatedParts.map(([partNo, part]) => {
                                    const isSelected =
                                        selectedParts.includes(partNo);

                                    return (
                                        <div
                                            key={partNo}
                                            className={`bg-white border p-4 rounded-none transition-colors cursor-pointer ${
                                                isSelected
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:bg-gray-50"
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
                                                                className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            />
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-gray-900">
                                                                    {partNo}
                                                                </h3>
                                                                <div className="flex items-center gap-4 mt-1">
                                                                    <p className="text-sm text-gray-600">
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
                                                                        className="text-xs rounded-none text-yellow-700 border-yellow-400 bg-yellow-50"
                                                                    >
                                                                        {
                                                                            part.engineType
                                                                        }
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs rounded-none text-blue-700 border-blue-400 bg-blue-50"
                                                                    >
                                                                        {
                                                                            part.model
                                                                        }
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs rounded-none text-green-700 border-green-400 bg-green-50"
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
                                                                    className="ml-2 rounded-none text-green-700 border-green-400"
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

                        {/* Pagination Controls */}
                        {filteredParts.length > 0 && (
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                        Showing {startIndex + 1} to {Math.min(endIndex, filteredParts.length)} of {filteredParts.length} parts
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 mr-2">Items per page:</span>
                                    <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                                        <SelectTrigger className="w-20 bg-white border-gray-300 text-gray-900 rounded-none">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200">
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="20">20</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                            // Show first page, last page, current page, and pages around current
                                            const showPage = 
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1);

                                            const showEllipsis = 
                                                (page === currentPage - 2 && currentPage > 3) ||
                                                (page === currentPage + 2 && currentPage < totalPages - 2);

                                            if (showEllipsis) {
                                                return <span key={page} className="px-2 text-gray-500">...</span>;
                                            }

                                            if (!showPage) return null;

                                            return (
                                                <Button
                                                    key={page}
                                                    variant={currentPage === page ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => handlePageChange(page)}
                                                    className={`rounded-none min-w-[2.5rem] ${
                                                        currentPage === page
                                                            ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                                                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        })}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="rounded-none border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
