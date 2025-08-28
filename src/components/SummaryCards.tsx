/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getDifferenceColor } from "@/lib/utils";

interface SummaryCardsProps {
  partData: any; // Should be typed properly based on your data structure
}

export default function SummaryCards({ partData }: SummaryCardsProps) {
  const costs = partData.costs;

  // Count components above threshold
  const aboveThresholdCount = [
    costs.nonLVA.jsp,
    costs.nonLVA.msp,
    costs.nonLVA.total,
    costs.lva.localOH,
    costs.lva.rawMaterial,
    costs.lva.total,
    costs.toolingOuthouse,
    costs.totalPurchaseCost,
    costs.processingCost.labor,
    costs.processingCost.fohFixed,
    costs.processingCost.fohVar,
    costs.processingCost.unfinishDepre,
    costs.processingCost.exclusiveDepre,
    costs.processingCost.total,
    costs.totalCost
  ].filter(item => item.percentageChange >= 5).length;

  const summaryData = [
    {
      title: "Total Cost Change",
      value: costs.totalCost.difference,
      percentage: costs.totalCost.percentageChange,
      format: "currency"
    },
    {
      title: "Non-LVA Change",
      value: costs.nonLVA.total.difference,
      percentage: costs.nonLVA.total.percentageChange,
      format: "currency"
    },
    {
      title: "LVA Change",
      value: costs.lva.total.difference,
      percentage: costs.lva.total.percentageChange,
      format: "currency"
    },
    {
      title: "Tooling Outhouse Change",
      value: costs.toolingOuthouse.difference,
      percentage: costs.toolingOuthouse.percentageChange,
      format: "currency"
    },
    {
      title: "Purchase Cost Change",
      value: costs.totalPurchaseCost.difference,
      percentage: costs.totalPurchaseCost.percentageChange,
      format: "currency"
    },
    {
      title: "Processing Cost Change",
      value: costs.processingCost.total.difference,
      percentage: costs.processingCost.total.percentageChange,
      format: "currency"
    },
    {
      title: "Above Threshold",
      value: aboveThresholdCount,
      description: "Components ≥5% increase",
      format: "count",
      color: "text-red-400"
    },
    {
      title: "Percentage Change",
      value: costs.totalCost.percentageChange,
      description: "Total cost change",
      format: "percentage"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {summaryData.map((item, index) => (
        <Card key={index} className="rounded-none border-2 bg-gray-800 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              item.color || (item.format === "currency" ? getDifferenceColor(item.value) : "text-white")
            }`}>
              {item.format === "currency" && (
                <>
                  {item.value >= 0 ? '+' : '-'}{formatCurrency(Math.abs(item.value))}
                </>
              )}
              {item.format === "percentage" && (
                <>
                  {item.value >= 0 ? '+' : ''}{item.value.toFixed(2)}%
                </>
              )}
              {item.format === "count" && item.value}
            </div>
            <p className="text-xs text-gray-400">
              {item.description || (
                item.format === "currency" 
                  ? `${item.percentage >= 0 ? '+' : ''}${item.percentage.toFixed(2)}% from last year`
                  : ""
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
