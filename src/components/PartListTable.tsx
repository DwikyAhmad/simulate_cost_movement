"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

// Simple part data structure for the table matching the image
interface PartData {
    id: string;
    partName: string;
    source: string;
    supplierCode: string;
    supplierPlantCode: string;
    supplierName: string;
    dockIhRouting: string;
    totalQty: number;
    engineAssy: { [key: string]: number };
}

// Engine assembly codes from the image
const engineAssyCodes = [
    "17000-0C480",
    "12000-0C560",
    "12000-0C640",
    "17000-0C280",
    "17000-0C450",
    "12000-0C370",
    "12000-0C470",
    "12000-0C580",
    "12000-0C380",
    "17000-0C290",
    "17000-0C510",
    "12000-0C620",
    "17000-0C320",
    "12000-0C510",
    "17000-0C350",
    "17000-0C490",
    "17000-0C540",
    "11101-0C101",
];

// Sample data - in real app this would come from API
const sampleParts: PartData[] = [
    {
        id: "1",
        partName: "GASKET, CYLINDER HEAD",
        source: "",
        supplierCode: "TMC1",
        supplierPlantCode: "1",
        supplierName: "TOYOTA MOTOR CORPORATION - JAPAN",
        dockIhRouting: "18",
        totalQty: 4,
        engineAssy: Object.fromEntries(
            engineAssyCodes.map((code) => [code, 0])
        ),
    },
    {
        id: "2",
        partName: "SEAT, INTAKE VALVE",
        source: "",
        supplierCode: "722M",
        supplierPlantCode: "1",
        supplierName: "SIAM THAILAND MOTOR",
        dockIhRouting: "18",
        totalQty: 16,
        engineAssy: Object.fromEntries(
            engineAssyCodes.map((code) => [code, 0])
        ),
    },
    {
        id: "3",
        partName: "VALVE, EXHAUST",
        source: "",
        supplierCode: "TMC1",
        supplierPlantCode: "1",
        supplierName: "TOYOTA MOTOR CORPORATION - JAPAN",
        dockIhRouting: "18",
        totalQty: 8,
        engineAssy: Object.fromEntries(
            engineAssyCodes.map((code) => [code, 0])
        ),
    },
    {
        id: "4",
        partName: "PISTON ASSEMBLY",
        source: "",
        supplierCode: "TMC1",
        supplierPlantCode: "1",
        supplierName: "TOYOTA MOTOR CORPORATION - JAPAN",
        dockIhRouting: "18",
        totalQty: 12,
        engineAssy: Object.fromEntries(
            engineAssyCodes.map((code) => [code, 0])
        ),
    },
    {
        id: "5",
        partName: "CAMSHAFT",
        source: "",
        supplierCode: "TMC1",
        supplierPlantCode: "1",
        supplierName: "TOYOTA MOTOR CORPORATION - JAPAN",
        dockIhRouting: "18",
        totalQty: 6,
        engineAssy: Object.fromEntries(
            engineAssyCodes.map((code) => [code, 0])
        ),
    },
    {
        id: "6",
        partName: "CRANKSHAFT",
        source: "",
        supplierCode: "TMC1",
        supplierPlantCode: "1",
        supplierName: "TOYOTA MOTOR CORPORATION - JAPAN",
        dockIhRouting: "18",
        totalQty: 4,
        engineAssy: Object.fromEntries(
            engineAssyCodes.map((code) => [code, 0])
        ),
    },
];

export default function PartListTable() {
    const [parts] = useState<PartData[]>(sampleParts);

    const handleRequestJSP = (partId: string) => {
        // In real app, this would make API call to TMA
        console.log(`Requesting JSP price for part ${partId}`);
        alert(`JSP price request sent to TMA for part ${partId}`);
    };

    return (
        <div className="bg-gray-800 rounded-none border-2 border-gray-600 shadow">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-200">
                            <th className="border border-gray-600 p-2 text-left font-medium text-gray-800 text-xs">
                                Part Name{" "}
                            </th>
                            <th className="border border-gray-600 p-2 text-left font-medium text-gray-800 text-xs">
                                Source{" "}
                            </th>
                            <th className="border border-gray-600 p-2 text-left font-medium text-gray-800 text-xs">
                                Supplier Code{" "}
                            </th>
                            <th className="border border-gray-600 p-2 text-left font-medium text-gray-800 text-xs">
                                Supplier Plant Code{" "}
                            </th>
                            <th className="border border-gray-600 p-2 text-left font-medium text-gray-800 text-xs">
                                Supplier Name{" "}
                            </th>
                            <th className="border border-gray-600 p-2 text-left font-medium text-gray-800 text-xs">
                                Dock/IH Routing{" "}
                            </th>
                            <th className="border border-gray-600 p-2 text-left font-medium text-gray-800 text-xs">
                                Total QTY{" "}
                            </th>
                            {/* Engine Assy Header */}
                            <th
                                className="border border-gray-600 p-2 text-center font-medium text-gray-800 text-xs bg-green-400"
                                colSpan={engineAssyCodes.length}
                            >
                                <div className="text-center">
                                    <div className="text-xs text-gray-600">
                                        024J
                                    </div>
                                    <div className="font-bold">Engine Assy</div>
                                </div>
                            </th>
                        </tr>
                        {/* Engine Assy Sub-headers - only for engine assy columns */}
                        <tr className="bg-green-400">
                            {/* Empty cells for the main columns */}
                            <th className="border border-gray-600 p-1"></th>
                            <th className="border border-gray-600 p-1"></th>
                            <th className="border border-gray-600 p-1"></th>
                            <th className="border border-gray-600 p-1"></th>
                            <th className="border border-gray-600 p-1"></th>
                            <th className="border border-gray-600 p-1"></th>
                            <th className="border border-gray-600 p-1"></th>
                            {/* Engine Assy Sub-headers */}
                            {engineAssyCodes.map((code) => (
                                <th
                                    key={code}
                                    className="border border-gray-600 p-1 text-center font-medium text-gray-800 text-xs align-bottom"
                                >
                                    <div
                                        className="writing-mode-vertical transform rotate-180"
                                        style={{
                                            writingMode: "vertical-rl",
                                            textOrientation: "mixed",
                                        }}
                                    >
                                        {code}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map((part) => (
                            <tr key={part.id} className="hover:bg-gray-700">
                                <td className="border border-gray-600 p-2 text-white text-xs">
                                    {part.partName}
                                </td>
                                <td className="border border-gray-600 p-2 text-white text-xs">
                                    {part.source || "-"}
                                </td>
                                <td className="border border-gray-600 p-2 text-white text-xs font-mono">
                                    {part.supplierCode}
                                </td>
                                <td className="border border-gray-600 p-2 text-white text-xs">
                                    {part.supplierPlantCode}
                                </td>
                                <td className="border border-gray-600 p-2 text-white text-xs">
                                    {part.supplierName}
                                </td>
                                <td className="border border-gray-600 p-2 text-white text-xs">
                                    {part.dockIhRouting}
                                </td>
                                <td className="border border-gray-600 p-2 text-white text-xs font-bold">
                                    {part.totalQty}
                                </td>
                                {/* Engine Assy values */}
                                {engineAssyCodes.map((code) => (
                                    <td
                                        key={code}
                                        className="border border-gray-600 p-1 text-center text-white text-xs"
                                    >
                                        {part.engineAssy[code]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-gray-700 border-t border-gray-600">
                <div className="flex flex-col space-y-4 items-end">

                    <div className="flex gap-2">
                        <Button
                            onClick={() => handleRequestJSP("1")}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md border-2 border-blue-500 text-xs w-fit self-end cursor-pointer"
                        >
                            <FileDown className="h-4 w-4" />
                            Export to Excel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}