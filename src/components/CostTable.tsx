/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CostComponent } from "@/types/cost";
import { formatCurrency, getDifferenceColor } from "@/lib/utils";

interface CostTableProps {
  partData: any; // Should be typed properly based on your data structure
}

export default function CostTable({ partData }: CostTableProps) {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    nonLVA: true,
    lva: true,
    processingCost: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getChangeBadge = (percentage: number) => {
    if (percentage >= 5) {
      return <Badge variant="destructive" className="ml-2 rounded-none">Warning: +{percentage.toFixed(2)}%</Badge>;
    } else if (percentage > 0) {
      return <Badge variant="secondary" className="ml-2 rounded-none">+{percentage.toFixed(2)}%</Badge>;
    } else if (percentage < 0) {
      return <Badge variant="default" className="ml-2 bg-green-100 text-green-800 rounded-none">{percentage.toFixed(2)}%</Badge>;
    }
    return <Badge variant="outline" className="ml-2 text-white rounded-none">0.00%</Badge>;
  };

  const CostRow = ({ 
    component, 
    isSubItem = false, 
    isTotal = false, 
    isGrandTotal = false,
    sectionBg = ""
  }: { 
    component: CostComponent; 
    isSubItem?: boolean; 
    isTotal?: boolean; 
    isGrandTotal?: boolean;
    sectionBg?: string;
  }) => {
    const cellClass = isGrandTotal 
      ? "font-bold text-lg text-white" 
      : isTotal 
        ? "font-semibold text-white" 
        : "text-gray-300";
    
    const nameClass = isSubItem ? "pl-6" : "";
    const rowClass = isGrandTotal 
      ? "bg-gray-700 border-t-4 border-gray-500" 
      : isTotal 
        ? "border-b-2 border-gray-600" 
        : sectionBg 
          ? sectionBg 
          : "border-gray-700";

    return (
      <TableRow className={`${rowClass} hover:bg-gray-750 border-gray-600`}>
        <TableCell className={`${cellClass} ${nameClass}`}>
          {component.name}
        </TableCell>
        <TableCell className={`text-right ${cellClass}`}>
          {component.currentYear ? formatCurrency(component.currentYear) : ""}
        </TableCell>
        <TableCell className={`text-right ${cellClass}`}>
          {component.lastYear ? formatCurrency(component.lastYear) : ""}
        </TableCell>
        <TableCell className={`text-right ${cellClass}`}>
          {component.difference !== undefined && (
            <span className={getDifferenceColor(component.difference)}>
              {component.difference >= 0 ? '+' : '-'}{formatCurrency(Math.abs(component.difference))}
            </span>
          )}
        </TableCell>
        <TableCell className="text-right">
          {component.percentageChange !== undefined && getChangeBadge(component.percentageChange)}
        </TableCell>
      </TableRow>
    );
  };

  const CollapsibleSection = ({
    sectionKey,
    title,
    totalComponent,
    children,
    sectionBg
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
          className={`${sectionBg} hover:bg-gray-750 border-gray-600 cursor-pointer`}
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
            <span className={getDifferenceColor(totalComponent.difference)}>
              {totalComponent.difference >= 0 ? '+' : '-'}{formatCurrency(Math.abs(totalComponent.difference))}
            </span>
          </TableCell>
          <TableCell className="text-right">
            {getChangeBadge(totalComponent.percentageChange)}
          </TableCell>
        </TableRow>
        {isOpen && children}
      </>
    );
  };

  return (
    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
      <CardHeader>
        <CardTitle className="text-white">Cost Breakdown Analysis</CardTitle>
        <CardDescription className="text-gray-300">
          Detailed cost comparison showing year-over-year changes for all cost components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="w-[300px] text-gray-300">Cost Component</TableHead>
                <TableHead className="text-right text-gray-300">Current Year</TableHead>
                <TableHead className="text-right text-gray-300">Last Year</TableHead>
                <TableHead className="text-right text-gray-300">Difference</TableHead>
                <TableHead className="text-right text-gray-300">Change %</TableHead>
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
                <CostRow component={partData.costs.nonLVA.jsp} isSubItem />
                <CostRow component={partData.costs.nonLVA.msp} isSubItem />
              </CollapsibleSection>

              {/* LVA Section */}
              <CollapsibleSection
                sectionKey="lva"
                title="LVA"
                totalComponent={partData.costs.lva.total}
                sectionBg="bg-green-900/30"
              >
                <CostRow component={partData.costs.lva.localOH} isSubItem />
                <CostRow component={partData.costs.lva.rawMaterial} isSubItem />
              </CollapsibleSection>

              {/* Other Costs */}
              <CostRow component={partData.costs.toolingOuthouse} sectionBg="bg-yellow-900/30" />
              <CostRow component={partData.costs.totalPurchaseCost} sectionBg="bg-pink-900/30 " />

              {/* Processing Cost Section */}
              <CollapsibleSection
                sectionKey="processingCost"
                title="Processing Cost"
                totalComponent={partData.costs.processingCost.total}
                sectionBg="bg-purple-900/30"
              >
                <CostRow component={partData.costs.processingCost.labor} isSubItem />
                <CostRow component={partData.costs.processingCost.fohFixed} isSubItem />
                <CostRow component={partData.costs.processingCost.fohVar} isSubItem />
                <CostRow component={partData.costs.processingCost.unfinishDepre} isSubItem />
                <CostRow component={partData.costs.processingCost.exclusiveDepre} isSubItem />
              </CollapsibleSection>

              {/* Total Cost */}
              <CostRow component={partData.costs.totalCost} isGrandTotal />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
