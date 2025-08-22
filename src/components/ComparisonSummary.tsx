"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, Percent } from "lucide-react";
import { engineParts } from "@/data/sampleData";
import { formatCurrency, getDifferenceColor } from "@/lib/utils";

interface ComparisonSummaryProps {
  selectedParts: string[];
}

export default function ComparisonSummary({ selectedParts }: ComparisonSummaryProps) {
  if (selectedParts.length === 0) {
    return null;
  }

  const parts = selectedParts.map(partNo => ({
    partNo,
    data: engineParts[partNo]
  }));

  // Calculate summary statistics
  const totalCosts = parts.map(p => p.data.costs.totalCost.currentYear);
  const percentageChanges = parts.map(p => p.data.costs.totalCost.percentageChange);
  const differences = parts.map(p => p.data.costs.totalCost.difference);

  const stats = {
    totalValue: totalCosts.reduce((sum, cost) => sum + cost, 0),
    averageCost: totalCosts.reduce((sum, cost) => sum + cost, 0) / totalCosts.length,
    highestCost: Math.max(...totalCosts),
    lowestCost: Math.min(...totalCosts),
    averageChange: percentageChanges.reduce((sum, change) => sum + change, 0) / percentageChanges.length,
    highestChange: Math.max(...percentageChanges),
    lowestChange: Math.min(...percentageChanges),
    totalDifference: differences.reduce((sum, diff) => sum + diff, 0),
    increasingParts: percentageChanges.filter(change => change > 0).length,
    decreasingParts: percentageChanges.filter(change => change < 0).length,
    stableParts: percentageChanges.filter(change => Math.abs(change) < 1).length,
    criticalParts: percentageChanges.filter(change => Math.abs(change) >= 5).length
  };

  const highestCostPart = parts.find(p => p.data.costs.totalCost.currentYear === stats.highestCost);
  const lowestCostPart = parts.find(p => p.data.costs.totalCost.currentYear === stats.lowestCost);
  const highestChangePart = parts.find(p => p.data.costs.totalCost.percentageChange === stats.highestChange);
  const lowestChangePart = parts.find(p => p.data.costs.totalCost.percentageChange === stats.lowestChange);

  const summaryCards = [
    {
      title: "Total Portfolio Value",
      value: formatCurrency(stats.totalValue),
      description: `Across ${selectedParts.length} parts`,
      icon: DollarSign,
      color: "text-blue-400"
    },
    {
      title: "Average Cost per Part",
      value: formatCurrency(stats.averageCost),
      description: `Range: ${formatCurrency(stats.lowestCost)} - ${formatCurrency(stats.highestCost)}`,
      icon: Target,
      color: "text-purple-400"
    },
    {
      title: "Average Change",
      value: `${stats.averageChange >= 0 ? '+' : ''}${stats.averageChange.toFixed(2)}%`,
      description: `Total difference: ${formatCurrency(stats.totalDifference)}`,
      icon: Percent,
      color: getDifferenceColor(stats.averageChange).replace('text-', 'text-')
    },
    {
      title: "Cost Trends",
      value: `${stats.increasingParts}↑ ${stats.decreasingParts}↓`,
      description: `${stats.stableParts} stable, ${stats.criticalParts} critical`,
      icon: TrendingUp,
      color: stats.increasingParts > stats.decreasingParts ? "text-red-400" : "text-green-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <Card key={index} className="rounded-none border-2 bg-gray-800 border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <card.icon className="h-4 w-4" />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Leaders */}
        <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white">Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded border border-gray-600">
              <div>
                <div className="text-sm text-gray-400">Highest Cost</div>
                <div className="font-semibold text-white">{highestCostPart?.partNo}</div>
                <div className="text-sm text-blue-400">{formatCurrency(stats.highestCost)}</div>
              </div>
              <Badge variant="outline" className="text-blue-400 border-blue-400 rounded-none">
                Highest
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700 rounded border border-gray-600">
              <div>
                <div className="text-sm text-gray-400">Lowest Cost</div>
                <div className="font-semibold text-white">{lowestCostPart?.partNo}</div>
                <div className="text-sm text-green-400">{formatCurrency(stats.lowestCost)}</div>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400 rounded-none">
                Lowest
              </Badge>
            </div>

            <div className="p-3 bg-gray-700 rounded border border-gray-600">
              <div className="text-sm text-gray-400">Cost Spread</div>
              <div className="text-lg font-semibold text-white">
                {formatCurrency(stats.highestCost - stats.lowestCost)}
              </div>
              <div className="text-xs text-gray-400">
                {((stats.highestCost - stats.lowestCost) / stats.lowestCost * 100).toFixed(1)}% difference
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Leaders */}
        <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white">Change Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded border border-gray-600">
              <div>
                <div className="text-sm text-gray-400">Biggest Increase</div>
                <div className="font-semibold text-white">{highestChangePart?.partNo}</div>
                <div className="text-sm text-red-400">+{stats.highestChange.toFixed(2)}%</div>
              </div>
              <Badge variant="destructive" className="rounded-none">
                <TrendingUp className="h-3 w-3 mr-1" />
                Rising
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700 rounded border border-gray-600">
              <div>
                <div className="text-sm text-gray-400">Biggest Decrease</div>
                <div className="font-semibold text-white">{lowestChangePart?.partNo}</div>
                <div className="text-sm text-green-400">{stats.lowestChange.toFixed(2)}%</div>
              </div>
              <Badge variant="default" className="bg-green-600 text-white rounded-none">
                <TrendingDown className="h-3 w-3 mr-1" />
                Falling
              </Badge>
            </div>

            {stats.criticalParts > 0 && (
              <div className="p-3 bg-red-900/20 border border-red-500 rounded">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-semibold">Critical Changes</span>
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  {stats.criticalParts} part{stats.criticalParts > 1 ? 's' : ''} with ≥5% change requiring attention
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Part Rankings */}
      <Card className="rounded-none border-2 bg-gray-800 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Part Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Cost */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Ranked by Total Cost</h3>
              <div className="space-y-2">
                {parts
                  .sort((a, b) => b.data.costs.totalCost.currentYear - a.data.costs.totalCost.currentYear)
                  .map((part, index) => (
                    <div key={part.partNo} className="flex items-center justify-between p-2 bg-gray-700 rounded border border-gray-600">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-6 h-6 flex text-white items-center justify-center text-xs rounded-none">
                          {index + 1}
                        </Badge>
                        <span className="font-mono text-white">{part.partNo}</span>
                      </div>
                      <span className="text-sm text-gray-300">
                        {formatCurrency(part.data.costs.totalCost.currentYear)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* By Change */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Ranked by Cost Change</h3>
              <div className="space-y-2">
                {parts
                  .sort((a, b) => b.data.costs.totalCost.percentageChange - a.data.costs.totalCost.percentageChange)
                  .map((part, index) => (
                    <div key={part.partNo} className="flex items-center justify-between p-2 bg-gray-700 rounded border border-gray-600">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-6 h-6 flex text-white items-center justify-center text-xs rounded-none">
                          {index + 1}
                        </Badge>
                        <span className="font-mono text-white">{part.partNo}</span>
                      </div>
                      <span className={`text-sm ${getDifferenceColor(part.data.costs.totalCost.difference)}`}>
                        {part.data.costs.totalCost.percentageChange >= 0 ? '+' : ''}
                        {part.data.costs.totalCost.percentageChange.toFixed(2)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
