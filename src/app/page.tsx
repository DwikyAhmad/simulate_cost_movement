"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Upload,
    Download,
    Calendar,
    Play,
    ArrowRight,
    X,
    Activity,
} from "lucide-react";
import Image from "next/image";
import { DatabaseLogModal } from "@/components/DatabaseLogModal";
import { DownloadDataModal } from "@/components/DownloadDataModal";

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
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedDataSource, setSelectedDataSource] =
        useState<DataSource | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = async (
        dataSourceId: string,
        files: FileList | null
    ) => {
        if (!files || files.length === 0) return;

        setUploading(dataSourceId);
        setUploadProgress(0);

        // Simulate file upload with progress
        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        // Simulate file upload
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setUploadProgress(100);
        clearInterval(progressInterval);

        // Update the data source
        setDataSources((prev) =>
            prev.map((ds) =>
                ds.id === dataSourceId
                    ? { ...ds, lastUpdated: new Date().toLocaleString() }
                    : ds
            )
        );

        setTimeout(() => {
            setUploading(null);
            setShowUploadModal(false);
            setUploadProgress(0);
        }, 500);
    };

    const handleDownloadTemplate = (dataSource: DataSource) => {
        console.log(`Downloading template for ${dataSource.name}`);
        alert(
            `Excel template for ${dataSource.name} download started. In production, this would download the actual file.`
        );
    };

    const handleOpenUploadModal = (dataSource: DataSource) => {
        setSelectedDataSource(dataSource);
        setShowUploadModal(true);
    };

    const handleCloseUploadModal = () => {
        setShowUploadModal(false);
        setSelectedDataSource(null);
        setUploadProgress(0);
    };

    const handleCostMovementDownload = () => {
        router.push("/costmovement/engine");
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
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-600 shadow-sm">
                <div className="px-6 py-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            PBMD Engine Calculation System
                        </h1>
                        <p className="text-gray-300 mt-1 text-sm">
                            Manage data sources, monitor cost movement and automate FOB price calculations
                        </p>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="flex-1 px-6 mt-25">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-4 items-center justify-center">
                        {/* Data Sources Section */}
                        <div className="flex gap-2 items-center">
                            {dataSources.map((dataSource) => (
                                <div
                                    key={dataSource.id}
                                    className="flex flex-col items-center space-y-4 bg-gray-800 rounded-lg p-4 border border-gray-600 shadow-sm hover:shadow-md transition-shadow w-max"
                                >
                                    {/* Database Icon */}
                                    <DatabaseLogModal dataSourceName={dataSource.name}>
                                        <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors cursor-pointer">
                                            <Image
                                                src="/database.svg"
                                                alt="Database"
                                                width={200}
                                                height={200}
                                                className="w-12 h-12 filter brightness-0 invert"
                                            />
                                        </div>
                                    </DatabaseLogModal>

                                    {/* Data Source Name */}
                                    <h3 className="text-sm font-semibold text-center text-white">
                                        {dataSource.name}
                                    </h3>

                                    {/* Last Updated */}
                                    <div className="flex items-center space-x-2 text-xs text-gray-300">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            Last updated: {dataSource.lastUpdated}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col space-y-2 w-full max-w-xs">
                                        <DownloadDataModal dataSourceName={dataSource.name}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full text-sm border-gray-500 bg-gray-700 text-white hover:bg-gray-600"
                                            >
                                                <Download className="h-3 w-3 mr-2" />
                                                Download Data
                                            </Button>
                                        </DownloadDataModal>

                                        <Button
                                            size="sm"
                                            className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
                                            onClick={() =>
                                                handleOpenUploadModal(dataSource)
                                            }
                                            disabled={uploading === dataSource.id}
                                        >
                                            <Upload className="h-3 w-3 mr-2" />
                                            {uploading === dataSource.id
                                                ? "Uploading..."
                                                : "Upload"}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Flow Arrow */}
                        <div className="flex justify-center">
                            <div className="bg-gray-600 p-2 rounded-full">
                                <ArrowRight className="h-5 w-5 text-white" />
                            </div>
                        </div>

                        {/* Cost Movement Process */}
                        <div className="flex flex-col items-center space-y-4 bg-gray-800 rounded-lg p-6 border border-gray-600 shadow-sm hover:shadow-md transition-shadow">
                            {/* Process Icon */}
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <div className="flex space-x-1 items-end">
                                    <div className="w-2 h-6 bg-white rounded-sm"></div>
                                    <div className="w-2 h-8 bg-white rounded-sm"></div>
                                    <div className="w-2 h-4 bg-white rounded-sm"></div>
                                    <div className="w-2 h-7 bg-white rounded-sm"></div>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                Cost Movement
                            </h3>

                            <div className="flex items-center space-x-2 text-xs text-gray-300">
                                <Calendar className="h-3 w-3" />
                                <span>Last updated: {processes[0].lastUpdated}</span>
                            </div>

                            <Button
                                onClick={handleCostMovementDownload}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Activity className="h-4 w-4 mr-2" />
                                Analyze Cost Movement
                            </Button>
                        </div>

                        {/* Flow Arrow to FOB */}
                        <div className="flex justify-center">
                            <div className="bg-gray-600 p-2 rounded-full">
                                <ArrowRight className="h-5 w-5 text-white" />
                            </div>
                        </div>

                        {/* FOB Calculation */}
                        <div className="flex flex-col items-center space-y-4 bg-gray-800 rounded-lg p-6 border border-gray-600 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                    <div className="text-xl font-bold text-gray-800">
                                        =
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                FOB Calculation
                            </h3>

                            <div className="flex items-center space-x-2 text-xs text-gray-300">
                                <Calendar className="h-3 w-3" />
                                <span>
                                    Last updated: {processes[1].lastUpdated}
                                </span>
                            </div>

                            <div className="flex gap-2 flex-col w-full">
                                <Button
                                    onClick={handleTriggerCalculation}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Play className="h-4 w-4 mr-2" />
                                    Start Calculation
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && selectedDataSource && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg border border-gray-600">
                        {/* Modal Header */}
                        <div className="border-b border-gray-600 p-6 flex items-start justify-between">
                            <div className="mr-10">
                                <h2 className="text-xl font-bold text-white">
                                    Upload Data - {selectedDataSource.name}
                                </h2>
                                <p className="text-gray-300 text-sm mt-1">
                                    Download template and upload cost data for processing
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseUploadModal}
                                className="text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Action Buttons */}
                            <div className="flex flex-col gap-4">
                                <Button
                                    onClick={() =>
                                        handleDownloadTemplate(
                                            selectedDataSource
                                        )
                                    }
                                    variant="outline"
                                    className="border-gray-500 bg-gray-700 text-white hover:bg-gray-600"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Template
                                </Button>

                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls,.csv"
                                        onChange={(e) =>
                                            handleFileUpload(
                                                selectedDataSource.id,
                                                e.target.files
                                            )
                                        }
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        disabled={
                                            uploading === selectedDataSource.id
                                        }
                                    />
                                    <Button
                                        className={`w-full ${
                                            uploading === selectedDataSource.id
                                                ? "bg-gray-600 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                        disabled={
                                            uploading === selectedDataSource.id
                                        }
                                    >
                                        <Upload className="h-4 w-4 mr-2" />
                                        {uploading === selectedDataSource.id
                                            ? "Uploading..."
                                            : `Upload ${selectedDataSource.name}`}
                                    </Button>
                                </div>
                            </div>

                            {/* Upload Progress */}
                            {uploading === selectedDataSource.id && (
                                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white text-sm font-medium">
                                            Upload Progress
                                        </span>
                                        <span className="text-white text-sm font-bold">
                                            {uploadProgress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-600 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${uploadProgress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
