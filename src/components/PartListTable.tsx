"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

// Part data structure matching the Excel design
interface PartData {
    no: number;
    partNo: string;
    suffix: string;
    partName: string;
    source: string;
    supplierCode: string;
    supplierPlantCode: string;
    supplierName: string;
    dockIhRouting: string;
    engineAssy: { [key: string]: number | string };
    mspAug25: number | string;
    jspAug25: number | string;
    fob: number | string;
    freight: number | string;
    insurance: number | string;
    cifCf: number | string;
    mspCifCf: number | string;
    jspCf: number | string;
    remarks: string;
}

// Engine assembly codes from the Excel image
const engineAssyCodes = [
    { number: "10", code: "12000-BEZ50", destination: "ICE" },
    { number: "11", code: "16000-BZ030", destination: "ICE" },
    { number: "12", code: "16000-BYJ60", destination: "ICE" },
    { number: "13", code: "16000-BZ740", destination: "ICE" },
    { number: "14", code: "16000-BDQ50", destination: "ICE" },
];

// Sample data - in real app this would come from API
const sampleParts: PartData[] = [
    {
        no: 1,
        partNo: "11101-0Y050",
        suffix: "00",
        partName: "HEAD SUB-ASSY, CYLINDER",
        source: "3",
        supplierCode: "807J",
        supplierPlantCode: "6",
        supplierName: "TMMIN KARAWANG PLANT 3 ENGINE",
        dockIhRouting: "6A",
        engineAssy: { "12000-BEZ50": 1, "16000-BZ030": 1, "16000-BYJ60": 1, "16000-BZ740": 1, "16000-BDQ50": 1 },
        mspAug25: "",
        jspAug25: "",
        fob: "",
        freight: "",
        insurance: "",
        cifCf: "",
        mspCifCf: "",
        jspCf: "",
        remarks: "",
    },
    {
        no: 2,
        partNo: "11101-0Y120",
        suffix: "00",
        partName: "HEAD SUB-ASSY, CYLINDER",
        source: "3",
        supplierCode: "807J",
        supplierPlantCode: "6",
        supplierName: "TMMIN KARAWANG PLANT 3 ENGINE",
        dockIhRouting: "6A",
        engineAssy: { "12000-BEZ50": 1, "16000-BZ030": 1, "16000-BYJ60": 1, "16000-BZ740": 0, "16000-BDQ50": 0 },
        mspAug25: "",
        jspAug25: "",
        fob: "",
        freight: "",
        insurance: "",
        cifCf: "",
        mspCifCf: "",
        jspCf: "",
        remarks: "",
    },
    {
        no: 3,
        partNo: "11101-0Y190",
        suffix: "00",
        partName: "HEAD SUB-ASSY, CYLINDER",
        source: "3",
        supplierCode: "807J",
        supplierPlantCode: "6",
        supplierName: "TMMIN KARAWANG PLANT 3 ENGINE",
        dockIhRouting: "6A",
        engineAssy: { "12000-BEZ50": 1, "16000-BZ030": 1, "16000-BYJ60": 1, "16000-BZ740": 1, "16000-BDQ50": 1 },
        mspAug25: "",
        jspAug25: "",
        fob: "",
        freight: "",
        insurance: "",
        cifCf: "",
        mspCifCf: "",
        jspCf: "",
        remarks: "",
    },
    {
        no: 4,
        partNo: "11101-BZ250",
        suffix: "00",
        partName: "HEAD SUB-ASSY, CYLINDER",
        source: "3",
        supplierCode: "807J",
        supplierPlantCode: "6",
        supplierName: "TMMIN KARAWANG PLANT 3 ENGINE",
        dockIhRouting: "6A",
        engineAssy: { "12000-BEZ50": 1, "16000-BZ030": 1, "16000-BYJ60": 1, "16000-BZ740": 1, "16000-BDQ50": 1 },
        mspAug25: "",
        jspAug25: "",
        fob: "",
        freight: "",
        insurance: "",
        cifCf: "",
        mspCifCf: "",
        jspCf: "",
        remarks: "",
    },
    {
        no: 5,
        partNo: "11135-47030",
        suffix: "00",
        partName: "SEAT, EXHAUST VALVE",
        source: "2",
        supplierCode: "TMC1",
        supplierPlantCode: "1",
        supplierName: "TOYOTA MOTOR CORPORATION - JAPAN",
        dockIhRouting: "6H",
        engineAssy: { "12000-BEZ50": 1, "16000-BZ030": 1, "16000-BYJ60": 1, "16000-BZ740": 1, "16000-BDQ50": 1 },
        mspAug25: "",
        jspAug25: "",
        fob: "",
        freight: "",
        insurance: "",
        cifCf: "",
        mspCifCf: "",
        jspCf: "",
        remarks: "",
    },
    {
        no: 6,
        partNo: "11401-0Y060",
        suffix: "00",
        partName: "BLOCK SUB-ASSY, CYLINDER",
        source: "3",
        supplierCode: "807J",
        supplierPlantCode: "6",
        supplierName: "TMMIN KARAWANG PLANT 3 ENGINE",
        dockIhRouting: "6A",
        engineAssy: { "12000-BEZ50": 1, "16000-BZ030": 1, "16000-BYJ60": 1, "16000-BZ740": 1, "16000-BDQ50": 1 },
        mspAug25: "",
        jspAug25: "",
        fob: "",
        freight: "",
        insurance: "",
        cifCf: "",
        mspCifCf: "",
        jspCf: "",
        remarks: "",
    },
];

export default function PartListTable() {
    const [parts] = useState<PartData[]>(sampleParts);

    const handleExportExcel = () => {
        // In real app, this would export to Excel
        console.log("Exporting to Excel...");
        alert("Export to Excel functionality");
    };

    const formatValue = (value: number | string): string => {
        if (value === "" || value === null || value === undefined) return "";
        if (typeof value === "string") return value;
        return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    };

    return (
        <div className="bg-white rounded-none border border-gray-400 shadow">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        {/* First header row */}
                        <tr className="bg-gray-300">
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[50px]">
                                No
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[120px]">
                                Part No.
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[60px]">
                                Suffix
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[200px]">
                                Part Name
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[70px]">
                                Source
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[100px]">
                                Supplier Code
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[120px]">
                                Supplier Plant Code
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[250px]">
                                Supplier Name
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[100px]">
                                Dock/IH Routing
                            </th>
                            {/* Engine Assy columns with yellow headers */}
                            {engineAssyCodes.map((item) => (
                                <th
                                    key={item.code}
                                    className="border border-gray-400 p-1 text-center font-bold text-black bg-yellow-300 min-w-[40px]"
                                >
                                    {item.number}
                                </th>
                            ))}
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[70px]">
                                REMARKS
                            </th>
                            {/* Price columns */}
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black bg-pink-300 min-w-[100px]">
                                MSP Aug 25
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black bg-cyan-300 min-w-[100px]">
                                JSP Aug 25
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black bg-yellow-300 min-w-[120px]">
                                FOB (JSP is C&F ivl)
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[100px]">
                                FREIGHT
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[120px]">
                                INSURANCE - TMAP
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black min-w-[100px]">
                                CIF/C&F
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black bg-yellow-300 min-w-[120px]">
                                MSP (CIF / C&F)
                            </th>
                            <th className="border border-gray-400 p-2 text-center font-semibold text-black bg-yellow-300 min-w-[100px]">
                                JSP (C&F)
                            </th>
                        </tr>
                        {/* Second header row - engine assy codes rotated */}
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            {/* Engine Assy Sub-headers - rotated codes */}
                            {engineAssyCodes.map((item) => (
                                <th
                                    key={item.code}
                                    className="border border-gray-400 p-1 text-center font-medium text-black bg-yellow-100 align-bottom"
                                >
                                    <div
                                        className="inline-block transform text-xs font-semibold"
                                        style={{
                                            writingMode: "vertical-rl",
                                            transform: "rotate(180deg)",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {item.code}
                                    </div>
                                </th>
                            ))}
                            {/* Empty cells for price columns */}

                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1 bg-pink-100"></th>
                            <th className="border border-gray-400 p-1 bg-cyan-100"></th>
                            <th className="border border-gray-400 p-1 bg-yellow-100"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1 bg-yellow-100"></th>
                            <th className="border border-gray-400 p-1 bg-yellow-100"></th>
                        </tr>
                        {/* Third header row - destinations */}
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            {/* Engine Assy Destinations */}
                            {engineAssyCodes.map((item) => (
                                <th
                                    key={`${item.code}-dest`}
                                    className="border border-gray-400 p-1 text-center font-medium text-black bg-yellow-50 text-xs"
                                >
                                    {item.destination}
                                </th>
                            ))}
                            {/* Empty cells for price columns */}
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1 bg-pink-100"></th>
                            <th className="border border-gray-400 p-1 bg-cyan-100"></th>
                            <th className="border border-gray-400 p-1 bg-yellow-100"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1"></th>
                            <th className="border border-gray-400 p-1 bg-yellow-100"></th>
                            <th className="border border-gray-400 p-1 bg-yellow-100"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map((part, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-400 p-2 text-center text-black">
                                    {part.no}
                                </td>
                                <td className="border border-gray-400 p-2 text-black">
                                    {part.partNo}
                                </td>
                                <td className="border border-gray-400 p-2 text-center text-black">
                                    {part.suffix}
                                </td>
                                <td className="border border-gray-400 p-2 text-black">
                                    {part.partName}
                                </td>
                                <td className="border border-gray-400 p-2 text-center text-black">
                                    {part.source}
                                </td>
                                <td className="border border-gray-400 p-2 text-black">
                                    {part.supplierCode}
                                </td>
                                <td className="border border-gray-400 p-2 text-center text-black">
                                    {part.supplierPlantCode}
                                </td>
                                <td className="border border-gray-400 p-2 text-black">
                                    {part.supplierName}
                                </td>
                                <td className="border border-gray-400 p-2 text-center text-black">
                                    {part.dockIhRouting}
                                </td>
                                {/* Engine Assy values */}
                                {engineAssyCodes.map((item) => (
                                    <td
                                        key={item.code}
                                        className="border border-gray-400 p-1 text-center text-black"
                                    >
                                        {part.engineAssy[item.code]}
                                    </td>
                                ))}
                                <td className="border border-gray-400 p-2 text-center text-black">
                                    {part.remarks}
                                </td>
                                {/* Price values */}
                                <td className="border border-gray-400 p-2 text-right text-black">
                                    {formatValue(part.mspAug25)}
                                </td>
                                <td className="border border-gray-400 p-2 text-right text-black">
                                    {formatValue(part.jspAug25)}
                                </td>
                                <td className="border border-gray-400 p-2 text-right text-black">
                                    {formatValue(part.fob)}
                                </td>
                                <td className="border border-gray-400 p-2 text-right text-black">
                                    {formatValue(part.freight)}
                                </td>
                                <td className="border border-gray-400 p-2 text-right text-black">
                                    {formatValue(part.insurance)}
                                </td>
                                <td className="border border-gray-400 p-2 text-right text-black">
                                    {formatValue(part.cifCf)}
                                </td>
                                <td className="border border-gray-400 p-2 text-right text-black">
                                    {formatValue(part.mspCifCf)}
                                </td>
                                <td className="border border-gray-400 p-2 text-right text-black">
                                    {formatValue(part.jspCf)}
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-400">
                <div className="flex justify-end">
                    <Button
                        onClick={handleExportExcel}
                        size="sm"
                        className="bg-black hover:bg-gray-800 text-white rounded-md border border-gray-300 text-xs flex items-center gap-2"
                    >
                        <FileDown className="h-4 w-4" />
                        Export to Excel
                    </Button>
                </div>
            </div>
        </div>
    );
}