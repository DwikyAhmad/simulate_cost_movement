"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Edit, Trash2, X, Upload, Download, FileUp } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface EngineParent {
    id: string;
    partNo: string;
    partName: string;
    destinationCode: string;
}

export default function PPRExportPage() {
    const router = useRouter();

    // Mock data for engine parents
    const [engineParents, setEngineParents] = useState<EngineParent[]>([
        {
            id: "1",
            partNo: "1NR-0377200",
            partName: "1NR-FE Engine Assembly",
            destinationCode: "THA",
        },
        {
            id: "2",
            partNo: "2NR-0377200",
            partName: "2NR-FE Engine Assembly",
            destinationCode: "IDN",
        },
        {
            id: "3",
            partNo: "1ZR-0377200",
            partName: "1ZR-FE Engine Assembly",
            destinationCode: "MYS",
        },
        {
            id: "4",
            partNo: "2ZR-0377200",
            partName: "2ZR-FE Engine Assembly",
            destinationCode: "PHL",
        },
        {
            id: "5",
            partNo: "8NR-0377200",
            partName: "8NR-FTS Engine Assembly",
            destinationCode: "VNM",
        },
        {
            id: "6",
            partNo: "1GD-0377200",
            partName: "1GD-FTV Engine Assembly",
            destinationCode: "THA",
        },
        {
            id: "7",
            partNo: "2GD-0377200",
            partName: "2GD-FTV Engine Assembly",
            destinationCode: "IDN",
        },
        {
            id: "8",
            partNo: "1KD-0377200",
            partName: "1KD-FTV Engine Assembly",
            destinationCode: "THA",
        },
        {
            id: "9",
            partNo: "1TR-0377200",
            partName: "1TR-FE Engine Assembly",
            destinationCode: "MYS",
        },
        {
            id: "10",
            partNo: "2TR-0377200",
            partName: "2TR-FE Engine Assembly",
            destinationCode: "THA",
        },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedEngine, setSelectedEngine] = useState<EngineParent | null>(null);
    const [formData, setFormData] = useState({
        partNo: "",
        partName: "",
        destinationCode: "",
    });

    const handleBackToHome = () => {
        router.push("/");
    };

    const handleOpenAddModal = () => {
        setFormData({
            partNo: "",
            partName: "",
            destinationCode: "",
        });
        setShowAddModal(true);
    };

    const handleOpenEditModal = (engine: EngineParent) => {
        setSelectedEngine(engine);
        setFormData({
            partNo: engine.partNo,
            partName: engine.partName,
            destinationCode: engine.destinationCode,
        });
        setShowEditModal(true);
    };

    const handleOpenDeleteModal = (engine: EngineParent) => {
        setSelectedEngine(engine);
        setShowDeleteModal(true);
    };

    const handleOpenUploadModal = () => {
        setShowUploadModal(true);
    };

    const handleCloseModals = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowUploadModal(false);
        setSelectedEngine(null);
        setFormData({
            partNo: "",
            partName: "",
            destinationCode: "",
        });
    };

    const handleDownloadTemplate = () => {
        alert("Downloading template... This would download an Excel template file.");
        // Implement actual template download logic here
    };

    const handleUploadData = () => {
        alert("Upload data dialog would open here to select and upload an Excel file.");
        // Implement actual file upload logic here
    };

    const handleAdd = () => {
        const newEngine: EngineParent = {
            id: String(Date.now()),
            partNo: formData.partNo,
            partName: formData.partName,
            destinationCode: formData.destinationCode,
        };
        setEngineParents([...engineParents, newEngine]);
        handleCloseModals();
        alert("Engine parent added successfully!");
    };

    const handleEdit = () => {
        if (!selectedEngine) return;
        
        setEngineParents(engineParents.map(engine => 
            engine.id === selectedEngine.id 
                ? { ...engine, ...formData }
                : engine
        ));
        handleCloseModals();
        alert("Engine parent updated successfully!");
    };

    const handleDelete = () => {
        if (!selectedEngine) return;
        
        setEngineParents(engineParents.filter(engine => engine.id !== selectedEngine.id));
        handleCloseModals();
        alert("Engine parent deleted successfully!");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 md:p-6 shadow-sm">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
                        <Button
                            onClick={handleBackToHome}
                            variant="outline"
                            className="flex items-center gap-2 rounded-none border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 w-fit"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back to Home</span>
                            <span className="sm:hidden">Home</span>
                        </Button>
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                                PPR Export Engine List
                            </h1>
                            <p className="text-gray-600 mt-1 text-sm md:text-base">
                                View all engine parent parts with destination codes
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <Card className="rounded-lg border-2 bg-white border-blue-100 shadow-sm">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-gray-900">
                                    Engine Parent List
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Complete list of engine parent parts available for PPR export
                                </CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleOpenUploadModal}
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <Upload className="h-4 w-4 mr-1" />
                                    Upload
                                </Button>
                                <Button
                                    onClick={handleOpenAddModal}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    New
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gray-300 bg-gray-50">
                                        <TableHead className="text-gray-700 font-semibold">
                                            No.
                                        </TableHead>
                                        <TableHead className="text-gray-700 font-semibold">
                                            Part No
                                        </TableHead>
                                        <TableHead className="text-gray-700 font-semibold">
                                            Part Name
                                        </TableHead>
                                        <TableHead className="text-gray-700 font-semibold">
                                            Destination Code
                                        </TableHead>
                                        <TableHead className="text-gray-700 font-semibold text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {engineParents.map((engine, index) => (
                                        <TableRow
                                            key={engine.id}
                                            className="border-gray-200 hover:bg-gray-50"
                                        >
                                            <TableCell className="text-gray-900">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="text-gray-900 font-medium">
                                                {engine.partNo}
                                            </TableCell>
                                            <TableCell className="text-gray-900">
                                                {engine.partName}
                                            </TableCell>
                                            <TableCell className="text-gray-900">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {engine.destinationCode}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex gap-2 justify-center">
                                                    <Button
                                                        onClick={() => handleOpenEditModal(engine)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                                                    >
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleOpenDeleteModal(engine)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-red-300 text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Summary */}
                        <div className="mt-4 text-sm text-gray-600">
                            Total: {engineParents.length} engine parent{engineParents.length !== 1 ? 's' : ''}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl border border-gray-300">
                        <div className="border-b border-gray-300 p-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Add New Engine Parent
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Enter engine parent details
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseModals}
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Part No
                                </label>
                                <input
                                    type="text"
                                    name="partNo"
                                    value={formData.partNo}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 1NR-0377200"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Part Name
                                </label>
                                <input
                                    type="text"
                                    name="partName"
                                    value={formData.partName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 1NR-FE Engine Assembly"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Destination Code
                                </label>
                                <input
                                    type="text"
                                    name="destinationCode"
                                    value={formData.destinationCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., THA"
                                />
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-300 p-6 flex gap-3 justify-end">
                            <Button
                                onClick={handleCloseModals}
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAdd}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={!formData.partNo || !formData.partName || !formData.destinationCode}
                            >
                                Add Engine
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl border border-gray-300">
                        <div className="border-b border-gray-300 p-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Edit Engine Parent
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Update engine parent details
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseModals}
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Part No
                                </label>
                                <input
                                    type="text"
                                    name="partNo"
                                    value={formData.partNo}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Part Name
                                </label>
                                <input
                                    type="text"
                                    name="partName"
                                    value={formData.partName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Destination Code
                                </label>
                                <input
                                    type="text"
                                    name="destinationCode"
                                    value={formData.destinationCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-300 p-6 flex gap-3 justify-end">
                            <Button
                                onClick={handleCloseModals}
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleEdit}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={!formData.partNo || !formData.partName || !formData.destinationCode}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedEngine && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl border border-gray-300">
                        <div className="border-b border-gray-300 p-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Delete Engine Parent
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    This action cannot be undone
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseModals}
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-gray-700">
                                Are you sure you want to delete this engine parent?
                            </p>
                            <div className="mt-4 bg-gray-50 border border-gray-300 rounded-md p-4">
                                <div className="text-sm">
                                    <div className="mb-2">
                                        <span className="font-medium text-gray-700">Part No:</span>
                                        <span className="ml-2 text-gray-900">{selectedEngine.partNo}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-medium text-gray-700">Part Name:</span>
                                        <span className="ml-2 text-gray-900">{selectedEngine.partName}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Destination:</span>
                                        <span className="ml-2 text-gray-900">{selectedEngine.destinationCode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-300 p-6 flex gap-3 justify-end">
                            <Button
                                onClick={handleCloseModals}
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl border border-gray-300">
                        <div className="border-b border-gray-300 p-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Upload Engine Data
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Download template or upload your data file
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCloseModals}
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        
                        <div className="p-6 space-y-3">
                            <Button
                                onClick={handleDownloadTemplate}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download Template
                            </Button>

                            <Button
                                onClick={handleUploadData}
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                                <FileUp className="h-4 w-4 mr-2" />
                                Upload Data
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

