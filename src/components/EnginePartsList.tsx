"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { engineParts } from "@/data/sampleData";
import { Eye, AlertTriangle, BarChart3 } from "lucide-react";

interface EnginePartsListProps {
    onSelectPart: (partNo: string) => void;
    onGoToComparison?: () => void;
}

export default function EnginePartsList({
    onSelectPart,
    onGoToComparison,
}: EnginePartsListProps) {

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

    const partNumbers = Object.keys(engineParts);

    return (
        <div className="p-3 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
                {/* Period Info and Actions */}
                <div className="flex justify-between items-center">
                    {onGoToComparison && (
                        <Button
                            onClick={onGoToComparison}
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-none border-2 border-purple-500 w-fit"
                        >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">
                                Additional Analysis
                            </span>
                            <span className="sm:hidden">Additional Analysis</span>
                        </Button>
                    )}
                    <div className="text-right">
                        <p className="text-sm text-gray-400">
                            Period: August 2025
                        </p>
                        <p className="text-sm text-gray-400">
                            Comparison: August 2024
                        </p>
                    </div>
                </div>

                {/* Parts List */}
                <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Engine Parts List
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                            Overview of all engine parts with cost movement
                            indicators
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            {partNumbers.map((partNo) => {
                                const part = engineParts[partNo];

                                return (
                                    <div
                                        key={partNo}
                                        className="bg-gray-700 border border-gray-600 p-4 rounded-none hover:bg-gray-650 transition-colors"
                                    >
                                        {/* Desktop Layout */}
                                        <div className="hidden lg:flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">
                                                            {partNo}
                                                        </h3>
                                                        <p className="text-sm text-gray-400 mt-1">
                                                            {getComponentsAboveThreshold(
                                                                part
                                                            )}{" "}
                                                            of 11 components
                                                            above threshold
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {getComponentsAboveThreshold(part) >= 1 ? (
                                                            <Badge variant="destructive" className="ml-2 rounded-none">
                                                                <AlertTriangle className="h-3 w-3 mr-1" />
                                                                Above Threshold
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="ml-2 rounded-none text-white">
                                                                Stable
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <Button
                                                    onClick={() =>
                                                        onSelectPart(partNo)
                                                    }
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
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
