"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Upload, Download, Calendar, Play, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface DataSource {
    id: string;
    name: string;
    lastUpdated: string;
}

interface Process {
    id: string;
    name: string;
    lastUpdated: string;
}

export default function CorePage() {
    const router = useRouter();
    const [dataSources, setDataSources] = useState<DataSource[]>([
        {
            id: "msp-jsp",
            name: "MSP & JSP Price",
            lastUpdated: "12/15/2024 14:30",
        },
        {
            id: "lsp-ih",
            name: "LSP & IH Cost",
            lastUpdated: "12/15/2024 13:45",
        },
        {
            id: "packing-handling",
            name: "Packing & Handling Cost",
            lastUpdated: "12/15/2024 12:20",
        },
    ]);

    const [processes, setProcesses] = useState<Process[]>([
        {
            id: "cost-movement",
            name: "Cost Movement",
            lastUpdated: "12/15/2024 15:00",
        },
        {
            id: "fob-calculation",
            name: "FOB Calculation",
            lastUpdated: "12/15/2024 15:00",
        },
    ]);

    const [uploading, setUploading] = useState<string | null>(null);

    const handleFileUpload = async (
        dataSourceId: string,
        files: FileList | null
    ) => {
        if (!files || files.length === 0) return;

        setUploading(dataSourceId);

        // Simulate file upload
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Update the data source
        setDataSources((prev) =>
            prev.map((ds) =>
                ds.id === dataSourceId
                    ? { ...ds, lastUpdated: new Date().toLocaleString() }
                    : ds
            )
        );

        setUploading(null);
    };

    const handleDownload = (dataSourceId: string) => {
        // Handle download logic
        console.log(`Downloading data from ${dataSourceId}`);
    };

    const handleCostMovementDownload = () => {
        router.push("/partlistcost");
    };

    const handleBackToHome = () => {
        router.push("/");
    };

    const handleTriggerCalculation = () => {
        // Trigger FOB calculation
        // Simulate calculation process
        setTimeout(() => {
            setProcesses((prev) =>
                prev.map((p) =>
                    p.id === "fob-calculation"
                        ? { ...p, lastUpdated: new Date().toLocaleString() }
                        : p
                )
            );
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gray-800 text-white p-3">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToHome}
                        className="text-white hover:bg-gray-700 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold">Core Business Process</h1>
                        <p className="text-gray-300 mt-1 text-sm">
                            Manage data sources and monitor cost movement calculations
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-3 flex justify-between items-center">
                {/* Data Sources Section */}
                <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 items-start">
                        {dataSources.map((dataSource) => (
                            <div
                                key={dataSource.id}
                                className="flex flex-col items-center space-y-4"
                            >
                                {/* Database Icon */}
                                <Image
                                    src="/database.svg"
                                    alt="Database"
                                    width={100}
                                    height={100}
                                    className="w-10 h-10"
                                />

                                {/* Data Source Name */}
                                <h3 className="text-sm font-semibold text-gray-800 text-center">
                                    {dataSource.name}
                                </h3>

                                {/* Last Updated */}
                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                        Last updated: {dataSource.lastUpdated}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col space-y-1 w-full max-w-xs">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs"
                                        onClick={() =>
                                            handleDownload(dataSource.id)
                                        }
                                    >
                                        <Download className="h-3 w-3 mr-2" />
                                        Download Data
                                    </Button>

                                    <label className="w-full">
                                        <input
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={(e) =>
                                                handleFileUpload(
                                                    dataSource.id,
                                                    e.target.files
                                                )
                                            }
                                            accept=".xlsx,.xls,.csv"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full text-xs"
                                            disabled={
                                                uploading === dataSource.id
                                            }
                                        >
                                            <Upload className="h-3 w-3 mr-2" />
                                            {uploading === dataSource.id
                                                ? "Uploading..."
                                                : "Upload"}
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Flow Arrows */}
                <div className="flex justify-center">
                    <div className="flex items-center flex-col space-y-4">
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                    </div>
                </div>

                {/* Cost Movement Process */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Process Icon */}
                    <div className="relative">
                        <div className="w-28 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
                            <div className="flex space-x-2">
                                <div className="w-2 h-5 bg-white rounded-sm"></div>
                                <div className="w-2 h-8 bg-white rounded-sm"></div>
                                <div className="w-2 h-4 bg-white rounded-sm"></div>
                                <div className="w-5 h-px bg-white rounded-sm mt-4"></div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-base font-semibold text-gray-800">
                        Cost Movement
                    </h3>

                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>Last updated: {processes[0].lastUpdated}</span>
                    </div>

                    <Button
                        onClick={handleCostMovementDownload}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Download Cost Movement Data
                    </Button>
                </div>

                {/* Flow Arrow to FOB */}
                <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-blue-600 transform rotate-0" />
                </div>

                <div className="flex justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <div className="w-28 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-2xl">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                    <div className="text-lg font-bold text-green-600">
                                        =
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-base font-semibold text-gray-800">
                            FOB Calculation
                        </h3>

                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Calendar className="h-3 w-3" />
                            <span>
                                Last updated: {processes[1].lastUpdated}
                            </span>
                        </div>

                        <div className="flex space-x-3">
                            <Button
                                onClick={handleTriggerCalculation}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <Play className="h-4 w-4 mr-2" />
                                Start Calculation
                            </Button>

                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download Pricing Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
