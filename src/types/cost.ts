// Type definitions for cost structure
export interface CostComponent {
  name: string;
  currentYear: number;
  lastYear: number;
  difference: number;
  percentageChange: number;
}

export interface CostBreakdown {
  nonLVA: {
    jsp: CostComponent;
    msp: CostComponent;
    total: CostComponent;
  };
  lva: {
    localOH: CostComponent;
    rawMaterial: CostComponent;
    total: CostComponent;
  };
  toolingOuthouse: CostComponent;
  totalPurchaseCost: CostComponent;
  processingCost: {
    labor: CostComponent;
    fohFixed: CostComponent;
    fohVar: CostComponent;
    unfinishDepre: CostComponent;
    exclusiveDepre: CostComponent;
    total: CostComponent;
  };
  totalCost: CostComponent;
}

export interface EnginePart {
  partNo: string;
  currentDate: string;
  lastYearDate: string;
  costs: CostBreakdown;
}
