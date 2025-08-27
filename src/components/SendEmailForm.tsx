'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function SendEmailForm() {
  const [pbodEmailSent, setPbodEmailSent] = useState(false);
  const [lspEmailSent, setLspEmailSent] = useState(false);

  const handleSendToPBOD = () => {
    // In real app, this would send email to PBOD & FD
    console.log('Sending email to PBOD & FD');
    setPbodEmailSent(true);
    setTimeout(() => setPbodEmailSent(false), 3000); // Reset after 3 seconds
  };

  const handleSendToFD = () => {
    // In real app, this would send email to FD
    console.log('Sending email to FD');
    setLspEmailSent(true);
    setTimeout(() => setLspEmailSent(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="space-y-6">
      {/* PBOD & FD Section */}
      <div className="bg-gray-800 rounded-none border-2 border-gray-600 p-6">
        <h2 className="text-xl font-bold text-white mb-2">Send email to PBOD & FD</h2>
        <p className="text-gray-300 text-sm mb-4">Packing cost (template display)</p>
        
        {/* Email Content Area */}
        <div className="bg-gray-700 border border-gray-500 rounded-lg p-4 mb-4 min-h-[120px]">
          <div className="text-gray-300 text-sm space-y-2">
            <div className="text-gray-400">Dear PBOD & FD Team,</div>
            <div className="text-gray-400">...</div>
            <div className="text-gray-400">- - - . . .</div>
            <div className="text-gray-400">_ _ _ . . .</div>
            <div className="text-gray-400">. _ _ _ . . .</div>
            <div className="text-gray-400">Please provide the latest Packing cost data for our analysis.</div>
            <div className="text-gray-400">...</div>
            <div className="text-gray-400">Best regards,</div>
            <div className="text-gray-400">Cost Analysis Team</div>
          </div>
        </div>
        
        {/* Send Button */}
        <Button
          onClick={handleSendToPBOD}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full border-2 border-blue-500 px-8 py-2"
        >
          Send to PBOD
        </Button>
      </div>

      {/* LSP and IH Section */}
      <div className="bg-gray-800 rounded-none border-2 border-gray-600 p-6">
        <h2 className="text-xl font-bold text-white mb-2">LSP and IH</h2>
        <p className="text-gray-300 text-sm mb-4">LSP and IH (template display)</p>
        
        {/* Email Content Area */}
        <div className="bg-gray-700 border border-gray-500 rounded-lg p-4 mb-4 min-h-[120px]">
          <div className="text-gray-300 text-sm space-y-2">
            <div className="text-gray-400">Dear LSP and IH Team,</div>
            <div className="text-gray-400">...</div>
            <div className="text-gray-400">- - - . . .</div>
            <div className="text-gray-400">_ _ _ . . .</div>
            <div className="text-gray-400">. _ _ _ . . .</div>
            <div className="text-gray-400">Please provide the latest LSP and IH data for our review.</div>
            <div className="text-gray-400">...</div>
            <div className="text-gray-400">Best regards,</div>
            <div className="text-gray-400">Cost Analysis Team</div>
          </div>
        </div>
        
        {/* Send Button */}
        <Button
          onClick={handleSendToFD}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full border-2 border-blue-500 px-8 py-2"
        >
          Send to FD
        </Button>
      </div>

      {/* Success Message */}
      {(pbodEmailSent || lspEmailSent) && (
        <div className="bg-gray-800 rounded-lg border-2 border-gray-500 p-4 flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-green-400" />
          <div className="text-white">
            <div className="font-medium">Email sent successfully</div>
            <div className="text-sm text-gray-300">
              {pbodEmailSent ? 'PBOD & FD notification sent' : 'LSP and IH notification sent'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

