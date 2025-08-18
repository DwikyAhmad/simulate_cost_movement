"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { RefreshCw, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { engineParts } from "@/data/sampleData";
import { CostComponent } from "@/types/cost";
import EnginePartsList from "@/components/EnginePartsList";

export default function CostMovementSimulation() {
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedPart, setSelectedPart] = useState<string>("120000Y140");
  const [selectedMonth, setSelectedMonth] = useState<string>("august-2025");
  const [comparisonYear, setComparisonYear] = useState<string>("2024");
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    nonLVA: true,
    lva: true,
    processingCost: true
  });

  const handleSelectPart = (partNo: string) => {
    setSelectedPart(partNo);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (currentView === 'list') {
    return <EnginePartsList onSelectPart={handleSelectPart} />;
  }

  const currentPart = engineParts[selectedPart];

  // Convert selected month to display format
  const getDisplayDate = (monthValue: string) => {
    const monthMap: { [key: string]: string } = {
      "august-2025": "August 2025",
      "july-2025": "July 2025", 
      "june-2025": "June 2025",
      "may-2025": "May 2025",
      "april-2025": "April 2025",
      "march-2025": "March 2025"
    };
    return monthMap[monthValue] || "August 2025";
  };

  const getComparisonDate = (monthValue: string, compYear: string) => {
    const monthName = monthValue.split('-')[0];
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return `${capitalizedMonth} ${compYear}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getDifferenceColor = (change: number) => {
    if (change > 0) return "text-red-400";
    if (change < 0) return "text-green-400";
    return "text-gray-300";
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
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-600 p-4 md:p-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
              <Button 
                onClick={handleBackToList}
                variant="outline" 
                className="flex items-center gap-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 w-fit"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to List</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Cost Movement Detail</h1>
                <p className="text-gray-300 mt-1 text-sm md:text-base">Detailed cost analysis for {currentPart.partNo}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 w-fit md:w-auto"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh Data</span>
              <span className="sm:hidden">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white">Simulation Controls</CardTitle>
            <CardDescription className="text-gray-300">Select engine part and time period for cost analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Part Number</label>
                <Select value={selectedPart} onValueChange={setSelectedPart}>
                  <SelectTrigger className="rounded-none border-2 border-gray-600 bg-gray-700 text-white">
                    <SelectValue placeholder="Select part number" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {Object.keys(engineParts).map((partNo) => (
                      <SelectItem key={partNo} value={partNo} className="text-white hover:bg-gray-600">
                        {partNo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Current Period (2025)</label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="rounded-none border-2 border-gray-600 bg-gray-700 text-white">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="august-2025" className="text-white hover:bg-gray-600">August 2025</SelectItem>
                    <SelectItem value="july-2025" className="text-white hover:bg-gray-600">July 2025</SelectItem>
                    <SelectItem value="june-2025" className="text-white hover:bg-gray-600">June 2025</SelectItem>
                    <SelectItem value="may-2025" className="text-white hover:bg-gray-600">May 2025</SelectItem>
                    <SelectItem value="april-2025" className="text-white hover:bg-gray-600">April 2025</SelectItem>
                    <SelectItem value="march-2025" className="text-white hover:bg-gray-600">March 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Comparison Year</label>
                <Select value={comparisonYear} onValueChange={setComparisonYear}>
                  <SelectTrigger className="rounded-none border-2 border-gray-600 bg-gray-700 text-white">
                    <SelectValue placeholder="Select comparison year" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="2024" className="text-white hover:bg-gray-600">2024</SelectItem>
                    <SelectItem value="2023" className="text-white hover:bg-gray-600">2023</SelectItem>
                    <SelectItem value="2022" className="text-white hover:bg-gray-600">2022</SelectItem>
                    <SelectItem value="2021" className="text-white hover:bg-gray-600">2021</SelectItem>
                    <SelectItem value="2020" className="text-white hover:bg-gray-600">2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Part Information */}
        <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <span>Part Information</span>
              <Badge variant="outline" className="text-lg px-4 py-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white">{currentPart.partNo}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-400">Current Period</p>
                <p className="text-lg font-semibold text-white">{getDisplayDate(selectedMonth)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Comparison Period</p>
                <p className="text-lg font-semibold text-white">{getComparisonDate(selectedMonth, comparisonYear)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown Table */}
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
                  totalComponent={currentPart.costs.nonLVA.total}
                  sectionBg="bg-blue-900/30"
                >
                  <CostRow component={currentPart.costs.nonLVA.jsp} isSubItem />
                  <CostRow component={currentPart.costs.nonLVA.msp} isSubItem />
                </CollapsibleSection>

                {/* LVA Section */}
                <CollapsibleSection
                  sectionKey="lva"
                  title="LVA"
                  totalComponent={currentPart.costs.lva.total}
                  sectionBg="bg-green-900/30"
                >
                  <CostRow component={currentPart.costs.lva.localOH} isSubItem />
                  <CostRow component={currentPart.costs.lva.rawMaterial} isSubItem />
                </CollapsibleSection>

                {/* Other Costs */}
                <CostRow component={currentPart.costs.toolingOuthouse} sectionBg="bg-yellow-900/30" />
                <CostRow component={currentPart.costs.totalPurchaseCost} sectionBg="bg-pink-900/30 " />

                {/* Processing Cost Section */}
                <CollapsibleSection
                  sectionKey="processingCost"
                  title="Processing Cost"
                  totalComponent={currentPart.costs.processingCost.total}
                  sectionBg="bg-purple-900/30"
                >
                  <CostRow component={currentPart.costs.processingCost.labor} isSubItem />
                  <CostRow component={currentPart.costs.processingCost.fohFixed} isSubItem />
                  <CostRow component={currentPart.costs.processingCost.fohVar} isSubItem />
                  <CostRow component={currentPart.costs.processingCost.unfinishDepre} isSubItem />
                  <CostRow component={currentPart.costs.processingCost.exclusiveDepre} isSubItem />
                </CollapsibleSection>

                {/* Total Cost */}
                <CostRow component={currentPart.costs.totalCost} isGrandTotal />
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Cost Change</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getDifferenceColor(currentPart.costs.totalCost.difference)}`}>
                {currentPart.costs.totalCost.difference >= 0 ? '+' : '-'}{formatCurrency(Math.abs(currentPart.costs.totalCost.difference))}
              </div>
              <p className="text-xs text-gray-400">
                {currentPart.costs.totalCost.percentageChange >= 0 ? '+' : ''}{currentPart.costs.totalCost.percentageChange.toFixed(2)}% from last year
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Purchase Cost Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getDifferenceColor(currentPart.costs.totalPurchaseCost.difference)}`}>
                {currentPart.costs.totalPurchaseCost.difference >= 0 ? '+' : '-'}{formatCurrency(Math.abs(currentPart.costs.totalPurchaseCost.difference))}
              </div>
              <p className="text-xs text-gray-400">
                {currentPart.costs.totalPurchaseCost.percentageChange >= 0 ? '+' : ''}{currentPart.costs.totalPurchaseCost.percentageChange.toFixed(2)}% from last year
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Processing Cost Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getDifferenceColor(currentPart.costs.processingCost.total.difference)}`}>
                {currentPart.costs.processingCost.total.difference >= 0 ? '+' : '-'}{formatCurrency(Math.abs(currentPart.costs.processingCost.total.difference))}
              </div>
              <p className="text-xs text-gray-400">
                {currentPart.costs.processingCost.total.percentageChange >= 0 ? '+' : ''}{currentPart.costs.processingCost.total.percentageChange.toFixed(2)}% from last year
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Warning Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {[
                  currentPart.costs.nonLVA.jsp,
                  currentPart.costs.nonLVA.msp,
                  currentPart.costs.nonLVA.total,
                  currentPart.costs.lva.localOH,
                  currentPart.costs.lva.rawMaterial,
                  currentPart.costs.lva.total,
                  currentPart.costs.toolingOuthouse,
                  currentPart.costs.totalPurchaseCost,
                  currentPart.costs.processingCost.labor,
                  currentPart.costs.processingCost.fohFixed,
                  currentPart.costs.processingCost.fohVar,
                  currentPart.costs.processingCost.unfinishDepre,
                  currentPart.costs.processingCost.exclusiveDepre,
                  currentPart.costs.processingCost.total,
                  currentPart.costs.totalCost
                ].filter(item => item.percentageChange >= 5).length}
              </div>
              <p className="text-xs text-gray-400">
                Components ≥5% increase
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}