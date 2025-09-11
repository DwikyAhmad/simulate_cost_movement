"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { engineParts } from "@/data/sampleData";
import { formatCurrency, getDifferenceColor } from "@/lib/utils";
import { CostComponent } from "@/types/cost";

interface ComparisonTableProps {
  selectedParts: string[];
}

export default function ComparisonTable({ selectedParts }: ComparisonTableProps) {
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

  const getChangeBadge = (percentage: number, size: 'sm' | 'xs' = 'xs') => {
    const baseClasses = `rounded-none ${size === 'xs' ? 'text-xs px-1' : 'text-sm px-2'}`;
    
    if (percentage >= 5) {
      return <Badge variant="destructive" className={baseClasses}>+{percentage.toFixed(2)}%</Badge>;
    } else if (percentage > 0) {
      return <Badge variant="secondary" className={baseClasses}>+{percentage.toFixed(2)}%</Badge>;
    } else if (percentage < 0) {
      return <Badge variant="default" className={`${baseClasses} bg-green-100 text-green-800`}>{percentage.toFixed(2)}%</Badge>;
    }
    return <Badge variant="outline" className={`${baseClasses} text-white`}>0.00%</Badge>;
  };


  const CostComparisonRow = ({ 
    componentName,
    getComponent,
    isSubItem = false,
    isTotal = false,
    isGrandTotal = false,
    sectionBg = ""
  }: {
    componentName: string;
    getComponent: (partNo: string) => CostComponent;
    isSubItem?: boolean;
    isTotal?: boolean;
    isGrandTotal?: boolean;
    sectionBg?: string;
  }) => {
    const cellClass = isGrandTotal 
      ? "font-bold text-white" 
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
        <TableCell className={`${cellClass} ${nameClass} sticky left-0 bg-gray-800 min-w-[200px]`}>
          {componentName}
        </TableCell>
        {selectedParts.map((partNo) => {
          const component = getComponent(partNo);
          return (
            <TableCell key={partNo} className="text-center min-w-[180px]">
              <div className="space-y-1">
                <div className={`text-sm font-semibold ${cellClass}`}>
                  {formatCurrency(component.currentYear)}
                </div>
                <div className={`text-xs ${getDifferenceColor(component.difference)}`}>
                  {component.difference >= 0 ? '+' : ''}{formatCurrency(component.difference)}
                </div>
                <div>
                  {getChangeBadge(component.percentageChange)}
                </div>
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  const CollapsibleSection = ({
    sectionKey,
    title,
    children,
    sectionBg
  }: {
    sectionKey: string;
    title: string;
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
          <TableCell className="font-semibold text-white sticky left-0 bg-gray-800">
            <div className="flex items-center">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2" />
              )}
              {title}
            </div>
          </TableCell>
          {selectedParts.map((partNo) => {
            const part = engineParts[partNo];
            let totalComponent;
            
            switch (sectionKey) {
              case 'nonLVA':
                totalComponent = part.costs.nonLVA.total;
                break;
              case 'lva':
                totalComponent = part.costs.lva.total;
                break;
              case 'processingCost':
                totalComponent = part.costs.processingCost.total;
                break;
              default:
                return null;
            }

            return (
              <TableCell key={partNo} className="text-center">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white">
                    {formatCurrency(totalComponent.currentYear)}
                  </div>
                  <div className={`text-xs ${getDifferenceColor(totalComponent.difference)}`}>
                    {totalComponent.difference >= 0 ? '+' : ''}{formatCurrency(totalComponent.difference)}
                  </div>
                  <div>
                    {getChangeBadge(totalComponent.percentageChange)}
                  </div>
                </div>
              </TableCell>
            );
          })}
        </TableRow>
        {isOpen && children}
      </>
    );
  };

  if (selectedParts.length === 0) {
    return (
      <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
        <CardContent className="py-12 text-center">
          <div className="text-gray-400">
            Select parts using the selector above to view detailed comparison
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
      <CardHeader>
        <div>
          <CardTitle className="text-white">Detailed Cost Comparison</CardTitle>
          <CardDescription className="text-gray-300">
            Side-by-side comparison of cost components across {selectedParts.length} parts
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="text-gray-300 sticky left-0 bg-gray-800 min-w-[200px]">
                  Cost Component
                </TableHead>
                {selectedParts.map((partNo) => (
                  <TableHead key={partNo} className="text-center text-gray-300 min-w-[180px]">
                    <div className="space-y-1">
                      <div className="font-mono font-semibold">{partNo}</div>
                      <div className="text-xs text-gray-400">
                        Current / Change / %
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Non-LVA Section */}
              <CollapsibleSection
                sectionKey="nonLVA"
                title="NON LVA"
                sectionBg="bg-blue-900/30"
              >
                <CostComparisonRow 
                  componentName="JSP"
                  getComponent={(partNo) => engineParts[partNo].costs.nonLVA.jsp}
                  isSubItem 
                />
                <CostComparisonRow 
                  componentName="MSP"
                  getComponent={(partNo) => engineParts[partNo].costs.nonLVA.msp}
                  isSubItem 
                />
              </CollapsibleSection>

              {/* LVA Section */}
              <CollapsibleSection
                sectionKey="lva"
                title="LVA"
                sectionBg="bg-green-900/30"
              >
                <CostComparisonRow 
                  componentName="Local OH"
                  getComponent={(partNo) => engineParts[partNo].costs.lva.localOH}
                  isSubItem 
                />
                <CostComparisonRow 
                  componentName="Raw Material"
                  getComponent={(partNo) => engineParts[partNo].costs.lva.rawMaterial}
                  isSubItem 
                />
              </CollapsibleSection>

              {/* Other Costs */}
              <CostComparisonRow 
                componentName="Tooling Outhouse"
                getComponent={(partNo) => engineParts[partNo].costs.toolingOuthouse}
                sectionBg="bg-yellow-900/30" 
              />
              <CostComparisonRow 
                componentName="Total Purchase Cost"
                getComponent={(partNo) => engineParts[partNo].costs.totalPurchaseCost}
                sectionBg="bg-pink-900/30" 
              />

              {/* Processing Cost Section */}
              <CollapsibleSection
                sectionKey="processingCost"
                title="Processing Cost"
                sectionBg="bg-purple-900/30"
              >
                <CostComparisonRow 
                  componentName="Labor"
                  getComponent={(partNo) => engineParts[partNo].costs.processingCost.labor}
                  isSubItem 
                />
                <CostComparisonRow 
                  componentName="FOH Fixed"
                  getComponent={(partNo) => engineParts[partNo].costs.processingCost.fohFixed}
                  isSubItem 
                />
                <CostComparisonRow 
                  componentName="FOH Variable"
                  getComponent={(partNo) => engineParts[partNo].costs.processingCost.fohVar}
                  isSubItem 
                />
                <CostComparisonRow 
                  componentName="Unfinish Depreciation"
                  getComponent={(partNo) => engineParts[partNo].costs.processingCost.unfinishDepre}
                  isSubItem 
                />
                <CostComparisonRow 
                  componentName="Exclusive Depreciation"
                  getComponent={(partNo) => engineParts[partNo].costs.processingCost.exclusiveDepre}
                  isSubItem 
                />
              </CollapsibleSection>

              {/* Total Cost */}
              <CostComparisonRow 
                componentName="Total Cost"
                getComponent={(partNo) => engineParts[partNo].costs.totalCost}
                isGrandTotal 
              />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
