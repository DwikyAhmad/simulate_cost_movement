// Type definitions for cost structure
export interface PartLevel2 {
  partNumber: string;
  partName: string;
  quantity: number;
  amount: number;
}

export interface CostComponent {
  name: string;
  currentYear: number;
  lastYear: number;
  difference: number;
  percentageChange: number;
  parts?: PartLevel2[]; // Optional level 2 parts for JSP, MSP, and Local OH
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
  model: string;
  destination: string;
  currentDate: string;
  lastYearDate: string;
  costs: CostBreakdown;
}
