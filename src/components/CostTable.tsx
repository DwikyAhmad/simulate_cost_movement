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
                <Badge variant="destructive" className="ml-2 rounded-md">
                    Warning: +{percentage.toFixed(2)}%
                </Badge>
            );
        } else if (percentage > 0) {
            return (
                <Badge variant="secondary" className="ml-2 rounded-md">
                    +{percentage.toFixed(2)}%
                </Badge>
            );
        } else if (percentage < 0) {
            return (
                <Badge
                    variant="default"
                    className="ml-2 bg-green-100 text-green-800 rounded-md"
                >
                    {percentage.toFixed(2)}%
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className="ml-2 text-gray-700 rounded-md">
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
                <Badge className="ml-2 rounded-md">
                    {aboveThreshold} of {totalChildren} above threshold
                </Badge>
            );
        } else {
            return (
                <Badge
                    variant="outline"
                    className="ml-2 text-gray-700 rounded-md"
                >
                    All stable
                </Badge>
            );
        }
    };

    const PartLevel2Row = ({ part }: { part: any }) => {
        const difference = part.currentYear.amount - part.lastYear.amount;
        const percentageChange = part.lastYear.amount !== 0 
            ? ((difference / part.lastYear.amount) * 100) 
            : 0;

        return (
            <>
                {/* Main Level 2 Part Row - spans all columns */}
                <TableRow className="bg-gray-50 border-gray-300">
                    <TableCell colSpan={6} className="pl-12 py-2">
                        <div className="bg-white border border-gray-300 rounded-md p-3 shadow-sm">
                            <div className="text-sm font-medium text-gray-900 mb-2">
                                {part.partNumber} - {part.partName}
                            </div>
                            
                            {/* Detailed breakdown table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-gray-300">
                                            <th className="text-left text-gray-600 py-1 pr-2">Period</th>
                                            <th className="text-right text-gray-600 py-1 px-2">Quantity</th>
                                            <th className="text-right text-gray-600 py-1 px-2">Price/Item</th>
                                            <th className="text-right text-gray-600 py-1 px-2">Total Amount</th>
                                            <th className="text-right text-gray-600 py-1 pl-2">Difference</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="text-gray-700 py-1 pr-2">Last Year</td>
                                            <td className="text-right text-gray-700 py-1 px-2">{part.lastYear.quantity}</td>
                                            <td className="text-right text-gray-700 py-1 px-2">{formatCurrency(part.lastYear.pricePerItem)}</td>
                                            <td className="text-right text-gray-700 py-1 px-2">{formatCurrency(part.lastYear.amount)}</td>
                                            <td className="text-right text-gray-600 py-1 pl-2">-</td>
                                        </tr>
                                        <tr>
                                            <td className="text-gray-900 py-1 pr-2 font-medium">Current Year</td>
                                            <td className="text-right text-gray-900 py-1 px-2 font-medium">{part.currentYear.quantity}</td>
                                            <td className="text-right text-gray-900 py-1 px-2 font-medium">{formatCurrency(part.currentYear.pricePerItem)}</td>
                                            <td className="text-right text-gray-900 py-1 px-2 font-medium">{formatCurrency(part.currentYear.amount)}</td>
                                            <td className="text-right py-1 pl-2">
                                                <span className={getDifferenceColor(difference)}>
                                                    {difference >= 0 ? "+" : "-"}{formatCurrency(Math.abs(difference))}
                                                </span>
                                                <div className="text-xs mt-1">
                                                    <span className={`${percentageChange >= 0 ? 'text-red-500' : 'text-green-600'}`}>
                                                        ({percentageChange >= 0 ? "+" : ""}{percentageChange.toFixed(1)}%)
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            </>
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
            ? "font-bold text-lg text-gray-900"
            : isTotal
            ? "font-semibold text-gray-900"
            : "text-gray-900";

        const nameClass = isSubItem ? "pl-6" : "";
        const rowClass = isGrandTotal
            ? "bg-blue-100 border-t-4 border-blue-300"
            : isTotal
            ? "border-b-2 border-gray-300"
            : sectionBg
            ? sectionBg
            : "border-gray-200";

        const hasLevel2Parts = component.parts && component.parts.length > 0;
        const isComponentOpen = openComponents[componentKey];

        return (
            <>
                <TableRow
                    className={`${rowClass} border-gray-300 ${hasLevel2Parts ? 'cursor-pointer hover:bg-gray-50' : ''}`}
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
                                className="rounded-md border-blue-300 text-gray-900 hover:bg-blue-50"
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
                    className={`${sectionBg} border-gray-300 cursor-pointer hover:opacity-90`}
                    onClick={() => toggleSection(sectionKey)}
                >
                    <TableCell className="font-semibold text-gray-900">
                        <div className="flex items-center">
                            {isOpen ? (
                                <ChevronDown className="h-4 w-4 mr-2" />
                            ) : (
                                <ChevronRight className="h-4 w-4 mr-2" />
                            )}
                            {title}
                        </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                        {formatCurrency(totalComponent.currentYear)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
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
            <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-gray-900">
                        Cost Breakdown Analysis
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Detailed cost comparison showing year-over-year changes
                        for all cost components
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-300 bg-gray-50">
                                    <TableHead className="w-[300px] text-gray-700">
                                        Cost Component
                                    </TableHead>
                                    <TableHead className="text-right text-gray-700">
                                        Current Year
                                    </TableHead>
                                    <TableHead className="text-right text-gray-700">
                                        Last Year
                                    </TableHead>
                                    <TableHead className="text-right text-gray-700">
                                        Difference
                                    </TableHead>
                                    <TableHead className="text-right text-gray-700">
                                        Change %
                                    </TableHead>
                                    <TableHead className="text-center text-gray-700">
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
                                    sectionBg="bg-blue-50"
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
                                    sectionBg="bg-green-50"
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
                                    sectionBg="bg-yellow-50"
                                />
                                <CostRow
                                    component={partData.costs.totalPurchaseCost}
                                    sectionBg="bg-pink-50"
                                />

                                {/* Processing Cost Section */}
                                <CollapsibleSection
                                    sectionKey="processingCost"
                                    title="Processing Cost"
                                    totalComponent={
                                        partData.costs.processingCost.total
                                    }
                                    sectionBg="bg-purple-50"
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
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-900 font-semibold text-lg">
                                Remark for {selectedRemark}
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={closeRemark}
                                className="rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 p-1"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-300">
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {getRemarkContent(selectedRemark)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
