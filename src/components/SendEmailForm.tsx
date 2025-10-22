'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Send, Upload, Users } from 'lucide-react';

export default function SendEmailForm() {
  const [pbodEmailSent, setPbodEmailSent] = useState(false);
  const [lspEmailSent, setLspEmailSent] = useState(false);
  const [tmaEmailSent, setTmaEmailSent] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  const handleSendToTMA = () => {
    // In real app, this would send email to TMA for MSP & JSP prices
    console.log('Sending email to TMA for MSP & JSP prices');
    console.log('Attached file:', uploadedFile?.name || 'No file attached');
    setTmaEmailSent(true);
    setTimeout(() => setTmaEmailSent(false), 3000); // Reset after 3 seconds
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* TMA Section - MSP & JSP Price Request */}
      <div className="bg-white rounded-none border-2 border-gray-300 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-black mb-2">Send email to TMA</h2>
        <p className="text-gray-600 text-sm mb-4">Request MSP & JSP prices (template display)</p>
        
        {/* Recipient Information */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-black" />
            <span className="text-sm font-medium text-black">Recipients</span>
          </div>
          <div className="text-sm text-black space-y-1">
            <div>lorem@ipsum.com</div>
          </div>
        </div>
        
        {/* Email Content Area */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4 min-h-[120px]">
          <div className="text-black text-sm space-y-2">
            <div className="text-gray-600">Dear TMA Team,</div>
            <div className="text-gray-600">...</div>
            <div className="text-gray-600">- - - . . .</div>
            <div className="text-gray-600">_ _ _ . . .</div>
            <div className="text-gray-600">. _ _ _ . . .</div>
            <div className="text-gray-600">Please provide the latest MSP & JSP price data for our cost analysis.</div>
            <div className="text-gray-600">...</div>
            <div className="text-gray-600">Best regards,</div>
            <div className="text-gray-600">PBMD Team</div>
          </div>
        </div>
        
        {/* File Upload Section */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="h-4 w-4 text-black" />
            <span className="text-sm font-medium text-black">Attach Part List</span>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="bg-white hover:bg-gray-100 border border-gray-300 rounded-sm px-4 py-2 text-sm text-black transition-colors">
                Choose File
              </div>
            </label>
            
            {uploadedFile ? (
              <div className="flex items-center gap-2">
                <div className="text-sm text-black font-medium">
                  {uploadedFile.name}
                </div>
                <div className="text-xs text-gray-600">
                  ({(uploadedFile.size / 1024).toFixed(1)} KB)
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                No file selected (Excel or CSV format)
              </div>
            )}
          </div>
        </div>
        
        {/* Send Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSendToTMA}
            className="bg-black hover:bg-gray-800 text-white rounded-sm border-2 border-gray-300 px-8 py-2 cursor-pointer"
          >
            <Send className="h-4 w-4 mr-2" />
            Send to TMA
          </Button>
        </div>
      </div>
      
      {/* PBOD & FD Section */}

      {/* <div className="bg-gray-800 rounded-none border-2 border-gray-600 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-2">Send email to PBOD</h2>
        <p className="text-gray-300 text-sm mb-4">Request Packing cost and Handling cost (template display)</p>
        
        <div className="bg-gray-700 border border-gray-500 rounded-lg p-4 mb-4 min-h-[120px]">
          <div className="text-gray-300 text-sm space-y-2">
            <div className="text-gray-400">Dear PBOD Team,</div>
            <div className="text-gray-400">...</div>
            <div className="text-gray-400">- - - . . .</div>
            <div className="text-gray-400">_ _ _ . . .</div>
            <div className="text-gray-400">. _ _ _ . . .</div>
            <div className="text-gray-400">Please provide the latest Packing and Handling cost data for our analysis.</div>
            <div className="text-gray-400">...</div>
            <div className="text-gray-400">Best regards,</div>
            <div className="text-gray-400">PBMD Team</div>
          </div>
        </div>
        
        <Button
          onClick={handleSendToPBOD}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-2 border-blue-500 px-8 py-2 w-fit self-end cursor-pointer"
        >
          <Send className="h-4 w-4" />
          Send to PBOD
        </Button>
      </div> */}

      {/* LSP and IH Section */}
      {/* <div className="bg-gray-800 rounded-none border-2 border-gray-600 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-2">Send email to FD</h2>
        <p className="text-gray-300 text-sm mb-4">Request LSP and IH (template display)</p>
        
        <div className="bg-gray-700 border border-gray-500 rounded-lg p-4 mb-4 min-h-[120px]">
          <div className="text-gray-300 text-sm space-y-2">
            <div className="text-gray-400">Dear FD Team,</div>
            <div className="text-gray-400">...</div>
            <div className="text-gray-400">- - - . . .</div>
            <div className="text-gray-400">_ _ _ . . .</div>
            <div className="text-gray-400">. _ _ _ . . .</div>
            <div className="text-gray-400">Please provide the latest LSP and IH data for our review.</div>
            <div className="text-gray-400">...</div>
            <div className="text-gray-400">Best regards,</div>
            <div className="text-gray-400">PBMD Team</div>
          </div>
        </div>
        <Button
          onClick={handleSendToFD}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-2 border-blue-500 px-8 py-2 w-fit self-end cursor-pointer"
        >
          <Send className="h-4 w-4" />
          Send to FD
        </Button>
      </div> */}

      {/* Success Message */}
      {(pbodEmailSent || lspEmailSent || tmaEmailSent) && (
        <div className="bg-white rounded-lg border-2 border-gray-300 p-4 flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-black" />
          <div className="text-black">
            <div className="font-medium">Email sent successfully</div>
            <div className="text-sm text-gray-600">
              {tmaEmailSent ? 'TMA notification sent for MSP & JSP prices' : 
               pbodEmailSent ? 'PBOD notification sent' : 'FD notification sent'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
