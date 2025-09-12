/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { ChevronDown, ChevronRight, MessageSquare, X } from "lucide-react";
import { CostComponent } from "@/types/cost";
import { formatCurrency, getDifferenceColor } from "@/lib/utils";

interface CostTableProps {
    partData: any; // Should be typed properly based on your data structure
}

export default function CostTable({ partData }: CostTableProps) {
    const [openSections, setOpenSections] = useState<{
        [key: string]: boolean;
    }>({
        nonLVA: true,
        lva: true,
        processingCost: true,
    });

    const [openComponents, setOpenComponents] = useState<{
        [key: string]: boolean;
    }>({});

    const [selectedRemark, setSelectedRemark] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const toggleComponent = (componentKey: string) => {
        setOpenComponents((prev) => ({
            ...prev,
            [componentKey]: !prev[componentKey],
        }));
    };

    const showRemark = (componentName: string) => {
        setSelectedRemark(componentName);
    };

    const closeRemark = () => {
        setSelectedRemark(null);
    };

    const isAboveThreshold = (component: CostComponent) => {
        return component.percentageChange >= 5;
    };

    const getRemarkContent = (componentName: string) => {
        // Mock remark data - in real app this would come from props or API
        const remarks: { [key: string]: string } = {
            JSP: "Price increase due to raw material cost escalation and supplier negotiations.",
            MSP: "Manufacturing cost increase attributed to labor rate adjustments and process improvements.",
            "Local OH":
                "Overhead allocation increased due to facility maintenance and utility cost rise.",
            "Raw Material":
                "Material cost spike caused by global supply chain disruptions and inflation.",
            "Tooling Outhouse":
                "Tooling cost reduction achieved through process optimization and vendor negotiations.",
            Labor: "Labor cost decrease due to efficiency improvements and automation implementation.",
            "FOH Fixed":
                "Fixed overhead increase due to facility expansion and equipment upgrades.",
            "FOH Variable":
                "Variable overhead reduction through better resource utilization and waste elimination.",
            "Unfinish Depreciation":
                "Depreciation increase due to new equipment acquisition and facility improvements.",
            "Exclusive Depreciation":
                "Depreciation decrease due to asset disposal and accelerated depreciation methods.",
        };

        return remarks[componentName] || "No remark available from cost owner.";
    };

    const getChangeBadge = (percentage: number) => {
        if (percentage >= 5) {
            return (
                <Badge variant="destructive" className="ml-2 rounded-none">
                    Warning: +{percentage.toFixed(2)}%
                </Badge>
            );
        } else if (percentage > 0) {
            return (
                <Badge variant="secondary" className="ml-2 rounded-none">
                    +{percentage.toFixed(2)}%
                </Badge>
            );
        } else if (percentage < 0) {
            return (
                <Badge
                    variant="default"
                    className="ml-2 bg-green-100 text-green-800 rounded-none"
                >
                    {percentage.toFixed(2)}%
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className="ml-2 text-white rounded-none">
                0.00%
            </Badge>
        );
    };

    const getChildComponentsAboveThreshold = (sectionKey: string) => {
        let childComponents: CostComponent[] = [];

        switch (sectionKey) {
            case "nonLVA":
                childComponents = [
                    partData.costs.nonLVA.jsp,
                    partData.costs.nonLVA.msp,
                ];
                break;
            case "lva":
                childComponents = [
                    partData.costs.lva.localOH,
                    partData.costs.lva.rawMaterial,
                ];
                break;
            case "processingCost":
                childComponents = [
                    partData.costs.processingCost.labor,
                    partData.costs.processingCost.fohFixed,
                    partData.costs.processingCost.fohVar,
                    partData.costs.processingCost.unfinishDepre,
                    partData.costs.processingCost.exclusiveDepre,
                ];
                break;
            default:
                return 0;
        }

        return childComponents.filter(
            (component) => component.percentageChange >= 5
        ).length;
    };

    const getThresholdBadge = (sectionKey: string) => {
        const aboveThreshold = getChildComponentsAboveThreshold(sectionKey);
        const totalChildren = sectionKey === "processingCost" ? 5 : 2;

        if (aboveThreshold > 0) {
            return (
                <Badge className="ml-2 rounded-none">
                    {aboveThreshold} of {totalChildren} above threshold
                </Badge>
            );
        } else {
            return (
                <Badge
                    variant="outline"
                    className="ml-2 text-white rounded-none"
                >
                    All stable
                </Badge>
            );
        }
    };

    const PartLevel2Row = ({ part }: { part: any }) => {
        return (
            <TableRow className="bg-gray-800 border-gray-700 text-gray-200 font-light">
                <TableCell className="pl-12 text-sm">
                    {part.partNumber} - {part.partName}
                </TableCell>
                <TableCell className="text-right text-sm">
                    Qty: {part.quantity}
                </TableCell>
                <TableCell className="text-right text-sm">
                    {formatCurrency(part.amount)}
                </TableCell>
                <TableCell className="text-right text-sm">
                    -
                </TableCell>
                <TableCell className="text-right text-sm">
                    -
                </TableCell>
                <TableCell className="text-center">
                    -
                </TableCell>
            </TableRow>
        );
    };

    const CostRow = ({
        component,
        isSubItem = false,
        isTotal = false,
        isGrandTotal = false,
        sectionBg = "",
        componentKey = "",
    }: {
        component: CostComponent;
        isSubItem?: boolean;
        isTotal?: boolean;
        isGrandTotal?: boolean;
        sectionBg?: string;
        componentKey?: string;
    }) => {
        const cellClass = isGrandTotal
            ? "font-bold text-lg text-white"
            : isTotal
            ? "font-semibold text-white"
            : "text-gray-100";

        const nameClass = isSubItem ? "pl-6" : "";
        const rowClass = isGrandTotal
            ? "bg-gray-700 border-t-4 border-gray-500"
            : isTotal
            ? "border-b-2 border-gray-600"
            : sectionBg
            ? sectionBg
            : "border-gray-700";

        const hasLevel2Parts = component.parts && component.parts.length > 0;
        const isComponentOpen = openComponents[componentKey];

        return (
            <>
                <TableRow
                    className={`${rowClass} border-gray-600 ${hasLevel2Parts ? 'cursor-pointer' : ''}`}
                    onClick={hasLevel2Parts ? () => toggleComponent(componentKey) : undefined}
                >
                    <TableCell className={`${cellClass} ${nameClass}`}>
                        <div className="flex items-center">
                            {hasLevel2Parts && (
                                <>
                                    {isComponentOpen ? (
                                        <ChevronDown className="h-4 w-4 mr-2" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 mr-2" />
                                    )}
                                </>
                            )}
                            {component.name}
                        </div>
                    </TableCell>
                <TableCell className={`text-right ${cellClass}`}>
                    {component.currentYear
                        ? formatCurrency(component.currentYear)
                        : ""}
                </TableCell>
                <TableCell className={`text-right ${cellClass}`}>
                    {component.lastYear
                        ? formatCurrency(component.lastYear)
                        : ""}
                </TableCell>
                <TableCell className={`text-right ${cellClass}`}>
                    {component.difference !== undefined && (
                        <span
                            className={getDifferenceColor(component.difference)}
                        >
                            {component.difference >= 0 ? "+" : "-"}
                            {formatCurrency(Math.abs(component.difference))}
                        </span>
                    )}
                </TableCell>
                <TableCell className="text-right">
                    {component.percentageChange !== undefined &&
                        component.name !== "Total Cost" &&
                        getChangeBadge(component.percentageChange)}
                </TableCell>
                <TableCell className="text-center">
                    {isAboveThreshold(component) &&
                        component.name !== "Total Cost" && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showRemark(component.name);
                                }}
                                className="rounded-none border-gray-500 text-black"
                            >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Remark
                            </Button>
                        )}
                </TableCell>
                </TableRow>
                {/* Level 2 Parts */}
                {hasLevel2Parts && isComponentOpen && component.parts?.map((part, index) => (
                    <PartLevel2Row key={`${componentKey}-part-${index}`} part={part} />
                ))}
            </>
        );
    };

    const CollapsibleSection = ({
        sectionKey,
        title,
        totalComponent,
        children,
        sectionBg,
    }: {
        sectionKey: string;
        title: string;
        totalComponent: CostComponent;
        children: React.ReactNode;
        sectionBg: string;
    }) => {
        const isOpen = openSections[sectionKey];

        return (
            <>
                <TableRow
                    className={`${sectionBg} border-gray-600 cursor-pointer`}
                    onClick={() => toggleSection(sectionKey)}
                >
                    <TableCell className="font-semibold text-white">
                        <div className="flex items-center">
                            {isOpen ? (
                                <ChevronDown className="h-4 w-4 mr-2" />
                            ) : (
                                <ChevronRight className="h-4 w-4 mr-2" />
                            )}
                            {title}
                        </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-white">
                        {formatCurrency(totalComponent.currentYear)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-white">
                        {formatCurrency(totalComponent.lastYear)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                        <span
                            className={getDifferenceColor(
                                totalComponent.difference
                            )}
                        >
                            {totalComponent.difference >= 0 ? "+" : "-"}
                            {formatCurrency(
                                Math.abs(totalComponent.difference)
                            )}
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                        {getThresholdBadge(sectionKey)}
                    </TableCell>
                    <TableCell className="text-center">
                        {/* Empty cell for collapsible sections */}
                    </TableCell>
                </TableRow>
                {isOpen && children}
            </>
        );
    };

    return (
        <>
            <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">
                        Cost Breakdown Analysis
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                        Detailed cost comparison showing year-over-year changes
                        for all cost components
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-600">
                                    <TableHead className="w-[300px] text-gray-300">
                                        Cost Component
                                    </TableHead>
                                    <TableHead className="text-right text-gray-300">
                                        Current Year
                                    </TableHead>
                                    <TableHead className="text-right text-gray-300">
                                        Last Year
                                    </TableHead>
                                    <TableHead className="text-right text-gray-300">
                                        Difference
                                    </TableHead>
                                    <TableHead className="text-right text-gray-300">
                                        Change %
                                    </TableHead>
                                    <TableHead className="text-center text-gray-300">
                                        Remarks
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* Non-LVA Section */}
                                <CollapsibleSection
                                    sectionKey="nonLVA"
                                    title="NON LVA"
                                    totalComponent={partData.costs.nonLVA.total}
                                    sectionBg="bg-blue-900/30"
                                >
                                    <CostRow
                                        component={partData.costs.nonLVA.jsp}
                                        isSubItem
                                        componentKey="jsp"
                                    />
                                    <CostRow
                                        component={partData.costs.nonLVA.msp}
                                        isSubItem
                                        componentKey="msp"
                                    />
                                </CollapsibleSection>

                                {/* LVA Section */}
                                <CollapsibleSection
                                    sectionKey="lva"
                                    title="LVA"
                                    totalComponent={partData.costs.lva.total}
                                    sectionBg="bg-green-900/30"
                                >
                                    <CostRow
                                        component={partData.costs.lva.localOH}
                                        isSubItem
                                        componentKey="localOH"
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.lva.rawMaterial
                                        }
                                        isSubItem
                                        componentKey="rawMaterial"
                                    />
                                </CollapsibleSection>

                                {/* Other Costs */}
                                <CostRow
                                    component={partData.costs.toolingOuthouse}
                                    sectionBg="bg-yellow-900/30"
                                />
                                <CostRow
                                    component={partData.costs.totalPurchaseCost}
                                    sectionBg="bg-pink-900/30 "
                                />

                                {/* Processing Cost Section */}
                                <CollapsibleSection
                                    sectionKey="processingCost"
                                    title="Processing Cost"
                                    totalComponent={
                                        partData.costs.processingCost.total
                                    }
                                    sectionBg="bg-purple-900/30"
                                >
                                    <CostRow
                                        component={
                                            partData.costs.processingCost.labor
                                        }
                                        isSubItem
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.processingCost
                                                .fohFixed
                                        }
                                        isSubItem
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.processingCost.fohVar
                                        }
                                        isSubItem
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.processingCost
                                                .unfinishDepre
                                        }
                                        isSubItem
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.processingCost
                                                .exclusiveDepre
                                        }
                                        isSubItem
                                    />
                                </CollapsibleSection>

                                {/* Total Cost */}
                                <CostRow
                                    component={partData.costs.totalCost}
                                    isGrandTotal
                                />
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Remark Popup Modal */}
            {selectedRemark && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 border-2 border-gray-600 rounded-none p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-semibold text-lg">
                                Remark for {selectedRemark}
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={closeRemark}
                                className="rounded-none border-gray-500 text-black p-1"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-none border border-gray-600">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {getRemarkContent(selectedRemark)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
