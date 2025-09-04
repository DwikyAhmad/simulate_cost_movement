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
    FileText,
    Table,
    X,
    Activity,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

    const handleDownload = (dataSourceId: string) => {
        // Handle download logic
        console.log(`Downloading data from ${dataSourceId}`);
    };

    const handleCostMovementDownload = () => {
        router.push("/partlistcost");
    };

    const handleGoToRequestData = () => {
        router.push("/requestdata");
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col">
            <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-900 text-white p-4 shadow-xl border-b-4 border-blue-400">
                <div className="flex items-center gap-3 ml-2">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                            PBMD Engine Calculation System
                        </h1>
                        <p className="text-blue-100 mt-1 text-sm font-medium">
                            Manage data sources, monitor cost movement and
                            automate calculations FOB Price
                        </p>
                    </div>
                </div>
            </div>
            {/* Header */}

            {/* Navigation Section */}
            <div className="px-6 pb-3 pt-3 bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg">
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGoToRequestData}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:text-white hover:from-blue-700 hover:to-blue-800 border-blue-500 shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                        <Link href="/requestdata" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Request Data
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:text-white hover:from-green-700 hover:to-green-800 border-green-500 shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                        <Link href="/masterdata" className="flex items-center gap-2">
                            <Table className="h-4 w-4" />
                            Maintain Master Data
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="mx-auto p-6 flex gap-4 items-center pt-20">
                {/* Data Sources Section */}
                <div className="flex gap-2 items-center ">
                    {dataSources.map((dataSource) => (
                        <div
                            key={dataSource.id}
                            className="flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300"
                        >
                            {/* Database Icon */}
                            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200 hover:cursor-pointer">
                                <Image
                                    src="/database.svg"
                                    alt="Database"
                                    width={200}
                                    height={200}
                                    className="w-12 h-12 filter brightness-0 invert"
                                />
                            </div>

                            {/* Data Source Name */}
                            <h3 className="text-sm font-bold text-center bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                                {dataSource.name}
                            </h3>

                            {/* Last Updated */}
                            <div className="flex items-center space-x-2 text-xs text-blue-200">
                                <Calendar className="h-3 w-3 text-cyan-400" />
                                <span>
                                    Last updated: {dataSource.lastUpdated}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-2 w-full max-w-xs">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-sm bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-500 hover:from-purple-700 hover:to-purple-800 hover:text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                                    onClick={() =>
                                        handleDownload(dataSource.id)
                                    }
                                >
                                    <Download className="h-3 w-3 mr-2" />
                                    Download Data
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-sm bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-emerald-500 hover:from-emerald-700 hover:to-emerald-800 hover:text-white shadow-lg transform hover:scale-105 transition-all duration-200"
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

                {/* Flow Arrows */}
                <div className="flex justify-center">
                    <div className="flex items-center flex-col space-y-4">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full shadow-lg brightness-75">
                            <ArrowRight className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Cost Movement Process */}
                <div className="flex flex-col items-center gap-y-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                    {/* Process Icon */}
                    <div className="relative">
                        <div className="w-32 h-24 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-blue-400/30">
                            <div className="flex space-x-2">
                                <div className="w-2 h-6 bg-white rounded-sm shadow-lg"></div>
                                <div className="w-2 h-10 bg-white rounded-sm shadow-lg"></div>
                                <div className="w-2 h-5 bg-white rounded-sm shadow-lg"></div>
                                <div className="w-6 h-px bg-white rounded-sm mt-4 shadow-lg"></div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                        Cost Movement
                    </h3>

                    <div className="flex items-center space-x-2 text-xs text-blue-200">
                        <Calendar className="h-3 w-3 text-cyan-400" />
                        <span>Last updated: {processes[0].lastUpdated}</span>
                    </div>

                    <Button
                        onClick={handleCostMovementDownload}
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 border border-blue-400"
                    >
                        <Activity className="h-4 w-4 mr-2" />
                        Analyze Cost Movement
                    </Button>
                </div>

                {/* Flow Arrow to FOB */}
                <div className="flex justify-center">
                    <div className="bg-gradient-to-r from-cyan-400 to-emerald-500 p-3 rounded-full shadow-lg brightness-75">
                        <ArrowRight className="h-6 w-6 text-white transform rotate-0" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                        <div className="relative">
                            <div className="w-32 h-24 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-emerald-400/30">
                                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-lg">
                                    <div className="text-2xl font-bold text-emerald-600">
                                        =
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                            FOB Calculation
                        </h3>

                        <div className="flex items-center space-x-2 text-xs text-emerald-200">
                            <Calendar className="h-3 w-3 text-emerald-400" />
                            <span>
                                Last updated: {processes[1].lastUpdated}
                            </span>
                        </div>

                        <div className="flex gap-2 flex-col w-full">
                            <Button
                                onClick={handleTriggerCalculation}
                                size="sm"
                                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200 border border-emerald-400"
                            >
                                <Play className="h-4 w-4 mr-2" />
                                Start Calculation
                            </Button>

                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.push('/cal')}
                                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-500 hover:from-amber-700 hover:to-orange-700 hover:text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download Pricing Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && selectedDataSource && (
                <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 border border-cyan-500/30 rounded-xl w-max max-h-[90vh] overflow-y-auto shadow-2xl ring-1 ring-cyan-400/20">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-indigo-800 via-blue-800 to-purple-800 border-b border-cyan-500/30 p-6 flex items-start justify-between rounded-t-xl">
                            <div className="mr-10">
                                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                                    Upload Data - {selectedDataSource.name}
                                </h2>
                                <p className="text-blue-200 text-sm font-medium mt-1">
                                    Download template and upload cost data for
                                    processing
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseUploadModal}
                                className="text-cyan-200 hover:bg-slate-700 hover:text-cyan-100 border-2 border-cyan-500/30 rounded-lg"
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
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg border-2 border-blue-400 px-6 py-3 flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    <Download className="h-5 w-5" />
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
                                        className={`rounded-lg border-2 px-6 py-3 flex items-center gap-2 w-full shadow-lg transform hover:scale-105 transition-all duration-200 ${
                                            uploading === selectedDataSource.id
                                                ? "bg-gradient-to-r from-gray-600 to-gray-700 border-gray-500 cursor-not-allowed"
                                                : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-emerald-400"
                                        }`}
                                        disabled={
                                            uploading === selectedDataSource.id
                                        }
                                    >
                                        <Upload className="h-5 w-5" />
                                        {uploading === selectedDataSource.id
                                            ? "Uploading..."
                                            : `Upload ${selectedDataSource.name}`}
                                    </Button>
                                </div>
                            </div>

                            {/* Upload Progress */}
                            {uploading === selectedDataSource.id && (
                                <div className="bg-gradient-to-r from-slate-700 to-slate-800 border border-cyan-500/30 rounded-lg p-4 shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-cyan-200 text-sm font-medium">
                                            Upload Progress
                                        </span>
                                        <span className="text-cyan-200 text-sm font-bold">
                                            {uploadProgress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-600 rounded-full h-3 shadow-inner">
                                        <div
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300 shadow-lg"
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
