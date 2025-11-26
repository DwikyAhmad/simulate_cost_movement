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
    FileText,
    Table,
    BarChart3,
} from "lucide-react";
import Link from "next/link";
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
            name: "Inhouse Cost",
            lastUpdated: "12/15/2024 13:45",
        },
        {
            id: "packing-handling",
            name: "Packing Cost",
            lastUpdated: "12/15/2024 12:20",
        },
        {
            id: "outhouse",
            name: "Outhouse Cost",
            lastUpdated: "12/15/2024 11:00",
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
    const [showFOBLogModal, setShowFOBLogModal] = useState(false);

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
        // Show alert for calculation start
        alert(
            "FOB Calculation has been triggered successfully! The calculation process is now running."
        );

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
            // Show completion alert
            alert("FOB Calculation has been completed successfully!");
        }, 3000);
    };

    const handleOpenFOBLog = () => {
        setShowFOBLogModal(true);
    };

    const handleCloseFOBLog = () => {
        setShowFOBLogModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b-2 border-blue-100 shadow-sm">
                <div className="px-6 py-4">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                            PBMD Engine Calculation System
                        </h1>
                        <p className="text-gray-600 mt-1 text-sm">
                            Manage data sources, monitor cost movement and
                            automate FOB price calculations
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="bg-white border-b border-blue-100 px-6 py-3">
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (window.location.href = "/requestdata")}
                        className="border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                        <Link
                            href="/requestdata"
                            className="flex items-center gap-2"
                        >
                            <FileText className="h-4 w-4" />
                            Request Data
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                        <Link
                            href="/masterdata"
                            className="flex items-center gap-2"
                        >
                            <Table className="h-4 w-4" />
                            Maintain Master Data
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-3 py-6 flex items-center justify-center mt-24">
                <div className="overflow-x-auto">
                    <div className="flex gap-2 items-stretch justify-center min-w-max px-2">
                        {/* Data Sources Section */}
                        <div className="flex gap-2 items-stretch">
                            {dataSources.map((dataSource) => (
                                <div
                                    key={dataSource.id}
                                    className="flex flex-col items-center justify-between bg-white rounded-lg p-3 border-2 border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all w-44 h-64"
                                >
                                    <div className="flex flex-col items-center space-y-2">
                                        {/* Database Icon */}
                                        <DatabaseLogModal
                                            dataSourceName={dataSource.name}
                                        >
                                            <div className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                                                <Image
                                                    src="/database.svg"
                                                    alt="Database"
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8"
                                                />
                                            </div>
                                        </DatabaseLogModal>

                                        {/* Data Source Name */}
                                        <h3 className="text-md font-semibold text-center text-black leading-tight">
                                            {dataSource.name}
                                        </h3>

                                        {/* Last Updated */}
                                        <div className="flex flex-col items-center text-[12px] text-gray-600">
                                            <span className="text-[12px] text-gray-600">
                                                Last Updated:
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="h-2.5 w-2.5" />
                                                <span className="text-[12px]">
                                                    {dataSource.lastUpdated}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col space-y-1.5 w-full mt-auto">
                                        <DownloadDataModal
                                            dataSourceName={dataSource.name}
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full rounded-lg text-sm h-7 border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 px-2"
                                            >
                                                <Download className="h-2.5 w-2.5 mr-1" />
                                                Download
                                            </Button>
                                        </DownloadDataModal>

                                        <Button
                                            size="sm"
                                            className="w-full rounded-lg text-sm h-7 bg-blue-600 hover:bg-blue-700 text-white px-2 shadow-sm"
                                            onClick={() =>
                                                handleOpenUploadModal(
                                                    dataSource
                                                )
                                            }
                                            disabled={
                                                uploading === dataSource.id
                                            }
                                        >
                                            <Upload className="h-2.5 w-2.5 mr-1" />
                                            {uploading === dataSource.id
                                                ? "Uploading..."
                                                : "Upload"}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Flow Arrow */}
                        <div className="flex items-center justify-center">
                            <div className="bg-gray-300 p-1.5 rounded-sm border border-gray-400">
                                <ArrowRight className="h-4 w-4 text-black" />
                            </div>
                        </div>

                        {/* Cost Movement Process */}
                        <div className="flex flex-col items-center justify-between bg-white rounded-lg p-3 border-2 border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all w-44 h-64">
                            <div className="flex flex-col items-center space-y-2">
                                {/* Process Icon */}
                                <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 h-[50px] w-[50px] flex">
                                    <div className="flex space-x-0.5 items-end">
                                        <div className="w-1.5 h-5 bg-blue-600 rounded-sm"></div>
                                        <div className="w-1.5 h-7 bg-blue-600 rounded-sm"></div>
                                        <div className="w-1.5 h-4 bg-blue-600 rounded-sm"></div>
                                        <div className="w-1.5 h-6 bg-blue-600 rounded-sm"></div>
                                    </div>
                                </div>

                                <h3 className="text-md font-semibold text-black text-center leading-tight">
                                    Cost Movement
                                </h3>

                                <div className="flex flex-col items-center text-[12px] text-gray-600">
                                    <span className="text-[12px] text-gray-600">Last Updated:</span>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-2.5 w-2.5" />
                                        <span className="text-[12px]">
                                            {processes[0].lastUpdated}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mt-auto">
                                <Button
                                    onClick={handleCostMovementDownload}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm h-7 w-full px-2 shadow-sm"
                                >
                                    <Activity className="h-2.5 w-2.5 mr-1" />
                                    Analyze
                                </Button>
                            </div>
                        </div>

                        {/* Flow Arrow to FOB */}
                        <div className="flex items-center justify-center">
                            <div className="bg-gray-300 p-1.5 rounded-sm border border-gray-400">
                                <ArrowRight className="h-4 w-4 text-black" />
                            </div>
                        </div>

                        {/* FOB Calculation */}
                        <div className="flex flex-col items-center justify-between bg-white rounded-lg p-3 border-2 border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all w-44 h-64">
                            <div className="flex flex-col items-center space-y-2">
                                <div
                                    className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200"
                                    onClick={handleOpenFOBLog}
                                >
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-blue-300">
                                        <div className="text-base font-bold text-blue-600">
                                            =
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-md font-semibold text-black text-center leading-tight">
                                    FOB Calculation
                                </h3>

                                <div className="flex flex-col items-center text-[12px] text-gray-600">
                                    <span className="text-[12px] text-gray-600">Last Updated:</span>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-2.5 w-2.5" />
                                        <span className="text-[12px]">
                                            {processes[1].lastUpdated}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-1.5 flex-col w-full mt-auto">
                                <Button
                                    onClick={handleTriggerCalculation}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm h-7 px-2 shadow-sm"
                                >
                                    <Play className="h-2.5 w-2.5 mr-1" />
                                    Start
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        router.push("/costmovement/fob")
                                    }
                                    className="border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 rounded-lg text-sm h-7 px-2"
                                >
                                    <BarChart3 className="h-2.5 w-2.5 mr-1" />
                                    Analysis
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push("/cal")}
                                    className="border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 rounded-lg text-sm h-7 px-2"
                                >
                                    <Download className="h-2.5 w-2.5 mr-1" />
                                    Download
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && selectedDataSource && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-sm w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg border border-gray-300">
                        {/* Modal Header */}
                        <div className="border-b border-gray-300 p-6 flex items-start justify-between">
                            <div className="mr-10">
                                <h2 className="text-xl font-bold text-black">
                                    Upload Data - {selectedDataSource.name}
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Download template and upload cost data for
                                    processing
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseUploadModal}
                                className="text-gray-600 hover:text-black hover:bg-gray-100"
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
                                    className="border-gray-300 bg-white text-black hover:bg-gray-100"
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
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-black hover:bg-gray-800"
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
                                <div className="bg-gray-100 border border-gray-300 rounded-sm p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-black text-sm font-medium">
                                            Upload Progress
                                        </span>
                                        <span className="text-black text-sm font-bold">
                                            {uploadProgress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-300 rounded-sm h-2">
                                        <div
                                            className="bg-black h-2 rounded-sm transition-all duration-300"
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

            {/* FOB Calculation Log Modal */}
            {showFOBLogModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg border border-gray-300">
                        {/* Modal Header */}
                        <div className="border-b border-gray-300 p-6 flex items-start justify-between">
                            <div className="mr-10">
                                <h2 className="text-xl font-bold text-black">
                                    FOB Calculation Log
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    View calculation history and master data
                                    versions
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseFOBLog}
                                className="text-gray-600 hover:text-black hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Calculation History */}
                            <div className="space-y-4">
                                {/* Latest Calculation */}
                                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-black font-medium">
                                                FOB Calculation #001
                                            </div>
                                            <div className="text-gray-600 text-sm">
                                                15 engine parts processed
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-black text-sm font-medium">
                                                Completed
                                            </div>
                                            <div className="text-gray-600 text-xs">
                                                12/15/2024 15:00
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-300 pt-3">
                                        <div>
                                            <span className="text-gray-600">
                                                Exchange Rate:
                                            </span>
                                            <span className="text-black ml-2">
                                                16,374
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                TMMIN E/G OP:
                                            </span>
                                            <span className="text-black ml-2">
                                                3.5%
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                Royalty:
                                            </span>
                                            <span className="text-black ml-2">
                                                6%
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                O/H Insurance:
                                            </span>
                                            <span className="text-black ml-2">
                                                0.2018%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Previous Calculation */}
                                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-black font-medium">
                                                FOB Calculation #000
                                            </div>
                                            <div className="text-gray-600 text-sm">
                                                12 engine parts processed
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-black text-sm font-medium">
                                                Completed
                                            </div>
                                            <div className="text-gray-600 text-xs">
                                                12/14/2024 10:30
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-300 pt-3">
                                        <div>
                                            <span className="text-gray-600">
                                                Exchange Rate:
                                            </span>
                                            <span className="text-black ml-2">
                                                16,200
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                TMMIN E/G OP:
                                            </span>
                                            <span className="text-black ml-2">
                                                3.5%
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                Royalty:
                                            </span>
                                            <span className="text-black ml-2">
                                                6%
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                O/H Insurance:
                                            </span>
                                            <span className="text-black ml-2">
                                                0.2018%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Older Calculation */}
                                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-black font-medium">
                                                FOB Calculation #999
                                            </div>
                                            <div className="text-gray-600 text-sm">
                                                10 engine parts processed
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-black text-sm font-medium">
                                                Completed
                                            </div>
                                            <div className="text-gray-600 text-xs">
                                                12/13/2024 16:45
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-300 pt-3">
                                        <div>
                                            <span className="text-gray-600">
                                                Exchange Rate:
                                            </span>
                                            <span className="text-black ml-2">
                                                16,100
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                TMMIN E/G OP:
                                            </span>
                                            <span className="text-black ml-2">
                                                3.2%
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                Royalty:
                                            </span>
                                            <span className="text-black ml-2">
                                                5.8%
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">
                                                O/H Insurance:
                                            </span>
                                            <span className="text-black ml-2">
                                                0.1950%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 justify-end mt-6">
                                <Button
                                    variant="outline"
                                    onClick={handleCloseFOBLog}
                                    className="border-gray-300 bg-white text-black hover:bg-gray-100"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
