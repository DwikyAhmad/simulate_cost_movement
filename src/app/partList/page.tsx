"use client";

import PartListTable from '@/components/PartListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PartListPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
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
                <span className="hidden sm:inline">Back to Overview</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Part List</h1>
                <p className="text-gray-300 mt-1 text-sm md:text-base">
                  View and manage engine parts with price request functionality
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Part List Table */}
        <PartListTable />
      </div>
    </div>
  );
}
