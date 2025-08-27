"use client";

import SendEmailForm from '@/components/SendEmailForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function SendEmailPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
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
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Send Email Notifications</h1>
                <p className="text-gray-300 mt-1 text-sm md:text-base">
                  Send notification emails to request data from other departments
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Form */}
        <SendEmailForm />
      </div>
    </div>
  );
}
