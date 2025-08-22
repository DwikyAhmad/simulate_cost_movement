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
    "july-2025": "July 2025", 
    "june-2025": "June 2025",
    "may-2025": "May 2025",
    "april-2025": "April 2025",
    "march-2025": "March 2025"
  };
  return monthMap[monthValue] || "August 2025";
};

export const getComparisonDate = (monthValue: string, compYear: string) => {
  const monthName = monthValue.split('-')[0];
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  return `${capitalizedMonth} ${compYear}`;
};
