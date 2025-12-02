"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Download,
    FileText,
    Clock,
    User,
    CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedData {
    id: string;
    uploadDate: string;
    fileName: string;
    fileSize: string;
    uploadedBy: string;
    recordsCount: number;
    status: "available" | "processing" | "archived";
    description: string;
    relativeTime: string;
}

interface DownloadDataModalProps {
    dataSourceName: string;
    children: React.ReactNode;
}

export function DownloadDataModal({
    dataSourceName,
    children,
}: DownloadDataModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const uploadedDataList: UploadedData[] = [
        {
            id: "1",
            uploadDate: "2024-01-15 14:30:25",
            fileName: "Price_Jan15_1430.xlsx",
            fileSize: "2.3 MB",
            uploadedBy: "John Doe",
            recordsCount: 1245,
            status: "available",
            description: "Latest pricing data with Q1 2024 updates",
            relativeTime: "2 hours ago"
        },
        {
            id: "2",
            uploadDate: "2024-01-15 13:45:12",
            fileName: "Price_Jan15_1345.xlsx",
            fileSize: "2.1 MB",
            uploadedBy: "Jane Smith",
            recordsCount: 892,
            status: "available",
            description: "Updated cost calculations for engine parts",
            relativeTime: "3 hours ago"
        },
        {
            id: "3",
            uploadDate: "2024-01-15 09:30:15",
            fileName: "Price_Jan15_0930.xlsx",
            fileSize: "1.8 MB",
            uploadedBy: "Mike Johnson",
            recordsCount: 678,
            status: "available",
            description: "Morning data refresh with market adjustments",
            relativeTime: "7 hours ago"
        },
        {
            id: "4",
            uploadDate: "2024-01-14 16:45:22",
            fileName: "Price_Jan14_1645.xlsx",
            fileSize: "2.5 MB",
            uploadedBy: "Sarah Wilson",
            recordsCount: 1456,
            status: "available",
            description: "End of day pricing compilation",
            relativeTime: "Yesterday"
        },
        {
            id: "5",
            uploadDate: "2024-01-14 10:15:33",
            fileName: "Price_Jan14_1015.xlsx",
            fileSize: "1.9 MB",
            uploadedBy: "David Brown",
            recordsCount: 934,
            status: "available",
            description: "Historical data backup",
            relativeTime: "Yesterday"
        },
        {
            id: "6",
            uploadDate: "2024-01-13 14:20:08",
            fileName: "MSP_JSP_Price_Jan13_1420.xlsx",
            fileSize: "2.0 MB",
            uploadedBy: "Emma Davis",
            recordsCount: 1123,
            status: "available",
            description: "Weekend update with special pricing",
            relativeTime: "2 days ago"
        }
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "available":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "processing":
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case "archived":
                return <Clock className="h-4 w-4 text-gray-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const filteredData = uploadedDataList;

    const handleDownloadFile = async (dataItem: UploadedData) => {
        if (dataItem.status !== "available") return;
        
        setDownloadingId(dataItem.id);
        
        // Simulate download process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        alert(`Downloaded: ${dataItem.fileName}`);
        
        setDownloadingId(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-xl max-h-[85vh] overflow-hidden bg-white border border-gray-200 text-gray-900 shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Download className="h-5 w-5 text-blue-600" />
                        Download Data - {dataSourceName}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Download previously uploaded data files from different time periods
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 overflow-hidden">

                    {/* Data List */}
                    <div className="flex-1 overflow-y-auto max-h-96 space-y-3 pr-2">
                        <h3 className="text-sm font-medium text-gray-700 sticky top-0 bg-white py-2 z-10 border-b border-gray-100">
                            Available Data Files ({filteredData.length})
                        </h3>
                        
                        {filteredData.map((dataItem) => (
                            <Card
                                key={dataItem.id}
                                className={cn(
                                    "border border-gray-200 bg-white hover:shadow-md transition-shadow",
                                    dataItem.status !== "available" && "opacity-60"
                                )}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="p-2 rounded-lg text-blue-600 bg-blue-50">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                                        {dataItem.fileName}
                                                    </h4>
                                                    {getStatusIcon(dataItem.status)}
                                                </div>
                                            
                                                
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Calendar className="h-3 w-3" />
                                                        {dataItem.relativeTime}
                                                    </div>

                                                
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Uploaded: {dataItem.uploadDate}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Individual Download Button */}
                                        <div className="ml-4">
                                            <Button
                                                size="sm"
                                                onClick={() => handleDownloadFile(dataItem)}
                                                disabled={dataItem.status !== "available" || downloadingId === dataItem.id}
                                                className={cn(
                                                    "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
                                                    dataItem.status !== "available" && "opacity-50 cursor-not-allowed"
                                                )}
                                            >
                                                {downloadingId === dataItem.id ? (
                                                    <>
                                                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                                                        Downloading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        
                        {filteredData.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No data files found for the selected filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
