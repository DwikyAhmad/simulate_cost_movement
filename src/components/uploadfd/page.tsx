"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Upload, FileSpreadsheet } from 'lucide-react';

interface CostData {
  no: string;
  partNo: string;
  localOH: number;
  rawMaterial: number;
  lvaTotal: number;
  toolingOuthouse: number;
  totalPurchaseCost: number;
  labor: number;
  fohFixed: number;
  fohVar: number;
  unfinishDepre: number;
  exclusiveDepre: number;
  totalProcessCost: number;
  totalCost: number;
}

export default function UploadFDPage() {
  const [uploadedData, setUploadedData] = useState<CostData[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Sample data structure based on the reference image
  const sampleData: CostData[] = [
    {
      no: "ICE",
      partNo: "12000-0Y140",
      localOH: 8322631,
      rawMaterial: 915653,
      lvaTotal: 9238284,
      toolingOuthouse: 69624,
      totalPurchaseCost: 12698465,
      labor: 978229,
      fohFixed: 536765,
      fohVar: 713134,
      unfinishDepre: 936701,
      exclusiveDepre: 137926,
      totalProcessCost: 3302754,
      totalCost: 16001219
    },
    {
      no: "ICE",
      partNo: "12000-0Y170",
      localOH: 8458471,
      rawMaterial: 915653,
      lvaTotal: 9374124,
      toolingOuthouse: 60050,
      totalPurchaseCost: 12205959,
      labor: 978229,
      fohFixed: 536765,
      fohVar: 713134,
      unfinishDepre: 936701,
      exclusiveDepre: 137926,
      totalProcessCost: 3302754,
      totalCost: 15508713
    }
  ];

  const handleDownloadTemplate = () => {
    // In real app, this would download an actual Excel template
    console.log('Downloading Excel template...');
    alert('Excel template download started. In production, this would download the actual file.');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate file processing
      setTimeout(() => {
        // For demo purposes, use sample data
        setUploadedData(sampleData);
        setIsUploading(false);
        alert('File uploaded successfully! Preview data is now displayed.');
      }, 1500);
    }
  };

  const handleSubmitToPBMD = () => {
    if (uploadedData.length === 0) {
      alert('Please upload data first before submitting.');
      return;
    }
    
    console.log('Submitting data to PBMD:', uploadedData);
    alert('Data submitted to PBMD successfully!');
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
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
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Upload Data FD</h1>
                <p className="text-gray-300 mt-1 text-sm md:text-base">
                  Download template and upload LSP & IH cost data for processing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-800 border border-gray-600 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleDownloadTemplate}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500 px-6 py-3 flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download Template
            </Button>
            
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <Button
                className={`rounded-none border-2 px-6 py-3 flex items-center gap-2 ${
                  isUploading 
                    ? 'bg-gray-500 border-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 border-green-500 cursor-pointer'
                }`}
                disabled={isUploading}
              >
                <Upload className="h-5 w-5" />
                {isUploading ? 'Uploading...' : 'Upload LSP & IH Cost'}
              </Button>
            </div>
          </div>
        </div>

        {/* Data Preview Section */}
        <div className="bg-gray-800 border border-gray-600 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Display Preview</h2>
          
          {uploadedData.length === 0 ? (
            <div className="bg-gray-700 border border-gray-500 rounded-lg p-8 text-center">
              <FileSpreadsheet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Upload data to see preview.....</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-600">
                <thead>
                  {/* Top Header Row */}
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 p-2 text-center text-white text-xs" rowSpan={2}>No.</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs" rowSpan={2}>Part No.</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-green-400 text-gray-800" colSpan={3}>LVA</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-green-400 text-gray-800" rowSpan={2}>Tooling Outhouse</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-green-400 text-gray-800" rowSpan={2}>Total Purchase Cost</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-gray-600" colSpan={5}>Processing Cost</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-green-400 text-gray-800" rowSpan={2}>Total Process Cost</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-orange-400 text-gray-800" rowSpan={2}>Total Cost</th>
                  </tr>
                  {/* Sub Header Row */}
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-green-400 text-gray-800">Local OH</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-green-400 text-gray-800">Raw Material</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-green-400 text-gray-800">Total</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-gray-600">Labor</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-gray-600">FOH Fixed</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-gray-600">FOH Var</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-gray-600">Unfinish Depre.</th>
                    <th className="border border-gray-600 p-2 text-center text-white text-xs bg-gray-600">Exclusive Depre.</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="border border-gray-600 p-2 text-white text-sm text-center">{item.no}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm font-mono">{item.partNo}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.localOH)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.rawMaterial)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.lvaTotal)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.toolingOuthouse)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.totalPurchaseCost)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.labor)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.fohFixed)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.fohVar)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.unfinishDepre)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.exclusiveDepre)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right">{formatNumber(item.totalProcessCost)}</td>
                      <td className="border border-gray-600 p-2 text-white text-sm text-right font-bold">{formatNumber(item.totalCost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitToPBMD}
            disabled={uploadedData.length === 0}
            className={`rounded-none border-2 px-8 py-3 text-lg ${
              uploadedData.length === 0
                ? 'bg-gray-500 border-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 border-blue-500 cursor-pointer'
            }`}
          >
            Submit to PBMD
          </Button>
        </div>
      </div>
    </div>
  );
}
