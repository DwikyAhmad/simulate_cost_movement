"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Download, FileSpreadsheet, Search, Calculator, RefreshCw } from 'lucide-react';
import { engineParts } from '@/data/sampleData';
import { EnginePart } from '@/types/cost';

interface FOBCalculation {
  partNo: string;
  engineType: string;
  exchangeRate: number;
  salesVolume: string;
  imap: number;
  fobPriceUSD: number;
  fobPriceRP: number;
  totalExportCost: number;
  exportCost: number;
  fobCharge: number;
  packingCost: number;
  totalExFactoryPrice: number;
  tmminOP: number;
  sellingGeneralAdmin: number;
  tmminGP: number;
  totMfgCost: number;
  totalMfgCostWithID: number;
  royalty: number;
  lva: number;
  totalPartCost: number;
  localCosts: number;
  inhouse: {
    rawMaterial: number;
    fohFix: number;
    fohVariable: number;
    totalFOH: number;
    totalLabor: number;
    exclusiveDepreciation: number;
    commonDepreciation: number;
    totalDepreciation: number;
    toolingInstallments: number;
    toolingAdvance: number;
    totalTooling: number;
    ohInsurance: number;
  };
}

export default function CalculationPage() {
  const [calculations, setCalculations] = useState<FOBCalculation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Master data values (these would normally come from the master data page)
  const masterData = {
    exchangeRate: 16374,
    tmminOP: 3.5,
    sellingGeneralAdmin: 1.37,
    royalty: 6,
    inlandInsuranceJSP: 0.06,
    inlandInsuranceMSP: 0.10,
    ohInsurance: 0.2018
  };

  const generateCalculations = useCallback(() => {
    setIsLoading(true);
    
    // Simulate calculation process
    setTimeout(() => {
      const calculatedData: FOBCalculation[] = Object.values(engineParts).map((part: EnginePart) => {
        const imap = 0.018; // IMAP margin
        const fobPriceUSD = 1589.54; // Sample FOB price
        const salesVolume = part.partNo === "120000Y140" ? "FALSE" : "186";
        
        return {
          partNo: part.partNo,
          engineType: getEngineType(part.partNo),
          exchangeRate: masterData.exchangeRate,
          salesVolume,
          imap,
          fobPriceUSD,
          fobPriceRP: fobPriceUSD * masterData.exchangeRate,
          totalExportCost: 25116143.202,
          exportCost: 593466.424,
          fobCharge: 331620.708014308000,
          packingCost: 261845.908992909200,
          totalExFactoryPrice: 25433624.977,
          tmminOP: 910948.199,
          sellingGeneralAdmin: 344091.162,
          tmminGP: 1255039.361,
          totMfgCost: 24178.586,
          totalMfgCostWithID: 24178.586,
          royalty: 1081950.743,
          lva: 18032512.389,
          totalPartCost: 23096634.873104800,
          localCosts: 15102.056,
          inhouse: {
            rawMaterial: 871.019,
            fohFix: 1739.660,
            fohVariable: 1137.561,
            totalFOH: 2877.221,
            totalLabor: 2244.936,
            exclusiveDepreciation: 372.743,
            commonDepreciation: 507.832,
            totalDepreciation: 880.575,
            toolingInstallments: 0,
            toolingAdvance: 157.039,
            totalTooling: 157.039,
            ohInsurance: 16.456
          }
        };
      });
      
      setCalculations(calculatedData);
      setIsLoading(false);
    }, 2000);
  }, [masterData.exchangeRate]);

  const getEngineType = (partNo: string): string => {
    const engineTypes: { [key: string]: string } = {
      "120000Y140": "2TR/AT",
      "120000Y170": "UMWT",
      "120000Y200": "1GR-FE"
    };
    return engineTypes[partNo] || "UNKNOWN";
  };

  const filteredCalculations = calculations.filter(calc =>
    calc.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.engineType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportToExcel = () => {
    console.log('Exporting calculation data to Excel...');
    alert('Excel export functionality would be implemented here. This would generate a detailed FOB calculation spreadsheet.');
  };

  const handleDownloadPDF = () => {
    console.log('Downloading calculation as PDF...');
    alert('PDF download functionality would be implemented here.');
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Initialize calculations on component mount
  if (calculations.length === 0 && !isLoading) {
    generateCalculations();
  }

  return (
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-600 p-4 md:p-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline" 
                className="flex items-center gap-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 w-fit"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  TR E/G MSP PRICE Full CAL Format
                </h1>
                <p className="text-gray-300 mt-1 text-sm md:text-base">
                  Original After cost reduction revised - FOB Price Calculation and Export
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={generateCalculations}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500 px-4 py-2"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Calculating...' : 'Recalculate'}
              </Button>
              <Button
                onClick={handleExportToExcel}
                className="bg-green-600 hover:bg-green-700 text-white rounded-none border-2 border-green-500 px-4 py-2"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 border border-gray-600 p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Engine Parts
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Search by part number or engine type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                />
                <div className="bg-gray-600 border border-gray-500 rounded px-3 py-2 flex items-center">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Exchange Rate (Rp/US$)
              </label>
              <Input
                value={masterData.exchangeRate.toLocaleString()}
                readOnly
                className="bg-gray-600 border-gray-500 text-white"
              />
            </div>
          </div>
        </div>

        {/* Calculation Results */}
        {isLoading ? (
          <div className="bg-gray-800 border border-gray-600 p-12 text-center">
            <Calculator className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
            <p className="text-white text-lg">Calculating FOB prices...</p>
            <p className="text-gray-400 text-sm">Processing engine cost data and calculations</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCalculations.map((calc) => (
              <div key={calc.partNo} className="bg-gray-800 border border-gray-600 rounded-none">
                {/* Engine Header */}
                <div className="bg-green-600 text-white p-4 font-bold text-lg">
                  {calc.engineType} - Part No: {calc.partNo}
                </div>
                
                {/* Calculation Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    {/* Basic Information */}
                    <tbody>
                      <tr className="bg-blue-100">
                        <td className="border border-gray-600 p-2 font-medium bg-gray-700 text-white">Exchange Rate</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">Rp/US$</td>
                        <td className="border border-gray-600 p-2 bg-white text-black font-bold">{calc.exchangeRate.toLocaleString()}</td>
                        <td className="border border-gray-600 p-2 font-medium bg-gray-700 text-white">Sales Volume</td>
                        <td className="border border-gray-600 p-2 bg-white text-black font-bold">{calc.salesVolume}</td>
                      </tr>
                      
                      {/* FOB Section */}
                      <tr className="bg-green-400">
                        <td className="border border-gray-600 p-2 font-bold text-black" colSpan={2}>
                          FOB2 (TMAP to Dist) (US$)
                        </td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white">TMAP Mgn (US$)</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">{calc.imap}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      <tr>
                        <td className="border border-gray-600 p-2 bg-yellow-200 text-black font-bold">FOB Price (US$)</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">1</td>
                        <td className="border border-gray-600 p-2 bg-white text-black text-xs">2 / ex rate</td>
                        <td className="border border-gray-600 p-2 bg-white text-black font-bold">{formatUSD(calc.fobPriceUSD)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white">FOB Price (RP)</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">2</td>
                        <td className="border border-gray-600 p-2 bg-white text-xs text-red-600">3+9</td>
                        <td className="border border-gray-600 p-2 bg-white text-black font-bold">{formatCurrency(calc.fobPriceRP)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      {/* Export Costs */}
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white">TOTAL EXPORT COST w/o interest</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">3</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">0</td>
                        <td className="border border-gray-600 p-2 bg-white text-black font-bold">{formatCurrency(calc.totalExportCost)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white pl-8">Export Cost</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">4</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                        <td className="border border-gray-600 p-2 bg-white text-black">{formatCurrency(calc.exportCost)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      {/* Manufacturing Costs */}
                      <tr className="bg-yellow-200">
                        <td className="border border-gray-600 p-2 bg-yellow-200 text-black font-bold">TMMIN E/G OP</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">3.50%</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">9</td>
                        <td className="border border-gray-600 p-2 bg-white text-xs text-red-600">3/(1-3.5%)*3.5%</td>
                        <td className="border border-gray-600 p-2 bg-white text-black font-bold">{formatCurrency(calc.tmminOP)}</td>
                      </tr>
                      
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white">Selling & General Admin</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">1.37%</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">10</td>
                        <td className="border border-gray-600 p-2 bg-white text-xs text-red-600">3 x 1.37%</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">{formatCurrency(calc.sellingGeneralAdmin)}</td>
                      </tr>
                      
                      {/* LVA Section */}
                      <tr className="bg-yellow-200">
                        <td className="border border-gray-600 p-2 bg-yellow-200 text-black font-bold">LVA</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">21A</td>
                        <td className="border border-gray-600 p-2 bg-white text-red-600">2 - 38</td>
                        <td className="border border-gray-600 p-2 bg-white text-black font-bold">{formatCurrency(calc.lva)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      {/* Local Costs */}
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white">LOCAL COSTS</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">23</td>
                        <td className="border border-gray-600 p-2 bg-white text-red-600">37 + 924</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">{formatCurrency(calc.localCosts)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      {/* Inhouse Costs */}
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white font-bold">INHOUSE</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">24</td>
                        <td className="border border-gray-600 p-2 bg-white text-red-600">32 +32 +29 +28 +26</td>
                        <td className="border border-gray-600 p-2 bg-white text-black font-bold">{formatCurrency(calc.inhouse.rawMaterial + calc.inhouse.totalFOH + calc.inhouse.totalLabor + calc.inhouse.totalDepreciation + calc.inhouse.totalTooling)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white pl-8">RAW MATERIAL</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">V</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">25</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">{formatCurrency(calc.inhouse.rawMaterial)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white pl-8">FOH Fix</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">F</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">26</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">{formatCurrency(calc.inhouse.fohFix)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      <tr>
                        <td className="border border-gray-600 p-2 bg-gray-700 text-white pl-8">FOH Variable</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">V</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">27</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">{formatCurrency(calc.inhouse.fohVariable)}</td>
                        <td className="border border-gray-600 p-2 bg-white text-black"></td>
                      </tr>
                      
                      {/* Insurance */}
                      <tr className="bg-pink-200">
                        <td className="border border-gray-600 p-2 bg-pink-200 text-black font-bold">O/H INSURANCE</td>
                        <td className="border border-gray-600 p-2 bg-yellow-200 text-black font-bold">0.2018%</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">36</td>
                        <td className="border border-gray-600 p-2 bg-white text-red-600">37 x 0.2018%</td>
                        <td className="border border-gray-600 p-2 bg-white text-black">{formatCurrency(calc.inhouse.ohInsurance)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}