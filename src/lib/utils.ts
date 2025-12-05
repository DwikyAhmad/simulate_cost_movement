import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Shared utility functions for cost formatting and styling
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const getDifferenceColor = (change: number) => {
  if (change > 0) return "text-red-400";
  if (change < 0) return "text-green-400";
  return "text-gray-300";
};

export const getDisplayDate = (monthValue: string) => {
  const monthMap: { [key: string]: string } = {
    "august-2025": "August 2025",
    "february-2025": "February 2025",
    "august-2024": "August 2024",
    "february-2024": "February 2024",
    "august-2023": "August 2023",
    "february-2023": "February 2023",
    "august-2022": "August 2022",
    "february-2022": "February 2022"
  };
  return monthMap[monthValue] || "August 2025";
};

export const getComparisonDate = (monthValue: string, compYear: string) => {
  // compYear is now a full month-year string like "march-2024"
  return getDisplayDate(compYear);
};
