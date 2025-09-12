import { EnginePart } from "@/types/cost";

// Sample engine parts data based on the provided images
export const engineParts: { [key: string]: EnginePart } = {
  "120000Y140": {
    partNo: "120000Y140",
    model: "681W",
    destination: "TSAM",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: {
          name: "JSP",
          currentYear: 1997926,
          lastYear: 2100000,
          difference: -102074,
          percentageChange: -4.86,
          parts: [
            { partNumber: "23300-AB100", partName: "Fuel Injection Pump", quantity: 1, amount: 850000 },
            { partNumber: "23310-AB200", partName: "Injection Nozzle Set", quantity: 4, amount: 420000 },
            { partNumber: "23320-AB300", partName: "High Pressure Pipe", quantity: 6, amount: 320000 },
            { partNumber: "23330-AB400", partName: "Fuel Rail Assembly", quantity: 1, amount: 407926 }
          ]
        },
        msp: {
          name: "MSP",
          currentYear: 1392630,
          lastYear: 1280000,
          difference: 112630,
          percentageChange: 8.80,
          parts: [
            { partNumber: "12345-CD100", partName: "Engine Block Assembly", quantity: 1, amount: 580000 },
            { partNumber: "12346-CD200", partName: "Cylinder Head", quantity: 1, amount: 450000 },
            { partNumber: "12347-CD300", partName: "Crankshaft", quantity: 1, amount: 220000 },
            { partNumber: "12348-CD400", partName: "Piston Set", quantity: 4, amount: 142630 }
          ]
        },
        total: {
          name: "NON LVA",
          currentYear: 3390556,
          lastYear: 3380000,
          difference: 10556,
          percentageChange: 0.31
        }
      },
      lva: {
        localOH: {
          name: "Local OH",
          currentYear: 8322631,
          lastYear: 8650000,
          difference: -327369,
          percentageChange: -3.78,
          parts: [
            { partNumber: "45100-EF100", partName: "Transmission Case", quantity: 1, amount: 2800000 },
            { partNumber: "45200-EF200", partName: "Gear Set Assembly", quantity: 1, amount: 1950000 },
            { partNumber: "45300-EF300", partName: "Clutch Assembly", quantity: 1, amount: 1650000 },
            { partNumber: "45400-EF400", partName: "Differential Unit", quantity: 1, amount: 1200000 },
            { partNumber: "45500-EF500", partName: "Drive Shaft", quantity: 2, amount: 722631 }
          ]
        },
        rawMaterial: {
          name: "Raw Material",
          currentYear: 915653,
          lastYear: 780000,
          difference: 135653,
          percentageChange: 17.39
        },
        total: {
          name: "LVA",
          currentYear: 9238284,
          lastYear: 9430000,
          difference: -191716,
          percentageChange: -2.03
        }
      },
      toolingOuthouse: {
        name: "Tooling Outhouse",
        currentYear: 69624,
        lastYear: 75000,
        difference: -5376,
        percentageChange: -7.17
      },
      totalPurchaseCost: {
        name: "Total Purchase Cost",
        currentYear: 12698465,
        lastYear: 12890000,
        difference: -191535,
        percentageChange: -1.49
      },
      processingCost: {
        labor: {
          name: "Labor",
          currentYear: 978229,
          lastYear: 1050000,
          difference: -71771,
          percentageChange: -6.84
        },
        fohFixed: {
          name: "FOH Fixed",
          currentYear: 536765,
          lastYear: 510000,
          difference: 26765,
          percentageChange: 5.25
        },
        fohVar: {
          name: "FOH Variable",
          currentYear: 713134,
          lastYear: 750000,
          difference: -36866,
          percentageChange: -4.92
        },
        unfinishDepre: {
          name: "Unfinish Depreciation",
          currentYear: 936701,
          lastYear: 820000,
          difference: 116701,
          percentageChange: 14.23
        },
        exclusiveDepre: {
          name: "Exclusive Depreciation",
          currentYear: 137926,
          lastYear: 145000,
          difference: -7074,
          percentageChange: -4.88
        },
        total: {
          name: "Processing Cost",
          currentYear: 3302754,
          lastYear: 3275000,
          difference: 27754,
          percentageChange: 0.85
        }
      },
      totalCost: {
        name: "Total Cost",
        currentYear: 16001219,
        lastYear: 16165000,
        difference: -163781,
        percentageChange: -1.01
      }
    }
  },
  "120000Y170": {
    partNo: "120000Y170",
    model: "786W",
    destination: "TMV",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: { 
          name: "JSP", 
          currentYear: 1845000, 
          lastYear: 1750000, 
          difference: 95000, 
          percentageChange: 5.43,
          parts: [
            { partNumber: "23400-GH100", partName: "Common Rail System", quantity: 1, amount: 750000 },
            { partNumber: "23410-GH200", partName: "Fuel Pressure Sensor", quantity: 2, amount: 380000 },
            { partNumber: "23420-GH300", partName: "Injection Control Unit", quantity: 1, amount: 520000 },
            { partNumber: "23430-GH400", partName: "Fuel Filter Assembly", quantity: 1, amount: 195000 }
          ]
        },
        msp: { 
          name: "MSP", 
          currentYear: 1254000, 
          lastYear: 1200000, 
          difference: 54000, 
          percentageChange: 4.50,
          parts: [
            { partNumber: "12400-IJ100", partName: "Engine Mount Bracket", quantity: 2, amount: 320000 },
            { partNumber: "12410-IJ200", partName: "Timing Belt Cover", quantity: 1, amount: 180000 },
            { partNumber: "12420-IJ300", partName: "Oil Pan Assembly", quantity: 1, amount: 420000 },
            { partNumber: "12430-IJ400", partName: "Valve Cover", quantity: 1, amount: 334000 }
          ]
        },
        total: { name: "NON LVA", currentYear: 3099000, lastYear: 2950000, difference: 149000, percentageChange: 5.05 }
      },
      lva: {
        localOH: { 
          name: "Local OH", 
          currentYear: 7200000, 
          lastYear: 6800000, 
          difference: 400000, 
          percentageChange: 5.88,
          parts: [
            { partNumber: "45600-KL100", partName: "Suspension Strut", quantity: 4, amount: 2400000 },
            { partNumber: "45610-KL200", partName: "Brake Disc Assembly", quantity: 4, amount: 1800000 },
            { partNumber: "45620-KL300", partName: "Steering Rack", quantity: 1, amount: 1600000 },
            { partNumber: "45630-KL400", partName: "Wheel Hub Unit", quantity: 4, amount: 1400000 }
          ]
        },
        rawMaterial: { name: "Raw Material", currentYear: 850000, lastYear: 950000, difference: -100000, percentageChange: -10.53 },
        total: { name: "LVA", currentYear: 8050000, lastYear: 7750000, difference: 300000, percentageChange: 3.87 }
      },
      toolingOuthouse: { name: "Tooling Outhouse", currentYear: 65000, lastYear: 70000, difference: -5000, percentageChange: -7.14 },
      totalPurchaseCost: { name: "Total Purchase Cost", currentYear: 11214000, lastYear: 10770000, difference: 444000, percentageChange: 4.12 },
      processingCost: {
        labor: { name: "Labor", currentYear: 890000, lastYear: 850000, difference: 40000, percentageChange: 4.71 },
        fohFixed: { name: "FOH Fixed", currentYear: 480000, lastYear: 460000, difference: 20000, percentageChange: 4.35 },
        fohVar: { name: "FOH Variable", currentYear: 620000, lastYear: 640000, difference: -20000, percentageChange: -3.13 },
        unfinishDepre: { name: "Unfinish Depreciation", currentYear: 780000, lastYear: 720000, difference: 60000, percentageChange: 8.33 },
        exclusiveDepre: { name: "Exclusive Depreciation", currentYear: 120000, lastYear: 130000, difference: -10000, percentageChange: -7.69 },
        total: { name: "Processing Cost", currentYear: 2890000, lastYear: 2800000, difference: 90000, percentageChange: 3.21 }
      },
      totalCost: { name: "Total Cost", currentYear: 14104000, lastYear: 13570000, difference: 534000, percentageChange: 3.93 }
    }
  },
  "120000Y280": {
    partNo: "120000Y280",
    model: "834W",
    destination: "TASA",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: { 
          name: "JSP", 
          currentYear: 1200000, 
          lastYear: 1350000, 
          difference: -150000, 
          percentageChange: -11.11,
          parts: [
            { partNumber: "23500-MN100", partName: "Turbocharger Unit", quantity: 1, amount: 480000 },
            { partNumber: "23510-MN200", partName: "Intercooler Assembly", quantity: 1, amount: 320000 },
            { partNumber: "23520-MN300", partName: "Wastegate Actuator", quantity: 1, amount: 220000 },
            { partNumber: "23530-MN400", partName: "Boost Sensor", quantity: 1, amount: 180000 }
          ]
        },
        msp: { name: "MSP", currentYear: 980000, lastYear: 920000, difference: 60000, percentageChange: 6.52 },
        total: { name: "NON LVA", currentYear: 2180000, lastYear: 2270000, difference: -90000, percentageChange: -3.96 }
      },
      lva: {
        localOH: { name: "Local OH", currentYear: 5400000, lastYear: 5200000, difference: 200000, percentageChange: 3.85 },
        rawMaterial: { name: "Raw Material", currentYear: 680000, lastYear: 600000, difference: 80000, percentageChange: 13.33 },
        total: { name: "LVA", currentYear: 6080000, lastYear: 5800000, difference: 280000, percentageChange: 4.83 }
      },
      toolingOuthouse: { name: "Tooling Outhouse", currentYear: 45000, lastYear: 50000, difference: -5000, percentageChange: -10.00 },
      totalPurchaseCost: { name: "Total Purchase Cost", currentYear: 8305000, lastYear: 8120000, difference: 185000, percentageChange: 2.28 },
      processingCost: {
        labor: { name: "Labor", currentYear: 650000, lastYear: 680000, difference: -30000, percentageChange: -4.41 },
        fohFixed: { name: "FOH Fixed", currentYear: 320000, lastYear: 300000, difference: 20000, percentageChange: 6.67 },
        fohVar: { name: "FOH Variable", currentYear: 450000, lastYear: 470000, difference: -20000, percentageChange: -4.26 },
        unfinishDepre: { name: "Unfinish Depreciation", currentYear: 590000, lastYear: 520000, difference: 70000, percentageChange: 13.46 },
        exclusiveDepre: { name: "Exclusive Depreciation", currentYear: 85000, lastYear: 90000, difference: -5000, percentageChange: -5.56 },
        total: { name: "Processing Cost", currentYear: 2095000, lastYear: 2060000, difference: 35000, percentageChange: 1.70 }
      },
      totalCost: { name: "Total Cost", currentYear: 10400000, lastYear: 10180000, difference: 220000, percentageChange: 2.16 }
    }
  },
  "120000Y340": {
    partNo: "120000Y340",
    model: "847W",
    destination: "IMC",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: { name: "JSP", currentYear: 2800000, lastYear: 2650000, difference: 150000, percentageChange: 5.66 },
        msp: { name: "MSP", currentYear: 1950000, lastYear: 1800000, difference: 150000, percentageChange: 8.33 },
        total: { name: "NON LVA", currentYear: 4750000, lastYear: 4450000, difference: 300000, percentageChange: 6.74 }
      },
      lva: {
        localOH: { name: "Local OH", currentYear: 12000000, lastYear: 11500000, difference: 500000, percentageChange: 4.35 },
        rawMaterial: { name: "Raw Material", currentYear: 1400000, lastYear: 1200000, difference: 200000, percentageChange: 16.67 },
        total: { name: "LVA", currentYear: 13400000, lastYear: 12700000, difference: 700000, percentageChange: 5.51 }
      },
      toolingOuthouse: { name: "Tooling Outhouse", currentYear: 95000, lastYear: 85000, difference: 10000, percentageChange: 11.76 },
      totalPurchaseCost: { name: "Total Purchase Cost", currentYear: 18245000, lastYear: 17235000, difference: 1010000, percentageChange: 5.86 },
      processingCost: {
        labor: { name: "Labor", currentYear: 1350000, lastYear: 1280000, difference: 70000, percentageChange: 5.47 },
        fohFixed: { name: "FOH Fixed", currentYear: 750000, lastYear: 700000, difference: 50000, percentageChange: 7.14 },
        fohVar: { name: "FOH Variable", currentYear: 980000, lastYear: 1000000, difference: -20000, percentageChange: -2.00 },
        unfinishDepre: { name: "Unfinish Depreciation", currentYear: 1200000, lastYear: 1050000, difference: 150000, percentageChange: 14.29 },
        exclusiveDepre: { name: "Exclusive Depreciation", currentYear: 180000, lastYear: 170000, difference: 10000, percentageChange: 5.88 },
        total: { name: "Processing Cost", currentYear: 4460000, lastYear: 4200000, difference: 260000, percentageChange: 6.19 }
      },
      totalCost: { name: "Total Cost", currentYear: 22705000, lastYear: 21435000, difference: 1270000, percentageChange: 5.93 }
    }
  },
  "160000Y200": {
    partNo: "160000Y200",
    model: "938W",
    destination: "UMW",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: { name: "JSP", currentYear: 1680000, lastYear: 1750000, difference: -70000, percentageChange: -4.00 },
        msp: { name: "MSP", currentYear: 1320000, lastYear: 1250000, difference: 70000, percentageChange: 5.60 },
        total: { name: "NON LVA", currentYear: 3000000, lastYear: 3000000, difference: 0, percentageChange: 0.00 }
      },
      lva: {
        localOH: { name: "Local OH", currentYear: 8500000, lastYear: 8800000, difference: -300000, percentageChange: -3.41 },
        rawMaterial: { name: "Raw Material", currentYear: 950000, lastYear: 850000, difference: 100000, percentageChange: 11.76 },
        total: { name: "LVA", currentYear: 9450000, lastYear: 9650000, difference: -200000, percentageChange: -2.07 }
      },
      toolingOuthouse: { name: "Tooling Outhouse", currentYear: 75000, lastYear: 80000, difference: -5000, percentageChange: -6.25 },
      totalPurchaseCost: { name: "Total Purchase Cost", currentYear: 12525000, lastYear: 12730000, difference: -205000, percentageChange: -1.61 },
      processingCost: {
        labor: { name: "Labor", currentYear: 920000, lastYear: 900000, difference: 20000, percentageChange: 2.22 },
        fohFixed: { name: "FOH Fixed", currentYear: 520000, lastYear: 480000, difference: 40000, percentageChange: 8.33 },
        fohVar: { name: "FOH Variable", currentYear: 680000, lastYear: 720000, difference: -40000, percentageChange: -5.56 },
        unfinishDepre: { name: "Unfinish Depreciation", currentYear: 850000, lastYear: 750000, difference: 100000, percentageChange: 13.33 },
        exclusiveDepre: { name: "Exclusive Depreciation", currentYear: 130000, lastYear: 150000, difference: -20000, percentageChange: -13.33 },
        total: { name: "Processing Cost", currentYear: 3100000, lastYear: 3000000, difference: 100000, percentageChange: 3.33 }
      },
      totalCost: { name: "Total Cost", currentYear: 15625000, lastYear: 15730000, difference: -105000, percentageChange: -0.67 }
    }
  },
  "140000Y450": {
    partNo: "140000Y450",
    model: "D33H",
    destination: "TMEE",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: { name: "JSP", currentYear: 2200000, lastYear: 2150000, difference: 50000, percentageChange: 2.33 },
        msp: { name: "MSP", currentYear: 1750000, lastYear: 1650000, difference: 100000, percentageChange: 6.06 },
        total: { name: "NON LVA", currentYear: 3950000, lastYear: 3800000, difference: 150000, percentageChange: 3.95 }
      },
      lva: {
        localOH: { name: "Local OH", currentYear: 9800000, lastYear: 9500000, difference: 300000, percentageChange: 3.16 },
        rawMaterial: { name: "Raw Material", currentYear: 1150000, lastYear: 1000000, difference: 150000, percentageChange: 15.00 },
        total: { name: "LVA", currentYear: 10950000, lastYear: 10500000, difference: 450000, percentageChange: 4.29 }
      },
      toolingOuthouse: { name: "Tooling Outhouse", currentYear: 85000, lastYear: 90000, difference: -5000, percentageChange: -5.56 },
      totalPurchaseCost: { name: "Total Purchase Cost", currentYear: 14985000, lastYear: 14390000, difference: 595000, percentageChange: 4.14 },
      processingCost: {
        labor: { name: "Labor", currentYear: 1100000, lastYear: 1050000, difference: 50000, percentageChange: 4.76 },
        fohFixed: { name: "FOH Fixed", currentYear: 650000, lastYear: 600000, difference: 50000, percentageChange: 8.33 },
        fohVar: { name: "FOH Variable", currentYear: 820000, lastYear: 850000, difference: -30000, percentageChange: -3.53 },
        unfinishDepre: { name: "Unfinish Depreciation", currentYear: 980000, lastYear: 900000, difference: 80000, percentageChange: 8.89 },
        exclusiveDepre: { name: "Exclusive Depreciation", currentYear: 160000, lastYear: 180000, difference: -20000, percentageChange: -11.11 },
        total: { name: "Processing Cost", currentYear: 3710000, lastYear: 3580000, difference: 130000, percentageChange: 3.63 }
      },
      totalCost: { name: "Total Cost", currentYear: 18695000, lastYear: 17970000, difference: 725000, percentageChange: 4.03 }
    }
  },
  "150000Y560": {
    partNo: "150000Y560",
    model: "D46H",
    destination: "TMT",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: { name: "JSP", currentYear: 1950000, lastYear: 2000000, difference: -50000, percentageChange: -2.50 },
        msp: { name: "MSP", currentYear: 1450000, lastYear: 1400000, difference: 50000, percentageChange: 3.57 },
        total: { name: "NON LVA", currentYear: 3400000, lastYear: 3400000, difference: 0, percentageChange: 0.00 }
      },
      lva: {
        localOH: { name: "Local OH", currentYear: 7200000, lastYear: 7500000, difference: -300000, percentageChange: -4.00 },
        rawMaterial: { name: "Raw Material", currentYear: 800000, lastYear: 750000, difference: 50000, percentageChange: 6.67 },
        total: { name: "LVA", currentYear: 8000000, lastYear: 8250000, difference: -250000, percentageChange: -3.03 }
      },
      toolingOuthouse: { name: "Tooling Outhouse", currentYear: 55000, lastYear: 60000, difference: -5000, percentageChange: -8.33 },
      totalPurchaseCost: { name: "Total Purchase Cost", currentYear: 11455000, lastYear: 11710000, difference: -255000, percentageChange: -2.18 },
      processingCost: {
        labor: { name: "Labor", currentYear: 850000, lastYear: 800000, difference: 50000, percentageChange: 6.25 },
        fohFixed: { name: "FOH Fixed", currentYear: 420000, lastYear: 450000, difference: -30000, percentageChange: -6.67 },
        fohVar: { name: "FOH Variable", currentYear: 580000, lastYear: 600000, difference: -20000, percentageChange: -3.33 },
        unfinishDepre: { name: "Unfinish Depreciation", currentYear: 720000, lastYear: 680000, difference: 40000, percentageChange: 5.88 },
        exclusiveDepre: { name: "Exclusive Depreciation", currentYear: 110000, lastYear: 120000, difference: -10000, percentageChange: -8.33 },
        total: { name: "Processing Cost", currentYear: 2680000, lastYear: 2650000, difference: 30000, percentageChange: 1.13 }
      },
      totalCost: { name: "Total Cost", currentYear: 14135000, lastYear: 14360000, difference: -225000, percentageChange: -1.57 }
    }
  },
  "170000Y670": {
    partNo: "170000Y670",
    model: "681W",
    destination: "TKM",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: { name: "JSP", currentYear: 1600000, lastYear: 1550000, difference: 50000, percentageChange: 3.23 },
        msp: { name: "MSP", currentYear: 1200000, lastYear: 1180000, difference: 20000, percentageChange: 1.69 },
        total: { name: "NON LVA", currentYear: 2800000, lastYear: 2730000, difference: 70000, percentageChange: 2.56 }
      },
      lva: {
        localOH: { name: "Local OH", currentYear: 6500000, lastYear: 6800000, difference: -300000, percentageChange: -4.41 },
        rawMaterial: { name: "Raw Material", currentYear: 720000, lastYear: 680000, difference: 40000, percentageChange: 5.88 },
        total: { name: "LVA", currentYear: 7220000, lastYear: 7480000, difference: -260000, percentageChange: -3.47 }
      },
      toolingOuthouse: { name: "Tooling Outhouse", currentYear: 48000, lastYear: 52000, difference: -4000, percentageChange: -7.69 },
      totalPurchaseCost: { name: "Total Purchase Cost", currentYear: 10068000, lastYear: 10262000, difference: -194000, percentageChange: -1.89 },
      processingCost: {
        labor: { name: "Labor", currentYear: 720000, lastYear: 750000, difference: -30000, percentageChange: -4.00 },
        fohFixed: { name: "FOH Fixed", currentYear: 380000, lastYear: 360000, difference: 20000, percentageChange: 5.56 },
        fohVar: { name: "FOH Variable", currentYear: 490000, lastYear: 520000, difference: -30000, percentageChange: -5.77 },
        unfinishDepre: { name: "Unfinish Depreciation", currentYear: 620000, lastYear: 580000, difference: 40000, percentageChange: 6.90 },
        exclusiveDepre: { name: "Exclusive Depreciation", currentYear: 95000, lastYear: 100000, difference: -5000, percentageChange: -5.00 },
        total: { name: "Processing Cost", currentYear: 2305000, lastYear: 2310000, difference: -5000, percentageChange: -0.22 }
      },
      totalCost: { name: "Total Cost", currentYear: 12373000, lastYear: 12572000, difference: -199000, percentageChange: -1.58 }
    }
  },
  "180000Y780": {
    partNo: "180000Y780",
    model: "786W",
    destination: "TMP",
    currentDate: "August 2025",
    lastYearDate: "August 2024",
    costs: {
      nonLVA: {
        jsp: { name: "JSP", currentYear: 2500000, lastYear: 2300000, difference: 200000, percentageChange: 8.70 },
        msp: { name: "MSP", currentYear: 1800000, lastYear: 1750000, difference: 50000, percentageChange: 2.86 },
        total: { name: "NON LVA", currentYear: 4300000, lastYear: 4050000, difference: 250000, percentageChange: 6.17 }
      },
      lva: {
        localOH: { name: "Local OH", currentYear: 11500000, lastYear: 11000000, difference: 500000, percentageChange: 4.55 },
        rawMaterial: { name: "Raw Material", currentYear: 1350000, lastYear: 1200000, difference: 150000, percentageChange: 12.50 },
        total: { name: "LVA", currentYear: 12850000, lastYear: 12200000, difference: 650000, percentageChange: 5.33 }
      },
      toolingOuthouse: { name: "Tooling Outhouse", currentYear: 105000, lastYear: 95000, difference: 10000, percentageChange: 10.53 },
      totalPurchaseCost: { name: "Total Purchase Cost", currentYear: 17255000, lastYear: 16345000, difference: 910000, percentageChange: 5.57 },
      processingCost: {
        labor: { name: "Labor", currentYear: 1400000, lastYear: 1320000, difference: 80000, percentageChange: 6.06 },
        fohFixed: { name: "FOH Fixed", currentYear: 780000, lastYear: 750000, difference: 30000, percentageChange: 4.00 },
        fohVar: { name: "FOH Variable", currentYear: 1050000, lastYear: 1100000, difference: -50000, percentageChange: -4.55 },
        unfinishDepre: { name: "Unfinish Depreciation", currentYear: 1250000, lastYear: 1150000, difference: 100000, percentageChange: 8.70 },
        exclusiveDepre: { name: "Exclusive Depreciation", currentYear: 200000, lastYear: 190000, difference: 10000, percentageChange: 5.26 },
        total: { name: "Processing Cost", currentYear: 4680000, lastYear: 4510000, difference: 170000, percentageChange: 3.77 }
      },
      totalCost: { name: "Total Cost", currentYear: 21935000, lastYear: 20855000, difference: 1080000, percentageChange: 5.18 }
    }
  }
};
