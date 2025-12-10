/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
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
import { ChevronDown, ChevronRight, MessageSquare, X, Edit, Save, XCircle } from "lucide-react";
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
        packingCost: true,
    });

    const [openComponents, setOpenComponents] = useState<{
        [key: string]: boolean;
    }>({});

    const [selectedRemark, setSelectedRemark] = useState<string | null>(null);

    // Use ref to store adjustment values - NO re-render while typing!
    const adjustmentsRef = useRef<{ [key: string]: string }>({});

    const [savedAdjustments, setSavedAdjustments] = useState<{
        [key: string]: number | null;
    }>({});

    const [isEditMode, setIsEditMode] = useState(false);

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

    const handleAdjustmentChange = (componentKey: string, value: string) => {
        // Just update the ref, NO state change, NO re-render!
        adjustmentsRef.current[componentKey] = value;
    };

    const handleEdit = () => {
        // Load saved adjustments into ref
        adjustmentsRef.current = {};
        Object.keys(savedAdjustments).forEach(key => {
            if (savedAdjustments[key] !== null) {
                adjustmentsRef.current[key] = savedAdjustments[key]!.toString();
            }
        });
        setIsEditMode(true);
    };

    const handleCancel = () => {
        adjustmentsRef.current = {};
        setIsEditMode(false);
    };

    const handleSave = () => {
        // Convert string adjustments to numbers and save
        const numericAdjustments: { [key: string]: number | null } = {};
        Object.keys(adjustmentsRef.current).forEach(key => {
            const value = adjustmentsRef.current[key];
            if (value && value.trim() !== "") {
                const num = parseFloat(value);
                if (!isNaN(num)) {
                    numericAdjustments[key] = num;
                }
            }
        });
        setSavedAdjustments(numericAdjustments);
        adjustmentsRef.current = {};
        setIsEditMode(false);
        alert("Price adjustments have been saved successfully!");
    };

    const isAboveThreshold = (component: CostComponent) => {
        return Math.abs(component.percentageChange) > 15;
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
        if (Math.abs(percentage) > 15) {
            return (
                <Badge variant="destructive" className="ml-2 rounded-md">
                    Warning: {percentage > 0 ? '+' : ''}{percentage.toFixed(2)}%
                </Badge>
            );
        } else if (percentage !== 0) {
            return (
                <Badge variant="outline" className="ml-2 text-gray-900 border-gray-300 rounded-md">
                    {percentage > 0 ? '+' : ''}{percentage.toFixed(2)}%
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
            (component) => Math.abs(component.percentageChange) > 15
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

    const PartLevel2Row = ({ part, partKey }: { part: any; partKey: string }) => {
        const difference = part.currentYear.amount - part.lastYear.amount;
        const percentageChange = part.lastYear.amount !== 0 
            ? ((difference / part.lastYear.amount) * 100) 
            : 0;

        // Get saved adjustment value for display
        const adjustmentValue = savedAdjustments[partKey] || null;
        
        const adjustedAmount = adjustmentValue ?? part.currentYear.amount;
        const adjustedDifference = adjustedAmount - part.lastYear.amount;
        const adjustedPercentageChange = part.lastYear.amount !== 0
            ? ((adjustedDifference / part.lastYear.amount) * 100)
            : 0;

        return (
            <>
                {/* Main Level 2 Part Row - spans all columns */}
                <TableRow className="bg-gray-50 border-gray-300">
                    <TableCell colSpan={7} className="pl-12 py-2">
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
                                            <th className="text-right text-gray-600 py-1 px-2">Final Current Period</th>
                                            <th className="text-right text-gray-600 py-1 pl-2">Difference</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="text-gray-700 py-1 pr-2">Previous Period</td>
                                            <td className="text-right text-gray-700 py-1 px-2">{part.lastYear.quantity}</td>
                                            <td className="text-right text-gray-700 py-1 px-2">{formatCurrency(part.lastYear.pricePerItem)}</td>
                                            <td className="text-right text-gray-700 py-1 px-2">{formatCurrency(part.lastYear.amount)}</td>
                                            <td className="text-right text-gray-600 py-1 px-2">-</td>
                                            <td className="text-right text-gray-600 py-1 pl-2">-</td>
                                        </tr>
                                        <tr>
                                            <td className="text-gray-900 py-1 pr-2 font-medium">Current Period</td>
                                            <td className="text-right text-gray-900 py-1 px-2 font-medium">{part.currentYear.quantity}</td>
                                            <td className="text-right text-gray-900 py-1 px-2 font-medium">{formatCurrency(part.currentYear.pricePerItem)}</td>
                                            <td className="text-right text-gray-900 py-1 px-2 font-medium">{formatCurrency(part.currentYear.amount)}</td>
                                            <td className="text-right py-1 px-2" onClick={(e) => e.stopPropagation()}>
                                                {isEditMode ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Adjust"
                                                        defaultValue={adjustmentsRef.current[partKey] || ""}
                                                        onChange={(e) => handleAdjustmentChange(partKey, e.target.value)}
                                                        className="w-24 px-2 py-0.5 text-right border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
                                                    />
                                                ) : (
                                                    savedAdjustments[partKey] ? (
                                                        <span className="text-xs text-blue-600 font-medium">
                                                            {formatCurrency(savedAdjustments[partKey]!)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-900">
                                                            {formatCurrency(part.currentYear.amount)}
                                                        </span>
                                                    )
                                                )}
                                            </td>
                                            <td className="text-right py-1 pl-2">
                                                <span className="text-gray-900">
                                                    {(adjustmentValue !== null && adjustmentValue !== undefined ? adjustedDifference : difference) >= 0 ? "+" : "-"}
                                                    {formatCurrency(Math.abs(adjustmentValue !== null && adjustmentValue !== undefined ? adjustedDifference : difference))}
                                                </span>
                                                <div className="text-xs mt-1">
                                                    <span className={`${Math.abs(adjustmentValue !== null && adjustmentValue !== undefined ? adjustedPercentageChange : percentageChange) > 15 ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                                        ({(adjustmentValue !== null && adjustmentValue !== undefined ? adjustedPercentageChange : percentageChange) >= 0 ? "+" : ""}
                                                        {(adjustmentValue !== null && adjustmentValue !== undefined ? adjustedPercentageChange : percentageChange).toFixed(1)}%)
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
        componentKey,
    }: {
        component: CostComponent;
        isSubItem?: boolean;
        isTotal?: boolean;
        isGrandTotal?: boolean;
        sectionBg?: string;
        componentKey: string;
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

        // Calculate adjusted difference and percentage if there's a saved adjustment
        const adjustmentValue = savedAdjustments[componentKey];
        const adjustedAmount = adjustmentValue ?? component.currentYear;
        const adjustedDifference = adjustedAmount - component.lastYear;
        const adjustedPercentageChange = component.lastYear !== 0
            ? ((adjustedDifference / component.lastYear) * 100)
            : 0;

        const displayDifference = adjustmentValue !== null && adjustmentValue !== undefined 
            ? adjustedDifference 
            : component.difference;
        const displayPercentage = adjustmentValue !== null && adjustmentValue !== undefined 
            ? adjustedPercentageChange 
            : component.percentageChange;

        return (
            <>
                <TableRow
                    className={`${rowClass} border-gray-300 ${hasLevel2Parts ? 'cursor-pointer' : ''}`}
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
                            {isSubItem && !hasLevel2Parts && (
                                <span className="mr-2 text-gray-600">•</span>
                            )}
                            {component.name}
                        </div>
                    </TableCell>
                <TableCell className={`text-right ${cellClass}`}>
                    {component.currentYear
                        ? formatCurrency(component.currentYear)
                        : ""}
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    {isEditMode && !isTotal && !isGrandTotal && !hasLevel2Parts && componentKey !== "totalPurchaseCost" ? (
                        <input
                            type="text"
                            placeholder="Enter amount"
                            defaultValue={adjustmentsRef.current[componentKey] || ""}
                            onChange={(e) => handleAdjustmentChange(componentKey, e.target.value)}
                            className="w-full px-2 py-1 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    ) : !isTotal && !isGrandTotal && !hasLevel2Parts && componentKey !== "totalPurchaseCost" ? (
                        savedAdjustments[componentKey] ? (
                            <span className="text-sm text-blue-600 font-medium">
                                {formatCurrency(savedAdjustments[componentKey]!)}
                            </span>
                        ) : (
                            <span className={`text-sm ${cellClass}`}>
                                {formatCurrency(component.currentYear)}
                            </span>
                        )
                    ) : (
                        <span className={`${cellClass}`}>
                            {component.currentYear ? formatCurrency(component.currentYear) : ""}
                        </span>
                    )}
                </TableCell>
                <TableCell className={`text-right ${cellClass}`}>
                    {component.lastYear
                        ? formatCurrency(component.lastYear)
                        : ""}
                </TableCell>
                <TableCell className={`text-right ${cellClass}`}>
                    {displayDifference !== undefined && (
                        <span
                            className={getDifferenceColor(displayDifference)}
                        >
                            {displayDifference >= 0 ? "+" : "-"}
                            {formatCurrency(Math.abs(displayDifference))}
                        </span>
                    )}
                </TableCell>
                <TableCell className="text-right">
                    {displayPercentage !== undefined &&
                        component.name !== "Total Cost" &&
                        getChangeBadge(displayPercentage)}
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
                    <PartLevel2Row 
                        key={`${componentKey}-part-${index}`} 
                        part={part} 
                        partKey={`${componentKey}-part-${part.partNumber || index}`}
                    />
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
                    className={`${sectionBg} border-gray-300 cursor-pointer`}
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
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-gray-900">
                                Cost Breakdown Analysis
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Detailed cost comparison showing year-over-year changes
                                for all cost components
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            {!isEditMode ? (
                                <Button
                                    onClick={handleEdit}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={handleCancel}
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <Save className="h-4 w-4 mr-1" />
                                        Save
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
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
                                        Current Period
                                    </TableHead>
                                    <TableHead className="text-right text-gray-700">
                                        Final Current Period
                                    </TableHead>
                                    <TableHead className="text-right text-gray-700">
                                        Previous Period
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
                                    componentKey="toolingOuthouse"
                                />
                                <CostRow
                                    component={partData.costs.totalPurchaseCost}
                                    sectionBg="bg-pink-50"
                                    componentKey="totalPurchaseCost"
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
                                        componentKey="labor"
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.processingCost
                                                .fohFixed
                                        }
                                        isSubItem
                                        componentKey="fohFixed"
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.processingCost.fohVar
                                        }
                                        isSubItem
                                        componentKey="fohVar"
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.processingCost
                                                .unfinishDepre
                                        }
                                        isSubItem
                                        componentKey="unfinishDepre"
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.processingCost
                                                .exclusiveDepre
                                        }
                                        isSubItem
                                        componentKey="exclusiveDepre"
                                    />
                                </CollapsibleSection>

                                {/* Packing Cost Section */}
                                <CollapsibleSection
                                    sectionKey="packingCost"
                                    title="Packing Cost"
                                    totalComponent={
                                        partData.costs.packingCost.total
                                    }
                                    sectionBg="bg-teal-50"
                                >
                                    <CostRow
                                        component={
                                            partData.costs.packingCost.material
                                        }
                                        isSubItem
                                        componentKey="packingMaterial"
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.packingCost.labor
                                        }
                                        isSubItem
                                        componentKey="packingLabor"
                                    />
                                    <CostRow
                                        component={
                                            partData.costs.packingCost.inland
                                        }
                                        isSubItem
                                        componentKey="packingInland"
                                    />
                                </CollapsibleSection>

                                {/* Total Cost */}
                                <CostRow
                                    component={partData.costs.totalCost}
                                    isGrandTotal
                                    componentKey="totalCost"
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
